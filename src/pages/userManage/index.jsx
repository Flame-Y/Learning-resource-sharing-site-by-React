import {
  Card,
  Col,
  Row,
  Table,
  Divider,
  Input,
  message,
  Breadcrumb,
} from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { apiGetUser, apiSearchUser } from "../../request/api/admin.js";
import "./index.css";
const { Search } = Input;
const columns = [
  {
    title: "ID",
    dataIndex: "userId",
    key: "userId",
    width: 300,
  },
  {
    title: "用户名",
    dataIndex: "username",
    key: "username",
    width: 500,
  },
  {
    title: "密码",
    dataIndex: "password",
    key: "password",
  },
];
let listTotal = 0;
const UserManage = () => {
  const pageSize = 10;
  const [pageNo, setPageNo] = useState(1);
  const [userData, setUserData] = useState([]);
  const [userID, setUserID] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [searchValue, setSearchValue] = useState();

  const changeSize = (current, size) => {
    setPageNo(current);
  };
  useEffect(() => {
    const getUser = () => {
      apiGetUser({ pageNo: pageNo, pageSize: pageSize })
        .then(function (response) {
          listTotal = response.data[1].match(/\d+(.\d+)?/g)[0] - 0;
          setUserData(response.data[0]);
        })
        .catch((error) => {
          console.log("请求失败", error);
        });
    };
    getUser();
  }, [pageNo]);
  for (let i = 0; i < userData.length; i++) {
    userData[i].key = i;
  }
  const searchUser = (value) => {
    apiSearchUser({ name: value })
      .then(function (response) {
        if (response.data === "") {
          message.error("用户不存在");
        } else if (value === "") {
          message.error("输入不能为空");
        } else {
          setUserID(response.data.userId);
          setUsername(response.data.username);
          setPassword(response.data.password);
          setSearchValue();
          message.success("查询结果如下");
        }
      })
      .catch((error) => {
        message.error("请求超时");
        console.log("请求失败", error);
      });
  };
  const getValue = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <div style={{ margin: "30px 50px 0 50px", paddingTop: 50 }}>
      <Breadcrumb style={{ marginBottom: 10 }}>
        <Breadcrumb.Item>
          <Link to="/">
            <HomeOutlined style={{ marginRight: 4 }} />
            <span>主页</span>
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <UserOutlined />
          <span>用户查询</span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Table
              columns={columns}
              dataSource={userData}
              rowSelection={{
                type: "radio",
                onChange: (selectedRowKeys, selectedRows) => {
                  setUserID(selectedRows[0].userId);
                  setUsername(selectedRows[0].username);
                  setPassword(selectedRows[0].password);
                },
              }}
              pagination={{
                position: ["bottomCenter"],
                total: listTotal * 10,
                showQuickJumper: true,
                onChange: changeSize,
              }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card style={{ minHeight: 757 }}>
            <Search
              placeholder="输入需要查询的用户名"
              onSearch={searchUser}
              value={searchValue}
              onChange={getValue}
              enterButton
            />
            <Divider />
            <h1 style={{ fontSize: 36, fontWeight: 700 }}>ID:{userID}</h1>
            <Divider />
            <h1 style={{ fontSize: 36, fontWeight: 700 }}>
              用户名：{username}
            </h1>
            <Divider />
            <h1 style={{ fontSize: 36, fontWeight: 700 }}>密码：{password}</h1>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserManage;
