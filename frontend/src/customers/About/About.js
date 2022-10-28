import React, { useState, useEffect } from "react";
import { Row, Col, Spin } from "antd";
import LayoutCustomer from "../Layout/Layout";
import "./style.css";
import httpRequest from "@iso/config/httpRequest";

export default function Galleries() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const getAboutPage = async () => {
    setLoading(true);
    const result = await httpRequest.getBasic("aboutPages");
    setData(result);
    setLoading(false);
  };

  useEffect(() => {
    // Call API
    getAboutPage();
  }, []);
  return (
    <Spin spinning={loading}>
      {data && (
        <LayoutCustomer>
          <header className="isoControlBar" style={{ paddingTop: "10px" }}>
            <img className="imgAboutSize" src={data.img} />
          </header>
          <Row justify="center" align="middle">
            <Col flex xs={20} lg={16} xl={12}>
              <div dangerouslySetInnerHTML={{ __html: data.desc }} />
            </Col>
          </Row>
        </LayoutCustomer>
      )}
    </Spin>
  );
}
