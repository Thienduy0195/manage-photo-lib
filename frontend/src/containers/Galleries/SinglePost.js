import {
  notification,
  Button,
  Upload,
  Form,
  Input,
  Modal,
  InputNumber,
  DatePicker,
  Spin,
  Select,
} from "antd";
import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import CardWrapper, { Box } from "./Post.styles";
import PageHeader from "@iso/components/utility/pageHeader";
import IntlMessages from "@iso/components/utility/intlMessages";
import { useHistory, useParams } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { addPhoto } from "@iso/lib/s3/s3config";
import moment from "moment";
import React, { useEffect, useState } from "react";
import httpRequest from "@iso/config/httpRequest";

const GALLERIES_FOLDER = "galleries";
const TextArea = Input.TextArea;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

const Post = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [galleryDetail, setGalleryDetail] = useState({});
  const [isChangeImage, setIsChangeImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { galleryId } = useParams();

  const getGallery = async () => {
    setLoading(true);
    const result = await httpRequest.get(`galleries/${galleryId}`);
    setGalleryDetail(result);
    form.setFieldsValue({
      ...result,
      time: result.time ? moment(result.time) : null,
    });
    setFileList([{ ...result, url: result.image }]);
    setLoading(false);
  };

  const getCategories = async () => {
    const categories = await httpRequest.get("categories");
    const data = (categories.data || []).map((item) => ({
      label: item.name,
      value: item.id,
    }))

    setCategories(
      data
    );
  };

  useEffect(() => {
    // Call API
    getCategories();
    getGallery();
  }, [galleryId]);

  const onFinish = async (values) => {
    setLoading(true);
    if (isChangeImage) {
      values.image = await addPhoto(GALLERIES_FOLDER, values.image);
    }
    values.time = values.time
      ? moment(values.time).format("YYYY-MM-DD")
      : moment().format("YYYY-MM-DD");
    const result = await httpRequest.put(`galleries/${galleryId}`, values, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    setLoading(false);
    notification.success({
      message: "Successfully",
      description: "The gallery was successfully updated.",
    });
    window.location.href = "/admin/galleries"
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleCancel = () => setPreviewVisible(false);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = async ({ fileList: newFileList, file }) => {
    setIsChangeImage(true);
    let preview = "";
    if (file.status !== "removed") {
      preview = await getBase64(file);
    }
    const list = newFileList.map((item) => {
      if (item.uid === file.uid) {
        return {
          ...item,
          preview,
          url: preview,
        };
      }

      return item;
    });
    setFileList(list);
    form.setFieldsValue({
      image: file,
    });
  };

  const handleBackToPost = () => {
    history.push("/admin/galleries");
  };

  return (
    <Spin spinning={loading}>
      <LayoutWrapper>
        <PageHeader>
          <IntlMessages id="sidebar.editGallery" />
        </PageHeader>
        <Box>
          <CardWrapper>
            <Form
              form={form}
              name="basic"
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 16,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Please input title!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="category_id"
                label="Category"
                rules={[
                  {
                    required: true,
                    message: "Please select a category!",
                  },
                ]}
              >
                <Select placeholder="Please select a category" options={categories}>
                </Select>
              </Form.Item>

              <Form.Item
                label="Image"
                name="image"
                rules={[
                  {
                    required: true,
                    message: "Please input description!",
                  },
                ]}
              >
                <Upload
                  beforeUpload={() => false}
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
              </Form.Item>

              <Form.Item label="Location" name="location">
                <Input />
              </Form.Item>

              <Form.Item label="Price" name="price">
                <InputNumber
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  min={0}
                />
              </Form.Item>

              <Form.Item label="Time" name="time">
                <DatePicker />
              </Form.Item>

              <Form.Item
                label="Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please input description!",
                  },
                ]}
              >
                <TextArea rows={3} />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 10,
                  span: 16,
                }}
              >
                <Button
                  type="default"
                  style={{ marginRight: "10px" }}
                  onClick={() => form.setFieldsValue(galleryDetail)}
                >
                  Reset
                </Button>

                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: "10px" }}
                >
                  Update
                </Button>

                <Button type="ghost" danger onClick={handleBackToPost}>
                  Cancel
                </Button>
              </Form.Item>
            </Form>
            <Modal
              visible={previewVisible}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img
                alt="example"
                style={{
                  width: "100%",
                }}
                src={previewImage}
              />
            </Modal>
          </CardWrapper>
        </Box>
      </LayoutWrapper>
    </Spin>
  );
};

export default Post;
