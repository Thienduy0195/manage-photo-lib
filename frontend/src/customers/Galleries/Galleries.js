import React, { useEffect, useState } from "react";
import { Divider, List, Skeleton, Select, Typography, Card, Form } from "antd";
import { useHistory } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  LazyLoadComponent,
  LazyLoadImage,
} from "react-lazy-load-image-component";
import LayoutCustomer from "../Layout/Layout";
import "./style.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import httpRequest from "@iso/config/httpRequest";

const { Meta } = Card;

const baseUrl =
  process.env.REACT_APP_API_SERVER || "https://localhost:8900/api/v1";
const { Text, Title } = Typography;

export default function Galleries() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("all");
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(1);
  const history = useHistory();
  const loadMoreData = () => {
    if (loading || lastPage === page) {
      return;
    }
    const nextPage = page + 1;
    setPage(nextPage);
    setLoading(true);
    fetch(
      `${baseUrl}/galleries?page=${nextPage}&category_id=${currentCategory}`
    )
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.data]);
        setLoading(false);
        setLastPage(body.last_page);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const filterCategory = async (id) => {
    setLoading(true);
    const categories = await httpRequest.getBasic(
      `galleries?page=1&category_id=${id}`
    );
    setData(categories.data);
    setPage(categories.current_page);
    setLastPage(categories.last_page);
    setLoading(false);
  };

  const getCategories = async () => {
    const categories = await httpRequest.getBasic("categories");
    const data = (categories.data || []).map((item) => ({
      label: item.name,
      value: item.id,
    }));

    setCategories([{ label: "All", value: "all" }, ...data]);
  };

  const handleChangeCategories = async (id) => {
    setData([]);
    setPage(1);
    setCurrentCategory(id);
    await filterCategory(id);
  };

  useEffect(() => {
    getCategories();
    loadMoreData();
  }, []);

  return (
    <LayoutCustomer>
      <header className="isoControlBar" style={{ paddingTop: "10px" }}>
        <Title level={2}>
          <Text strong>UNDER THE CONICAL HAT</Text>
        </Title>
      </header>
      <header className="isoControlBar">
        <Title level={4}>
          <Text strong>A Gallery of Images From Central Vietnam</Text>
        </Title>
      </header>
      <div
        id="scrollableDiv"
        style={{
          padding: "0 16px",
          backgroundColor: "#ffffff",
        }}
      >
        <Form
          name="basic"
          layout="vertical"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 6,
          }}
          initialValues={{
            category_id: currentCategory,
          }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{ padding: "20px 0 " }}
        >
          <Form.Item
            label="Please select filter by category"
            name="category_id"
          >
            <Select
              placeholder="Please select filter by category..."
              options={categories}
              onSelect={handleChangeCategories}
            ></Select>
          </Form.Item>
        </Form>
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={page < lastPage}
          loader={
            <Skeleton
              avatar
              paragraph={{
                rows: 1,
              }}
              active
            />
          }
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={data}
            grid={{
              gutter: 16,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 2,
              xl: 3,
              xxl: 4,
            }}
            renderItem={(item, index) => (
              <List.Item
                key={item.email}
                onClick={() => history.push(`/gallery/${item.id}`)}
              >
                <LazyLoadComponent>
                  <Card
                    hoverable
                    cover={
                      <LazyLoadImage
                        key={item.id}
                        alt={item.title}
                        src={item.image}
                        className="imgGallerySize"
                      />
                    }
                    style={{ width: "100%", height: "100%" }}
                  >
                    <Meta title={item.title} />
                  </Card>
                </LazyLoadComponent>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </LayoutCustomer>
  );
}
