import { Button, Upload, Form, Input, Modal, notification, Spin } from "antd";
import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import CardWrapper, { Box } from "./Post.styles";
import PageHeader from "@iso/components/utility/pageHeader";
import IntlMessages from "@iso/components/utility/intlMessages";
import { useHistory, useParams } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.core.css";
import EditorWrapper from "./editor.style";
import React, { useEffect, useRef, useState } from "react";
import { addPhoto } from "@iso/lib/s3/s3config";
import httpRequest from "@iso/config/httpRequest";
import { useMemo } from "react";

const POSTS_FOLDER = "posts";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

const Post = () => {
  const quillRef = useRef();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChangeImage, setIsChangeImage] = useState(false);
  const [postDetail, setPostDetail] = useState({});
  const history = useHistory();
  const { postId } = useParams();

  const imageHandler = (e) => {
    const editor = quillRef.current.getEditor();
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (/^image\//.test(file.type)) {
        setLoading(true);
        const url = await addPhoto(POSTS_FOLDER, file);
        console.log(url, "??url", editor);
        editor.insertEmbed(editor.getSelection(), "image", url);
        setLoading(false);
      } else {
        console.log("error");
      }
    };
  };

  const EditorFormat = useMemo(
    () => ({
      modules: {
        toolbar: {
          container: [
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
              "image",
              // "video"
            ],
            ["clean"],
          ],
          handlers: {
            image: imageHandler,
          },
        },
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
        "image",
        // "video",
      ],
    }),
    []
  );

  const getPost = async () => {
    setLoading(true);
    const result = await httpRequest.get(`posts/${postId}`);
    setPostDetail(result);
    form.setFieldsValue(result);
    setFileList([{ ...result, url: result.image }]);
    setDesc(result.desc);
    setLoading(false);
  };
  useEffect(() => {
    // Call API
    getPost();
  }, [postId]);

  const onFinish = async (values) => {
    setLoading(true);
    if (isChangeImage) {
      values.image = await addPhoto(POSTS_FOLDER, values.image);
    }
    const result = await httpRequest.put(`posts/${postId}`, values, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    setLoading(false);
    notification.success({
      message: "Successfully",
      description: "The post was successfully updated.",
    });
    window.location.href = "/admin/posts"
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

  const handleChangeDesc = (htmlValue) => {
    setDesc(htmlValue);
    form.setFieldsValue({
      desc: htmlValue,
    });
  };

  const handleBackToPost = () => {
    history.push("/admin/posts");
  };

  return (
    <Spin spinning={loading}>
      <LayoutWrapper>
        <PageHeader>
          <IntlMessages id="sidebar.editPost" />
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
                label="Top image"
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
                    ref={quillRef}
                    value={desc}
                    onChange={handleChangeDesc}
                    modules={EditorFormat.modules}
                    formats={EditorFormat.formats}
                    bounds={".app"}
                    placeholder="Write something..."
                  />
                </EditorWrapper>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 10,
                  span: 16,
                }}
              >
                <Button type="default" style={{ marginRight: "10px" }}>
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
