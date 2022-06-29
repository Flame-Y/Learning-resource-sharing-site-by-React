import { Menu, Avatar, Row, Col, Dropdown, Space, Switch, Layout } from "antd";
import {
  HomeOutlined,
  SettingOutlined,
  ReadOutlined,
  ReadFilled,
  UserOutlined,
  MessageFilled,
  EditFilled,
} from "@ant-design/icons";

import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import "./index.css";
const { Header } = Layout;
const Navigation = () => {
  const [theme, setTheme] = useState("light");
  let navigate = useNavigate();
  let show = false;
  if (window.sessionStorage.getItem("token")) {
    show = true;
  } else {
    show = false;
  }
  const [identity, setIdentity] = useState("vistor");
  useEffect(() => {
    window.sessionStorage.setItem("theme", "light");
    if (window.sessionStorage.getItem("userID") === "1") {
      setIdentity("admin");
    } else if (window.sessionStorage.getItem("userID") > 1) {
      setIdentity("user");
    } else {
      setIdentity("vistor");
    }
  }, [identity]);
  const exit = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("userID");
    navigate("/homepage");
    window.location.reload();
  };
  const menu = (
    <Menu
      items={[
        {
          label: (
            <Link to="/login">&nbsp;&nbsp;&nbsp;登录&nbsp;&nbsp;&nbsp;</Link>
          ),
        },
        {
          label: (
            <Link to="/register">&nbsp;&nbsp;&nbsp;注册&nbsp;&nbsp;&nbsp;</Link>
          ),
        },
      ]}
    />
  );
  const userMenu = (
    <Menu
      items={[
        {
          disabled: true,
          label: (
            <h3 style={{ textAlign: "center" }}>
              &nbsp;&nbsp;&nbsp;{window.sessionStorage.getItem("username")}
              &nbsp;&nbsp;&nbsp;
            </h3>
          ),
        },
        {
          label: (
            <h4 to="/login" style={{ textAlign: "center" }} onClick={exit}>
              退出
            </h4>
          ),
        },
      ]}
    />
  );
  const contentManageGroup = {
    type: "group", // Must have
    label: "内容管理",
    children: [
      {
        key: "/noticeManage",
        icon: <EditFilled />,
        label: `公告管理`,
        onClick: () => {
          navigate("/noticeManage");
        },
      },
      {
        key: "/commentManage",
        icon: <MessageFilled />,
        label: `留言管理`,
        onClick: () => {
          navigate("/commentManage");
        },
      },
      {
        key: "/passageManage",
        icon: <ReadFilled />,
        label: `文章管理`,
        onClick: () => {
          navigate("/passageManage");
        },
      },
    ],
  };
  const userManageGroup = {
    type: "group",
    label: "用户管理",
    children: [
      {
        key: "/userManage",
        icon: <UserOutlined />,
        label: `用户查询`,
        onClick: () => {
          navigate("/userManage ");
        },
      },
    ],
  };
  const adminItems = [
    {
      key: "/homepage",
      icon: <HomeOutlined />,
      label: `首页`,
      onClick: () => {
        navigate("/homepage");
      },
    },
    {
      key: "/passage",
      icon: <ReadOutlined />,
      label: "文章",
      onClick: () => {
        identity === "user" || identity === "admin"
          ? navigate("/passage")
          : navigate("/login");
      },
    },
    {
      icon: <SettingOutlined />,
      label: "后台管理界面",
      key: "submenu",
      children: [contentManageGroup, userManageGroup],
    },
    // {
    //   icon: <Avatar icon={<UserOutlined />} />,
    //   children:[{label:'登录',key:'login'},{label:'注册',key:'register'}],
    // },
  ];
  const items = [
    {
      key: "/homepage",
      icon: <HomeOutlined />,
      label: `首页`,
      onClick: () => {
        navigate("/homepage");
      },
    },
    {
      key: "/passage",
      icon: <ReadOutlined />,
      label: "文章",
      onClick: () => {
        identity === "user" || identity === "admin"
          ? navigate("/passage")
          : navigate("/login");
      },
    },
  ];
  const changeTheme = (value) => {
    setTheme(value ? "dark" : "light");
    window.sessionStorage.setItem("theme", value ? "dark" : "light");
  };
  // const breadcrumbNameMap = {
  //   "/passage": "Passage",
  //   "/noticeManage": "noticeManage",
  //   "/commentManage": "commentManage",
  //   "/passageManage": "passageManage",
  //   "/userManage": "userManage",
  //   "/passage/t": "??",
  // };
  // const location = useLocation();
  // const pathSnippets = location.pathname.split("/").filter((i) => i);
  // const extraBreadcrumbItems = pathSnippets.map((_, index) => {
  //   const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
  //   return (
  //     <Breadcrumb.Item key={url}>
  //       <Link to={url}>{breadcrumbNameMap[url]}</Link>
  //     </Breadcrumb.Item>
  //   );
  // });
  // const breadcrumbItems = [
  //   <Breadcrumb.Item key="home">
  //     <Link to="/">
  //       <HomeOutlined style={{ marginRight: 5 }} />
  //       Home
  //     </Link>
  //   </Breadcrumb.Item>,
  // ].concat(extraBreadcrumbItems);
  return (
    <Header
      style={{
        position: "fixed",
        zIndex: 1,
        width: "100%",
        backgroundColor: theme === "light" ? "#ffffff" : "#001529",
      }}
    >
      <Row style={{ marginBottom: 10 }}>
        <Col span={12}>
          <Link to="/homepage">
            <div className="logo">
              <img src={require("../../images/logo.png")} alt="" />
            </div>
          </Link>

          <Menu
            mode="horizontal"
            selectedKeys={[window.location.pathname]}
            theme={theme}
            // theme="dark"
            items={identity === "admin" ? adminItems : items}
          ></Menu>
        </Col>
        <Col span={12}>
          <Dropdown
            overlay={show ? userMenu : menu}
            placement="bottom"
            className="avatar"
          >
            <a href="!#" onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar size="large" icon={<UserOutlined />} />
              </Space>
            </a>
          </Dropdown>
          <Switch
            onChange={changeTheme}
            style={{ float: "right", marginTop: 21, marginRight: 20 }}
          />{" "}
        </Col>
      </Row>
      {/* <Breadcrumb>{breadcrumbItems}</Breadcrumb> */}
    </Header>
  );
};

export default Navigation;
