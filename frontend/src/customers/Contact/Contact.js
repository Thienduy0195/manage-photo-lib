import React from 'react';
import { Row, Col, Typography, Form, Input, Descriptions, Button, Card, Result } from 'antd';
import LayoutCustomer from '../Layout/Layout'
import aboutImage from '@iso/assets/images/about/aboutImage.jpeg'
import './style.css'
import { useHistory } from 'react-router';

const { Text, Title, Paragraph } = Typography;
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    tel: '${label} is not a valid phone!',
  }
};

export default function Galleries() {
  const history = useHistory()
  const [isSubmit, setIsSubmmit] = React.useState(false)
  const onFinish = (values) => {
    console.log(values);
    setIsSubmmit(true)
  };

  const handleToHome = () => {
    history.push('/')
  }

  return (
    <LayoutCustomer>
      {isSubmit ? <Result
        status="success"
        title="Support request submitted successfully!"
        subTitle="I will contact you soon"
        extra={[
          <Button type="primary" key="console" onClick={handleToHome}>
            Go to Home
          </Button>,
          <Button key="buy" onClick={() => setIsSubmmit(false)}>Resend request</Button>,
        ]}
      /> : <>
        <header className="isoControlBar" style={{ paddingTop: '10px' }}>
          <img src={aboutImage} />
        </header>
        <header className="isoControlBar" style={{ paddingTop: '10px' }}>
          <Title level={2}>
            <Text strong mark>
              Let’s talk
            </Text>
          </Title>

        </header>
        <Row justify='center' align='middle' >
          <Col flex xs={24} lg={20}>
            <Card>
              <Row justify='space-around'>
                <Col span={14}>
                  <Paragraph>
                    If you have any other inquiries, please fill out the contact request form and our team will be happy to assist you.
                  </Paragraph>
                  <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item
                      name={['user', 'name']}
                      label="Your Name"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name={['user', 'email']}
                      label="Your Email"
                      rules={[
                        {
                          type: 'email',
                          required: true,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name={['user', 'phone']}
                      label="Your Phone"
                      rules={[
                        {
                          type: 'tel',
                          required: true,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'subject']} label="Subject">
                      <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'message']} label="Your Message">
                      <Input.TextArea rows={5} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 14 }}>
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </Col>
                <Col span={8}>
                  <Descriptions title="User Info" column={1}>
                    <Descriptions.Item label="My Name">BEN QUICK</Descriptions.Item>
                    <Descriptions.Item label="Email">ben.quick@gmail.com</Descriptions.Item>
                    <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </>}

    </LayoutCustomer>
  );
}
