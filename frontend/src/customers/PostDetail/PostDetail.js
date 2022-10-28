import React from "react";
import { Card, Row, Col, Typography, Divider } from "antd";
import LayoutCustomer from "../Layout/Layout";
import basicStyle from "@iso/assets/styles/constants";
import { useParams } from "react-router-dom";
import axios from 'axios';
import './style.css';

const baseUrl = process.env.REACT_APP_API_SERVER || 'https://localhost:8900/api/v1'
const { Title } = Typography;

export default function Home() {
  const { rowStyle, gutter } = basicStyle;
  const [post, setPost] = React.useState({});
  const { id } = useParams();

  const getPost = async () => {
    const result = await axios.get(`${baseUrl}/posts/${id}`);
    setPost(result);
  }

  React.useEffect(() => {
    getPost()
  }, [id]);

  return (
    <LayoutCustomer>
      <Card style={{ width: "100%", height: "100%" }}>
        <Row
          gutter={gutter}
          justify="center"
          style={{ ...rowStyle, padding: '30px' }}
        >
          <Col>
            <img className="img-responsive" alt="image" src={post.image} />
          </Col>
        </Row>
        <Row gutter={gutter} justify="center" style={rowStyle}>
          <Col>
            <Title level={2}>
              {post.title}
              <Divider />
            </Title>
          </Col>
        </Row>

        <Row gutter={gutter} justify="center" style={rowStyle}>
          <Col span={20} md={16} xl={12} xxl={10} className="custom_image">
            <div dangerouslySetInnerHTML={{ __html: post.desc }}></div>
          </Col>
        </Row>
      </Card>
    </LayoutCustomer>
  );
}
