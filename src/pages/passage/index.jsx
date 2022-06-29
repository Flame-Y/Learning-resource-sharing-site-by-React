import { Table, Space, Tooltip, message, Breadcrumb } from "antd";
import { HomeOutlined, ReadOutlined } from "@ant-design/icons";

import React, { useState, useEffect } from "react";
import { apiGetPassage } from "../../request/api/passage";
import { Outlet, useParams, Link } from "react-router-dom";

const columns = [
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
    width: 300,
  },
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
              width: 480,
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
    title: "发布时间",
    dataIndex: "time",
    key: "time",
    sorter: (a, b) => {
      let aTime = new Date(a.time).getTime();
      let bTime = new Date(b.time).getTime();
      return aTime - bTime;
    },
  },

  {
    title: "Action",
    key: "action",
    render: (text, record, index) => (
      <Space size="middle">
        <Link to={"" + record.id + ""}>查看详情</Link>
      </Space>
    ),
  },
];
let listTotal = 0;
const Passage = () => {
  const params = useParams();
  const pageSize = 10;
  const [pageNo, setPageNo] = useState(1);
  const [passageData, setPassageData] = useState([]);

  useEffect(() => {
    const getPassage = () => {
      apiGetPassage({ pageNo: pageNo, pageSize: pageSize })
        .then(function (response) {
          console.log(response);
          listTotal = response.data.总页数;
          setPassageData(response.data.passageItem);
        })
        .catch((error) => {
          console.log("请求失败", error);
          getPassage();
          message.loading("文章加载失败，重新加载中");
        });
    };
    getPassage();
  }, [pageNo]);
  for (let i = 0; i < passageData.length; i++) {
    passageData[i].key = i;
  }
  const changeSize = (current, size) => {
    setPageNo(current);
  };
  return (
    <div style={{ margin: "30px 50px 0 50px", paddingTop: 50 }}>
      <Breadcrumb
        style={{ marginBottom: 10, display: params.id ? "none" : "block" }}
      >
        <Breadcrumb.Item>
          <Link to="/">
            <HomeOutlined style={{ marginRight: 4 }} />
            <span>主页</span>
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <ReadOutlined />
          <span>文章</span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Outlet />
      <Table
        style={{ display: params.id ? "none" : "block" }}
        loading={passageData.length === 0 ? true : false}
        columns={columns}
        pagination={{
          position: ["bottomCenter"],
          total: listTotal * 10,
          showQuickJumper: true,
          onChange: changeSize,
        }}
        dataSource={passageData}
      />
    </div>
  );
};

export default Passage;
