import {
  Table,
  Space,
  Tooltip,
  Button,
  Drawer,
  Form,
  Input,
  Result,
  Card,
  BackTop,
  message,
  Breadcrumb,
} from "antd";
import { HomeOutlined, ReadFilled } from "@ant-design/icons";
import React, { useState, useEffect, useRef } from "react";
import { Outlet, useParams, Link } from "react-router-dom";
import { apiGetPassage, apiCreatePassage } from "../../request/api/passage";
import "./index.css";
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
        <Link to={"" + record.id + ""}>详情管理</Link>
      </Space>
    ),
  },
];
let listTotal = 0;
const PassageManage = () => {
  const params = useParams();
  const pageSize = 10;
  const [pageNo, setPageNo] = useState(1);
  const [passageData, setPassageData] = useState([]);
  const [passageTitle, setPassageTitle] = useState([]);
  const [passageContent, setPassageContent] = useState([]);
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [resultVisible, setResultVisible] = useState("none");
  useEffect(() => {
    const getPassage = () => {
      apiGetPassage({ pageNo: pageNo, pageSize: pageSize })
        .then(function (response) {
          listTotal = response.data.总页数;
          setPassageData(response.data.passageItem);
        })
        .catch((error) => {
          console.log("请求失败", error);
          // getPassage();
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
  const createPassage = () => {
    apiCreatePassage({
      content: passageContent,
      title: passageTitle,
    })
      .then(function (response) {
        if (response.data.code === 401) {
        } else {
          message.success("发送成功");
          onReset();
          onClose();
          document.getElementsByClassName("backtop")[0].click();
          window.setTimeout(() => {
            setResultVisible("block");
          }, 500);
          getPassage();
        }
      })
      .catch((error) => {
        console.log("请求失败", error.message);
        message.error("请求超时");
      });
  };
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const onReset = () => {
    form.resetFields();
  };
  const textEL = useRef(null);

  const getTitle = (e) => {
    setPassageTitle(e.target.value);
  };
  const getContent = (e) => {
    setPassageContent(e.target.value);
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
          <ReadFilled />
          <span>文章管理</span>
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
      <BackTop visibilityHeight={0}>
        <div
          style={{
            display: "none",
          }}
          className="backtop"
        >
          UP
        </div>
      </BackTop>
      <Button block type="primary" onClick={showDrawer}>
        创建新文章
      </Button>
      <Drawer
        title="创建新文章"
        height={600}
        bodyStyle={{ paddingTop: 50 }}
        footer={
          <Space style={{ float: "right", marginRight: 30 }}>
            <Button onClick={onClose}>取消</Button>
            <Button onClick={onReset}>重置</Button>
            <Button onClick={() => createPassage()} type="primary">
              创建
            </Button>
          </Space>
        }
        onClose={onClose}
        visible={visible}
        placement="bottom"
      >
        <Form
          layout="vertical"
          hideRequiredMark
          form={form}
          style={{ margin: "auto", width: 700 }}
        >
          <Form.Item
            name="title"
            label="标题"
            style={{ marginBottom: 50 }}
            rules={[
              {
                required: true,
                message: "标题不能为空",
              },
            ]}
          >
            <Input
              style={{ fontSize: 24, fontWeight: 700 }}
              value={passageTitle}
              onChange={getTitle}
            />
          </Form.Item>
          <Form.Item
            name="content"
            label="内容"
            rules={[
              {
                required: true,
                message: "文章内容不能为空",
              },
            ]}
          >
            <Input.TextArea
              rows={5}
              style={{ fontSize: 18 }}
              ref={textEL}
              value={passageContent}
              onChange={getContent}
            />
          </Form.Item>
        </Form>
      </Drawer>
      <div
        className={`mask ${resultVisible === "x" ? "resultClose" : "successP"}`}
        style={{ display: resultVisible }}
      >
        <Card
          style={{
            position: "absolute",
            top: 50,
            left: 0,
            right: 0,
            bottom: 0,
            margin: "auto",
            zIndex: 2,
            width: 700,
            height: 350,
            display: resultVisible,
          }}
          // className={`${resultVisible === "x" ? "resultClose" : "successP"}`}
          // className="successP"
        >
          <Result
            status="success"
            title="文章发布成功!"
            subTitle="若界面无反应请进行刷新"
            extra={[
              <Button
                type="primary"
                key="console"
                onClick={() => {
                  setResultVisible("x");
                  window.setTimeout(() => {
                    setResultVisible("none");
                  }, 1000);
                }}
              >
                确认
              </Button>,
            ]}
          />
        </Card>
      </div>
    </div>
  );
};

export default PassageManage;
