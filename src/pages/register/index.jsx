import React from "react";
import { Card, Form, Input, Button, message } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { apiRegister } from "../../request/api/user";

const Register = () => {
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const password = Form.useWatch("password", form);
  const onReset = () => {
    form.resetFields();
  };
  const toRegister = (values) => {
    var data = new URLSearchParams();
    data.append("password", values.password);
    data.append("username", values.username);
    apiRegister(data)
      .then(function (response) {
        console.log(response.data);
        if (response.data === "isOk") {
          message.success("注册成功");
          navigate("/login", {
            state: { password: values.password, username: values.username },
          });
          // window.location.reload();
        } else if (response.data === false) {
          message.error("该用户已存在");
          console.log("用户已存在");
        }
      })
      .catch((error) => {
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
            }}
            onFinish={toRegister}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="username"
              validateTrigger="onBlur"
              rules={[
                {
                  required: true,
                  message: "用户名不能为空",
                },
                {
                  type: "string",
                  whitespace: true,
                  message: "用户名中不能包含空格",
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
              validateTrigger="onBlur"
              rules={[
                {
                  required: true,
                  message: "密码不能为空",
                },
                {
                  type: "string",
                  whitespace: true,
                  message: "密码中不能包含空格",
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
            <Form.Item
              name="againPassword"
              validateTrigger={["onBlur", "onChange"]}
              validateFirst={true}
              rules={[
                {
                  required: true,
                  message: "密码不能为空",
                },
                {
                  type: "string",
                  whitespace: true,
                  message: "密码中不能包含空格",
                },
                {
                  type: "enum",
                  enum: [password],
                  validateTrigger: ["onBlur", "onChange"],
                  message: "两次输入密码不一致",
                },
              ]}
            >
              <Input.Password
                placeholder="请再次输入密码"
                prefix={<LockOutlined />}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Form.Item style={{ textAlign: "center" }}>
              <Button
                type="primary"
                shape="round"
                htmlType="submit"
                style={{ marginRight: "15px" }}
              >
                注册
              </Button>
              <Button shape="round" htmlType="button" onClick={onReset}>
                重置
              </Button>
            </Form.Item>
            <Form.Item style={{ textAlign: "center" }}>
              <p>已有账号？</p>
              <Link to="/login">登录</Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Card>
  );
};
export default Register;
