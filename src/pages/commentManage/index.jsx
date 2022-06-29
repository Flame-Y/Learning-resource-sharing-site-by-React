import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Table,
  Button,
  message,
  Tooltip,
  Space,
  Popconfirm,
  Breadcrumb,
} from "antd";
import { HomeOutlined, MessageFilled } from "@ant-design/icons";
import { apiGetComment, apiRemoveComment } from "../../request/api/hall";
import "./index.css";

let listTotal = 0;
let listFooter = "";

const CommentManage = () => {
  const pageSize = 10;
  const [pageNo, setPageNo] = useState(1);
  const [commentData, setCommentData] = useState([]);
  const columns = [
    {
      title: "内容",
      dataIndex: "content",
      key: "content",
      width: 500,
      // ellipsis: true,
      render: (text, record) => {
        return (
          <Tooltip placement="top" title={text}>
            <div
              style={{
                width: "70%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {text}
            </div>
          </Tooltip>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: "30%",
      render: (text, record, index) => (
        <Space size="middle">
          <Popconfirm
            title="确认删除?"
            onConfirm={() => removeComment(record.id)}
          >
            <Button type="primary" danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    const getComment = () => {
      let data = new URLSearchParams();
      data.append("pageNo", pageNo);
      data.append("pageSize", pageSize);
      apiGetComment(data)
        .then(function (response) {
          console.log(response.data[0]);
          setCommentData(response.data[0]);
          listFooter = response.data[2];
          var numArr = listFooter.match(/\d+/g);
          listTotal = numArr[0] - 0;
          //   console.log(listTotal);
        })
        .catch((error) => {
          console.log("请求失败", error.message);
          // getComment();
        });
    };
    getComment();
  }, [pageNo]);
  for (let i = 0; i < commentData.length; i++) {
    commentData[i].key = i;
  }
  const getComment = () => {
    let data = new URLSearchParams();
    data.append("pageNo", pageNo);
    data.append("pageSize", pageSize);
    apiGetComment(data)
      .then(function (response) {
        console.log(response.data[0]);
        setCommentData(response.data[0]);
        listFooter = response.data[2];
        var numArr = listFooter.match(/\d+/g);
        listTotal = numArr[0] - 0;
        //   console.log(listTotal);
      })
      .catch((error) => {
        console.log("请求失败", error.message);
        // getComment();
      });
  };
  const removeComment = (id) => {
    let data = new URLSearchParams();
    data.append("ID", id);
    apiRemoveComment(data)
      .then(function (response) {
        console.log(response);
        message.success("删除成功");
        getComment();
      })
      .catch((error) => {
        console.log("请求失败", error.message);
        removeComment(id);
      });
  };
  const changeSize = (current, size) => {
    setPageNo(current);
  };
  return (
    <div style={{ margin: "50px 50px 0 50px", paddingTop: 30 }}>
      <Breadcrumb style={{ marginBottom: 10 }}>
        <Breadcrumb.Item>
          <Link to="/">
            <HomeOutlined style={{ marginRight: 4 }} />
            <span>主页</span>
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <MessageFilled />
          <span>留言管理</span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Card
        style={{ margin: "0 50px" }}
        bodyStyle={{ padding: 0 }}
        bordered={false}
      >
        <Table
          loading={commentData.length === 0 ? true : false}
          columns={columns}
          pagination={{
            position: ["bottomCenter"],
            total: listTotal * 10,
            showQuickJumper: true,
            showSizeChanger: false,

            onChange: changeSize,
          }}
          dataSource={commentData}
        />
      </Card>
    </div>
  );
};
export default CommentManage;
