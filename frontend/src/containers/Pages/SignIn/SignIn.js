import React from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Button from "@iso/components/uielements/button";
import IntlMessages from "@iso/components/utility/intlMessages";
import authAction from "@iso/redux/auth/actions";
import appAction from "@iso/redux/app/actions";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

import SignInStyleWrapper from "./SignIn.styles";
import { Form, Input, Checkbox, notification } from "antd";

const { login, clear, setIsFailed } = authAction;
const { clearMenu } = appAction;

export default function SignIn() {
  let history = useHistory();
  let location = useLocation();
  const dispatch = useDispatch();
  const { idToken, isLoading, isLoginSuccess, isLoginFail } = useSelector(
    (state) => state.Auth
  );
  const [form] = Form.useForm();
  const [redirectToReferrer, setRedirectToReferrer] = React.useState(false);

  React.useEffect(() => {
    if (idToken) {
      setRedirectToReferrer(true);
    }
  }, [idToken]);

  React.useEffect(() => {
    if (isLoginSuccess) {
      dispatch(clearMenu());
      history.push("/admin/home-page");
      clear();
    }
  }, [isLoginSuccess]);

  React.useEffect(() => {
    if (isLoginFail) {
      notification.error({
        message: 'Login failed!',
        description:
          'Email or password is invalid!',
      });
      setIsFailed()
    }
  }, [isLoginFail]);

  const handleLogin = (e) => {
    e.preventDefault();
    form.validateFields().then((values) => {
      dispatch(login(values));
    });
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  let { from } = location.state || { from: { pathname: "/admin/home-page" } };

  if (redirectToReferrer) {
    return <Redirect to={from} />;
  }
  return (
    <SignInStyleWrapper className="isoSignInPage">
      <div className="isoLoginContentWrapper">
        <div className="isoLoginContent">
          <div className="isoLogoWrapper">
            <Link to="/admin/home-page">
              <IntlMessages id="page.signInTitle" />
            </Link>
          </div>
          <div className="isoSignInForm">
            <Form
              form={form}
              name="login"
              initialValues={{
                email: "",
                password: "",
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="email"
                className="login-form"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Email isValid!" },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  size="large"
                  placeholder="Email"
                  autoComplete="true"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  size="large"
                  placeholder="Password"
                  autoComplete="false"
                />
              </Form.Item>
              {/* <Form.Item>
                <Link to="/forgotpassword" className="isoForgotPass">
                  <IntlMessages id="page.signInForgotPass" />
                </Link>
              </Form.Item> */}

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={handleLogin}
                  className="login-form-button"
                  loading={isLoading}
                >
                  <IntlMessages id="page.signInButton" />
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </SignInStyleWrapper>
  );
}
