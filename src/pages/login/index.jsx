import React from "react";
import { Card, Form, Input, Button, Checkbox, message } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import "./index.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { apiLogin } from "../../request/api/user";

const Login = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let username;
  let password;
  if (location.state !== null) {
    username = location.state.username;
    password = location.state.password;
  }
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };
  const toLogin = (values) => {
    var data = new URLSearchParams();
    data.append("password", values.password);
    data.append("username", values.username);
    apiLogin(data)
      .then(function (response) {
        console.log(response);
        if (response.data.code !== 200) {
          console.log("登录失败:" + response.data.message);
          if (response.data.data === "无用户") {
            message.error("该用户不存在");
            console.log("该用户不存在");
          } else {
            message.error("密码错误");
          }
        } else {
          message.success("登录成功");
          window.sessionStorage.setItem("token", response.data.data.token);
          window.sessionStorage.setItem("username", values.username);
          window.sessionStorage.setItem("userID", response.data.data.userID);
          window.setTimeout(() => {
            navigate("/homepage");
            window.location.reload();
          }, 500);
        }
      })
      .catch((error) => {
        message.error("请求超时");
        console.log("请求失败", error.message);
      });
  };
  const onFinishFailed = () => {
    console.log("表单数据违规");
  };
  return (
    <Card className="body">
      <div className="middle">
        <div className="form">
          <Form
            style={{ margin: "auto", paddingTop: 150, width: 300 }}
            form={form}
            layout="horizontal"
            className="login-form"
            initialValues={{
              remember: true,
              username: username,
              password: password,
            }}
            onFinish={toLogin}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "用户名不能为空",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="请输入用户名"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "密码不能为空",
                },
              ]}
            >
              <Input.Password
                placeholder="请输入密码"
                prefix={<LockOutlined />}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住密码</Checkbox>
              </Form.Item>
            </Form.Item>
            <Form.Item style={{ textAlign: "center" }}>
              <Button
                type="primary"
                shape="round"
                htmlType="submit"
                style={{ marginRight: "15px" }}
              >
                登录
              </Button>
              <Button shape="round" htmlType="button" onClick={onReset}>
                重置
              </Button>
            </Form.Item>
            <Form.Item style={{ textAlign: "center" }}>
              <p>首次使用？</p>
              <Link to="/register">点我注册!</Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Card>
  );
};
export default Login;
