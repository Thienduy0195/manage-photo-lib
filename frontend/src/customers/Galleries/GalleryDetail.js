import React, { useState } from "react";
import {
  Spin,
  Row,
  Col,
  Typography,
  Result,
  Modal,
  Descriptions,
  Button,
  Empty,
} from "antd";
import {
  EnvironmentOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import cartAction from "@iso/redux/cart/actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import LayoutCustomer from "../Layout/Layout";
import "./styleDetail.css";
import moment from "moment";
import axios from "axios";

const baseUrl =
  process.env.REACT_APP_API_SERVER || "https://localhost:8900/api/v1";

const { Text, Title, Paragraph } = Typography;
const { addToCart } = cartAction;

export default function Galleries() {
  const [gallery, setGallery] = React.useState({});
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const getGallery = async () => {
    try {
      setLoading(true);
      const result = await axios.get(`${baseUrl}/galleries/${id}`);
      setGallery(result);
      setLoading(false);
    } catch (error) {
      Modal.error({
        title: "No data found!",
        content: "No exact results were found or the owner may have deleted it",
      });
      setLoading(false);
    }
  };

  React.useEffect(() => {
    // call API
    getGallery();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart(gallery));
    setVisible(true);
    Modal.success({
      visible,
      icon: "",
      width: 500,
      content: (
        <Result
          status="success"
          title="Congratulations!"
          subTitle={<img src={gallery.image} width="50%" />}
          extra={[
            <Button
              key="console"
              onClick={() => {
                setVisible(false);
                Modal.destroyAll();
                history.push("/galleries");
              }}
            >
              CONTINUE SHOPPING
            </Button>,
            <Button
              key="buy"
              onClick={() => {
                setVisible(false);
                Modal.destroyAll();
                history.push("/cart");
              }}
            >
              GO TO THE CART
            </Button>,
          ]}
        />
      ),
      okText: "CHECKOUT",
      closable: true,
      onOk: () => {
        setVisible(false);
        Modal.destroyAll();
        history.push("/checkout");
      },
      onCancel: () => {
        window.location.reload();
      },
    });
  };

  return (
    <LayoutCustomer>
      <Spin spinning={loading}>
        {Object.keys(gallery).length > 0 ? (
          <div>
            <header className="isoControlBar" style={{ paddingTop: "10px" }}>
              <Title level={2}>
                <Text strong>{gallery.title}</Text>
              </Title>
            </header>
            <Row justify="space-around">
              <Col xs={20} lg={18} xl={14} xxl={12}>
                <img src={gallery.image} className="img-responsive" />
              </Col>
              <Col xs={0}></Col>
              <Col xs={20} lg={18} xl={6} xxl={6}>
                <Descriptions
                  title={
                    <Title level={4}>
                      {/* <Text strong>CONFETTI</Text> */}
                    </Title>
                  }
                  column={1}
                >
                  <Descriptions.Item label={<EnvironmentOutlined />}>
                    {gallery.location}
                  </Descriptions.Item>
                  <Descriptions.Item label={<DollarOutlined />}>
                    {gallery.price} USD | PRINT
                  </Descriptions.Item>
                  <Descriptions.Item label={<ClockCircleOutlined />}>
                    {gallery.time || gallery.updated_at}
                  </Descriptions.Item>
                  <Descriptions.Item label="">
                    {gallery.description}
                  </Descriptions.Item>
                </Descriptions>
                <Button
                  type="primary"
                  icon={<ShoppingCartOutlined size="large" />}
                  style={{ marginRight: "10px" }}
                  onClick={handleAddToCart}
                >
                  Add to cart
                </Button>
              </Col>
            </Row>
          </div>
        ) : (
          <Empty />
        )}
      </Spin>
    </LayoutCustomer>
  );
}
