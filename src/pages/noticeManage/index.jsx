import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Card, List, Input, Button, message, Breadcrumb } from "antd";
import { HomeOutlined, EditFilled } from "@ant-design/icons";
import { apiGetNotice, apiUpdateComment } from "../../request/api/notice.js";
import "./index.css";
const { TextArea } = Input;
const NoticeBoard = () => {
  const [noticeData, setNoticeData] = useState([]);
  const [inputValue, setInputValue] = useState();
  useEffect(() => {
    const getNotice = () => {
      apiGetNotice()
        .then(function (response) {
          setNoticeData(response.data);
          //   console.log(response);
        })
        .catch((error) => {
          console.log("请求失败", error.message);
          // this.getNotice();
        });
    };
    getNotice();
  }, []);
  const textEL = useRef(null);
  const getNotice = () => {
    apiGetNotice()
      .then(function (response) {
        setNoticeData(response.data);
        //   console.log(response);
      })
      .catch((error) => {
        console.log("请求失败", error.message);
        // this.getNotice();
      });
  };
  const updateComment = () => {
    if (inputValue === "" || inputValue === undefined) {
      message.error("更新内容不能为空");
      return;
    }
    let data = new URLSearchParams();
    data.append("content", inputValue);
    apiUpdateComment(data)
      .then(function (response) {
        console.log(response);
        message.success("更新成功");
        getNotice();
        setInputValue();
      })
      .catch((error) => {
        console.log("请求失败", error.message);
        updateComment();
      });
  };

  const getValue = (e) => {
    setInputValue(e.target.value);
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
          <EditFilled />
          <span>公告管理</span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Card
        style={{
          margin: "auto",
          marginTop: 0,
          marginBottom: 30,
          textAlign: "center",
          width: "50%",
        }}
        bodyStyle={{ padding: 0 }}
        bordered={false}
        hoverable={true}
      >
        <List
          style={{ padding: 0 }}
          size="large"
          header={
            <h3
              style={{
                fontSize: 20,
                fontWeight: 700,
                marginBottom: 0,
                color: "#515a6e",
                textAlign: "center",
              }}
            >
              公 告 栏
            </h3>
          }
          bordered
          loading={noticeData.length === 0 ? true : false}
          dataSource={noticeData}
          renderItem={(item) => <List.Item>{item.content}</List.Item>}
        />
      </Card>
      <Card
        bordered={false}
        style={{
          margin: " auto",
          textAlign: "center",
          width: "50%",
        }}
      >
        <h2
          style={{
            fontSize: 21,
            fontWeight: 700,
            color: "#515a6e",
            marginBottom: 16,
          }}
        >
          有什么新鲜事告诉大家
        </h2>
        <TextArea
          style={{ marginBottom: 13, fontSize: "1.3rem", color: "#515a6e" }}
          rows={3}
          ref={textEL}
          value={inputValue}
          onChange={getValue}
        />
        <Button
          type="primary"
          danger
          style={{ borderRadius: "4px" }}
          onClick={updateComment}
        >
          更新公告
        </Button>
      </Card>
    </div>
  );
};

export default NoticeBoard;
