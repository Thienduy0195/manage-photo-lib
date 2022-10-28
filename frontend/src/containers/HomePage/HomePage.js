import React, { useEffect, useState } from "react";
import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import PageHeader from "@iso/components/utility/pageHeader";
import IntlMessages from "@iso/components/utility/intlMessages";
import uuidV4 from "uuid/v4";
import {
  Row,
  Col,
  Collapse,
  Modal,
  Upload,
  Input,
  Button,
  notification,
  Spin,
} from "antd";
import {
  PlusOutlined,
  FolderAddOutlined,
  DeleteOutlined,
  FullscreenOutlined,
} from "@ant-design/icons";
import Preview from "./SwiperSlider/SwiperSlider";
import CardWrapper, { Box, StatusTag } from "./HomePage.styles";
import { useHistory } from "react-router-dom";
import httpRequest from "@iso/config/httpRequest";
import { addPhoto } from "@iso/lib/s3/s3config";

const { Panel } = Collapse;
const { TextArea } = Input;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

const contentDefault = {
  image1: [],
  title: "",
  image2: [],
};

export default function Posts() {
  const [container, setContainer] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [totalContent, setTotalContent] = useState(0);
  const [fileList, setFileList] = useState([]);

  const [fileListFooter, setFileListFooter] = useState([]);

  const [fileListContent, setFileListContent] = useState([contentDefault]);
  const [slidersLength, setSlidersLength] = useState(0);
  const [footersLength, setFootersLength] = useState(0);
  const [contentsLength, setContentsLength] = useState(0);
  const [slidersDelete, setSlidersDelete] = useState([]);
  const [contentsDelete, setContentsDelete] = useState([]);
  const [footersDelete, setFootersDelete] = useState([]);
  const [headerSection, setHeaderSection] = useState({
    autoSlider: [],
    textLeft: "",
    textRight: "",
  });
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const initData = async () => {
    setLoading(true);
    const { data } = await httpRequest.getBasic("homes");
    const { headers, content, footer } = data;
    // Set header section
    const fileList = headers.sliders.map((item) => ({
      ...item,
      uid: item.id,
      name: headers.title,
      url: item.img,
    }));
    setSlidersLength(fileList.length);
    const headerSectionData = {
      autoSlider: fileList,
      textLeft: headers.title,
      textRight: headers.desc,
    };
    setHeaderSection(headerSectionData);
    setFileList(fileList);
    // Set content
    const listContent = content.map((item) => ({
      ...item,
      uid: item.id,
      title: item.desc,
      image1: [
        {
          uid: `${item.id}1`,
          name: "image1.png",
          status: "done",
          url: item.img1,
        },
      ],
      image2: [
        {
          uid: `${item.id}2`,
          name: "image2.png",
          status: "done",
          url: item.img2,
        },
      ],
    }));
    setFileListContent(listContent);
    setTotalContent(listContent.length);
    setContentsLength(listContent.length);
    // Set footer
    const fileListFooter = footer.map((item) => ({
      id: item.id,
      uid: item.id,
      name: "image.png",
      status: "done",
      preview: item.img,
      url: item.img,
    }));
    setFileListFooter(fileListFooter);
    setFootersLength(fileListFooter.length);
    setLoading(false);
  };

  useEffect(() => {
    initData();
  }, []);

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

  const handleChange = async ({ fileList: newFileList, file }) => {
    let preview = "";
    if (file.status !== "removed") {
      preview = await getBase64(file);
    } else {
      if (file.id) {
        setSlidersDelete([...slidersDelete, file.id]);
      }
    }
    const list = newFileList.map((item) => {
      if (item.uid === file.uid) {
        return {
          ...item,
          preview,
          url: preview,
          isChange: true,
          file,
        };
      }

      return item;
    });
    setFileList(newFileList);
    setHeaderSection({ ...headerSection, autoSlider: list });
  };

  const handleChangeFooter = async ({ fileList: newFileList, file }) => {
    let preview = "";
    if (file.status !== "removed") {
      preview = await getBase64(file);
    } else {
      if (file.id) {
        setFootersDelete([...footersDelete, file.id]);
      }
    }
    const list = newFileList.map((item) => {
      if (item.uid === file.uid) {
        return {
          ...item,
          preview,
          url: preview,
          isChange: true,
          file,
        };
      }

      return item;
    });
    setFileListFooter(list);
  };

  const handleChangeContent = async (
    { fileList: newFileList, file },
    index,
    fieldName
  ) => {
    let preview = "";
    if (file.status !== "removed") {
      preview = await getBase64(file);
    }
    setFileListContent(
      fileListContent.map((item, idx) => {
        if (idx === index) {
          return {
            ...item,
            [fieldName]: newFileList.map((item) => ({
              ...item,
              preview,
              isChange: true,
              file,
            })),
          };
        }
        return item;
      })
    );
  };

  const handleChangeTextTitle = (value, index) => {
    setFileListContent(
      fileListContent.map((item, idx) => {
        if (idx === index) {
          return {
            ...item,
            title: value,
          };
        }
        return item;
      })
    );
  };

  const handlePreviewContent = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
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

  const onChange = (key) => {
    console.log(key);
  };

  const genExtra = (item, index) => (
    <DeleteOutlined
      onClick={() => {
        const data = fileListContent.filter((item, idx) => idx !== index);
        if (item.id) {
          setContentsDelete([...contentsDelete, item.id]);
        }
        setFileListContent(data);
      }}
    />
  );

  const handlePublish = async () => {
    setLoading(true);
    const headerChange = headerSection.autoSlider.filter(
      (item) => item.isChange
    );
    let sliders = [];
    const getUrl = (path, file) => addPhoto(path, file);
    // Handle Header
    if (headerChange.length > 0) {
      const actions = await Promise.all(
        headerChange.map(async (item) => {
          const img = await getUrl("sliders", item.file ? item.file : item.url);
          return {
            id: item.id,
            header_id: item.header_id,
            img,
          };
        })
      );
      sliders = headerSection.autoSlider.map((item, idx) => {
        const change = actions.find((action) => action.id === item.id);
        return {
          id: item.id || uuidV4(),
          header_id: item.header_id,
          img: change ? change.img : item.img,
        };
      });
    } else {
      sliders = headerSection.autoSlider.map((item, idx) => {
        return {
          ...item,
          id: item.id,
        };
      });
    }
    const headers = {
      title: headerSection.textLeft,
      desc: headerSection.textRight,
      sliders,
    };
    // Handle Content
    await Promise.all(
      headerChange.map(async (item) => {
        const img = await getUrl("sliders", item.file ? item.file : item.url);
        return {
          id: item.id,
          header_id: item.header_id,
          img,
        };
      })
    );
    const contents = await Promise.all(
      fileListContent.map(async (item) => {
        const { image1, image2 } = item;
        let img1;
        let img2;
        if (image1.length > 0 && image1[0].isChange) {
          img1 = await getUrl(
            "contents",
            image1[0].file ? image1[0].file : image1[0].url
          );
        } else {
          img1 = image1[0].url;
        }
        if (image2.length > 0 && image2[0].isChange) {
          img2 = await getUrl(
            "contents",
            image2[0].file ? image2[0].file : image2[0].url
          );
        } else {
          img2 = image2[0].url;
        }

        return {
          id: item.id || uuidV4(),
          img1,
          img2,
          desc: item.title,
        };
      })
    );

    // Handle Footers
    const footers = await Promise.all(
      fileListFooter.map(async (item, idx) => {
        let img = item.url;
        if (item.isChange) {
          img = await getUrl("footers", item.file ? item.file : item.url);
        }

        return {
          id: item.id || uuidV4(),
          img,
        };
      })
    );
    await Promise.all(footers);

    const data = JSON.stringify({
      headers,
      contents,
      footers,
      slidersDelete,
      contentsDelete,
      footersDelete,
    });

    const res = await httpRequest.post("home-pages", data);
    notification.success({
      message: "Publish page",
      description: "Home page published successfully",
    });
    setLoading(false);
    history.go(0);
  };

  const handleAddContent = () => {
    setTotalContent(totalContent + 1);
    setFileListContent([...fileListContent, contentDefault]);
  };

  return (
    <Spin spinning={loading}>
      <LayoutWrapper>
        <PageHeader>
          <IntlMessages id="sidebar.homePageManagement" />
        </PageHeader>
        <Box>
          <CardWrapper title="Home pape">
            <Row justify="end" style={{ marginBottom: 30 }}>
              <Col>
                <Button type="primary" onClick={handlePublish}>
                  {" "}
                  Published
                </Button>
              </Col>
            </Row>
            <Row gutter={[8, 24]}>
              <Col span={8} style={{ height: "500px", overflowY: "scroll" }}>
                {/* Start Header */}
                <Collapse defaultActiveKey={["1"]} onChange={onChange}>
                  <Panel header="Header Slider" key="1">
                    <Upload
                      beforeUpload={() => false}
                      listType="picture-card"
                      fileList={fileList}
                      onPreview={handlePreview}
                      onChange={handleChange}
                    >
                      {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                    <TextArea
                      placeholder="Enter title Left"
                      autoSize={{ minRows: 2, maxRows: 6 }}
                      value={headerSection.textLeft}
                      onChange={(e) =>
                        setHeaderSection({
                          ...headerSection,
                          textLeft: e.target.value,
                        })
                      }
                    />
                    <TextArea
                      placeholder="Enter title right"
                      autoSize={{ minRows: 2, maxRows: 6 }}
                      value={headerSection.textRight}
                      onChange={(e) =>
                        setHeaderSection({
                          ...headerSection,
                          textRight: e.target.value,
                        })
                      }
                    />
                  </Panel>
                </Collapse>
                {/* Start Content */}
                <Row justify="end" style={{ marginTop: 30 }}>
                  <Col>
                    <Button
                      type="primary"
                      icon={<FolderAddOutlined />}
                      disabled={totalContent === 5}
                      onClick={handleAddContent}
                    >
                      Add content
                    </Button>
                  </Col>
                </Row>
                <Collapse
                  defaultActiveKey={[0]}
                  onChange={onChange}
                  style={{ marginTop: 8 }}
                >
                  {fileListContent.length > 0 && (
                    <Panel header="Content">
                      {fileListContent.map((item, index) => (
                        <Collapse
                          key={index}
                          defaultActiveKey={[0]}
                          onChange={onChange}
                          style={{ marginBottom: 8 }}
                        >
                          <Panel
                            header={`Content ${index + 1}`}
                            key={0}
                            extra={
                              fileListContent.length > 1 &&
                              genExtra(item, index)
                            }
                          >
                            <Upload
                              beforeUpload={() => false}
                              listType="picture-card"
                              fileList={item.image1}
                              onPreview={handlePreviewContent}
                              onChange={(e) =>
                                handleChangeContent(e, index, "image1")
                              }
                            >
                              {item.image1.length >= 1 ? null : uploadButton}
                            </Upload>
                            <Upload
                              beforeUpload={() => false}
                              listType="picture-card"
                              fileList={item.image2}
                              onPreview={handlePreviewContent}
                              onChange={(e) =>
                                handleChangeContent(e, index, "image2")
                              }
                            >
                              {item.image2.length >= 1 ? null : uploadButton}
                            </Upload>
                            <TextArea
                              placeholder="Enter content 2"
                              autoSize={{ minRows: 2, maxRows: 6 }}
                              value={item.title}
                              onChange={(e) =>
                                handleChangeTextTitle(e.target.value, index)
                              }
                            />
                          </Panel>
                        </Collapse>
                      ))}
                    </Panel>
                  )}
                </Collapse>
                {/* Start Footer */}
                <Collapse
                  defaultActiveKey={["1"]}
                  onChange={onChange}
                  style={{ marginTop: 10 }}
                >
                  <Panel header="Header Slider" key="1">
                    <Upload
                      beforeUpload={() => false}
                      listType="picture-card"
                      fileList={fileListFooter}
                      onPreview={handlePreview}
                      onChange={handleChangeFooter}
                    >
                      {fileListFooter.length >= 10 ? null : uploadButton}
                    </Upload>
                  </Panel>
                </Collapse>
              </Col>
              <Col
                span={16}
                style={{ height: "500px", overflowY: "scroll" }}
                ref={setContainer}
              >
                {/* <Affix style={{ position: 'absolute', top: -1, left: '95%' }} target={() => container}>
                <Button icon={<FullscreenOutlined />}></Button>
              </Affix> */}
                <Preview
                  headerSection={headerSection}
                  listContent={fileListContent}
                  gridSlider={fileListFooter}
                />
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
          </CardWrapper>
        </Box>
      </LayoutWrapper>
    </Spin>
  );
}
