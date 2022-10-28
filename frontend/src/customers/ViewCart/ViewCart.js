import React from 'react';
import { Row, Col, Typography, Form, Input, Descriptions, Button, Card, Result } from 'antd';
import LayoutCustomer from '../Layout/Layout'
import aboutImage from '@iso/assets/images/about/aboutImage.jpeg'
import './style.css'
import { useHistory } from 'react-router';
import CartTable from './CartTable';

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
      <header className="isoControlBar" style={{ paddingTop: '10px' }}>
          <Title level={2}>
            <Text strong>
              VIEW CART
            </Text>
          </Title>

        </header>
      <CartTable className="bordered" />

    </LayoutCustomer>
  );
}
