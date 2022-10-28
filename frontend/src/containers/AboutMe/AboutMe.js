import React, { useEffect, useState } from "react";
import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import PageHeader from "@iso/components/utility/pageHeader";
import IntlMessages from "@iso/components/utility/intlMessages";
import {
  Row,
  Col,
  Modal,
  Upload,
  Button,
  notification,
  Form,
  Spin,
} from "antd";
import { addPhoto } from "@iso/lib/s3/s3config";

import { PlusOutlined } from "@ant-design/icons";
import Preview from "./Preview/Preview";
import ReactQuill from "react-quill";
import httpRequest from "@iso/config/httpRequest";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.core.css";
import EditorWrapper from "./editor.style";
import { useHistory } from "react-router-dom";

import CardWrapper, { Box } from "./HomePage.styles";
const ABOUT_PAGE = "aboutPages";
const EditorFormat = {
  modules: {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [
        "link",
        // 'image',
        // 'video'
      ],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  },
  formats: [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    // 'image',
    // 'video',
  ],
};

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

export default function Posts() {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [isChangeImage, setIsChangeImage] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [desc, setDesc] = useState("");
  const [form] = Form.useForm();
  const history = useHistory();
  const handleCancel = () => setPreviewVisible(false);

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

  const getAboutPage = async () => {
    setLoading(true);
    const result = await httpRequest.getBasic("aboutPages");
    form.setFieldsValue(result);
    setFileList([{ ...result, url: result.img, uid: result.id }]);
    setDesc(result.desc);
    setLoading(false);
  };

  useEffect(() => {
    // Call API
    getAboutPage();
  }, []);

  const handleChange = async ({ fileList: newFileList, file }) => {
    setIsChangeImage(true);
    let preview = "";
    if (file.status !== "removed") {
      preview = await getBase64(file);
      form.setFieldsValue({
        img: file,
      });
    } else {
      form.setFieldsValue({
        img: null,
      });
    }
    const list = newFileList.map((item) => {
      if (item.uid === file.uid) {
        return {
          ...item,
          preview,
          url: preview,
          img: preview,
        };
      }

      return item;
    });
    setFileList(list);
  };

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

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChangeDesc = (htmlValue) => {
    setDesc(htmlValue);
    form.setFieldsValue({
      desc: htmlValue,
    });
  };

  const onFinish = async (values) => {
    setLoading(true);
    if (isChangeImage) {
      values.img = await addPhoto(ABOUT_PAGE, values.img);
    }
    await httpRequest.post("aboutPages", values);
    setLoading(false);
    notification.success({
      message: "Publish page",
      description: "About me page published successfully",
    });
    history.push("/admin/about-me");
  };
  useEffect(() => {}, []);

  return (
    <Spin spinning={loading}>
      <LayoutWrapper>
        <PageHeader>
          <IntlMessages id="sidebar.aboutMeManagement" />
        </PageHeader>
        <Box>
          <CardWrapper title="Home pape">
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
              <Row justify="end" style={{ marginBottom: 30 }}>
                <Col>
                  <Button type="primary" htmlType="submit">
                    Published
                  </Button>
                </Col>
              </Row>
              <Row gutter={[8, 24]}>
                <Col span={10} style={{ height: "500px", overflowY: "scroll" }}>
                  <Form.Item
                    label="Top image"
                    name="img"
                    rules={[
                      {
                        required: true,
                        message: "Please input image!",
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

                  <Form.Item
                    label="Description"
                    name="desc"
                    rules={[
                      {
                        required: true,
                        message: "Please input description!",
                      },
                    ]}
                  >
                    <EditorWrapper>
                      <ReactQuill
                        theme="snow"
                        value={desc}
                        onChange={handleChangeDesc}
                        modules={EditorFormat.modules}
                        formats={EditorFormat.formats}
                        bounds={".app"}
                        placeholder="Write something..."
                      />
                    </EditorWrapper>
                  </Form.Item>
                </Col>
                <Col span={14} style={{ height: "500px", overflowY: "scroll" }}>
                  <Preview img={fileList[0]?.url} desc={desc} />
                </Col>
              </Row>
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
            </Form>
          </CardWrapper>
        </Box>
      </LayoutWrapper>
    </Spin>
  );
}
