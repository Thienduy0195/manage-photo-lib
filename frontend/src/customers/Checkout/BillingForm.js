import React from "react";
import IntlMessages from "@iso/components/utility/intlMessages";
import { Form, Input } from "antd";

export default function () {
  const [form] = Form.useForm();
  const handleOnChange = (checkedValues) => {};
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="checkout"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      layout="inline"
      form={form}
      onValuesChange={handleOnChange}
    >
      <Form.Item
        rules={[
          {
            required: true,
            message: "Please input your first name!",
          },
        ]}
        name="firstname"
        label={<IntlMessages id="checkout.billingform.firstname" />}
      >
        <Input />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: "Please input your last name!",
          },
        ]}
        name="lastname"
        label={<IntlMessages id="checkout.billingform.lastname" />}
      >
        <Input />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: "Please input your email!",
            type: 'email'
          },
        ]}
        name="email"
        label={<IntlMessages id="checkout.billingform.email" />}
      >
        <Input />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: "Please input your mobile!",
          },
        ]}
        name="mobile"
        label={<IntlMessages id="checkout.billingform.mobile" />}
      >
        <Input />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: "Please input your country!",
          },
        ]}
        name="country"
        label={<IntlMessages id="checkout.billingform.country" />}
      >
        <Input />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: "Please input your city!",
          },
        ]}
        name="city"
        label={<IntlMessages id="checkout.billingform.city" />}
      >
        <Input />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: "Please input your address!",
          },
        ]}
        name="address"
        label={<IntlMessages id="checkout.billingform.address" />}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="optional"
        label="Optional"
      >
        <Input />
      </Form.Item>
    </Form>
  );
}
