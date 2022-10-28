import React, { useState } from "react";
import { Typography, Form, Input } from "antd";
import LayoutCustomer from "../Layout/Layout";
import "./style.css";
import { useHistory } from "react-router";
import Box from "@iso/components/utility/box";
import BillingForm from "./BillingForm";
import IntlMessages from "@iso/components/utility/intlMessages";
import OrderInfo from "./OrderInfo";
import { CheckoutContents, BillingFormWrapper } from "./Checkout.styles";

const { Text, Title } = Typography;
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};
export default function Checkout() {
  const [form] = Form.useForm();
  const [isValid, setIsValid] = useState(false);
  const handleOnChange = (value) => {
    const values = form.getFieldsValue();
    delete values.optional;
    const listKey = Object.keys(values);
    let valid = false;
    for (let index = 0; index < listKey.length; index++) {
      if (!values[listKey[index]]) {
        valid = false;
        return;
      }
      valid = true;
    }
    setIsValid(valid);
  };
  const handleSubmit = () => {
    let values = null;
    form.submit().then((items) => {
      console.log(items, "??items");
    });
  };
  const history = useHistory();

  return (
    <CheckoutContents>
      <LayoutCustomer>
        <header className="isoControlBar" style={{ paddingTop: "10px" }}>
          <Title level={2}>
            <Text strong>CHECKOUT</Text>
          </Title>
        </header>
        <Box
          className="isoCheckoutPage"
          style={{ height: "auto", border: "none" }}
        >
          <div className="isoBillingAddressWrapper">
            <h3 className="isoSectionTitle">Billing details</h3>
            <div className="isoBillingSection">
              <BillingFormWrapper>
                <Form
                  {...layout}
                  name="checkout"
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
                        type: "email",
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
                  <Form.Item name="optional" label="Optional">
                    <Input />
                  </Form.Item>
                </Form>
              </BillingFormWrapper>
              <OrderInfo
                isValid={isValid}
                getData={() => form.getFieldsValue()}
              />
            </div>
          </div>
        </Box>
      </LayoutCustomer>
    </CheckoutContents>
  );
}
