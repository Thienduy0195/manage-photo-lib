import React from 'react';
import { Row, Col, Typography } from 'antd';
import './style.css'

const { Text, Title, Paragraph } = Typography;

export default function Preview({
  img,
  desc
}) {

  return (
    <>
      <header className="isoControlBar" style={{ padding: '20px 0px' }}>
        {img && <img src={img} />}
      </header>
      <Row justify='center' align='middle' >
        <Col flex xs={24} lg={16} xl={12}>
        <div dangerouslySetInnerHTML={{ __html: desc }} />
        </Col>
      </Row>
    </>
  );
}
