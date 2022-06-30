import React, { useEffect, useState, useRef } from "react";
import {
  Layout,
  Image,
  Divider,
  Typography,
  Tabs,
  List,
  Comment,
  Input,
  Button,
  message,
  Breadcrumb,
} from "antd";
import { HomeOutlined, ReadOutlined } from "@ant-design/icons";

import "./index.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  apiGetPassageResource,
  apiCreateComment,
  apiDownResource,
} from "../../request/api/passage.js";
const { Sider, Content } = Layout;
const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;

const PassageDetail = () => {
  // 获取动态路由的值
  const params = useParams();
  const navigate = useNavigate();

  const id = params.id;

  const [visible, setVisible] = useState(false);
  const [passageResource, setPassageResource] = useState([
    { content: "", title: "", time: "", id: 0 },
    [{ address: "" }],
    {},
    [],
  ]);
  const [url, setUrl] = useState([{ id: "", url: "" }]);
  const [inputValue, setInputValue] = useState();

  useEffect(() => {
    const getPassageResource = (id) => {
      apiGetPassageResource({ passageID: id })
        .then(function (response) {
          if (response.data[0] === null) {
            navigate("/notFound");
          }
          setPassageResource(response.data);
          let tag = Object.keys(response.data[2]);
          let Imgbase = [];
          for (let i = 0; i < tag.length; i++) {
            Imgbase[i] = { id: "", url: "" };
          }
          for (let i = 0; i < tag.length; i++) {
            Imgbase[i].id = tag[i].slice(6);
          }
          for (let i = 0; i < tag.length; i++) {
            Imgbase[i].url =
              "data:image/jpeg;base64," + response.data[2][tag[i]];
          }
          if (Imgbase.length) {
            setUrl(Imgbase);
          }
        })
        .catch((error) => {
          console.log("请求失败", error.message);
          //getPassageResource(id);
        });
    };
    getPassageResource(id);
  }, [id, navigate]);
  const getPassageResource = (id) => {
    apiGetPassageResource({ passageID: id })
      .then(function (response) {
        setPassageResource(response.data);
        let tag = Object.keys(response.data[2]);
        let Imgbase = [];
        for (let i = 0; i < tag.length; i++) {
          Imgbase[i] = { id: "", url: "" };
        }
        for (let i = 0; i < tag.length; i++) {
          Imgbase[i].id = tag[i].slice(6);
        }
        for (let i = 0; i < tag.length; i++) {
          Imgbase[i].url = "data:image/jpeg;base64," + response.data[2][tag[i]];
        }
        if (Imgbase.length) {
          setUrl(Imgbase);
        }
      })
      .catch((error) => {
        console.log("请求失败", error.message);
        // this.getPassageResource(id);
      });
  };
  const getValue = (e) => {
    setInputValue(e.target.value);
  };
  const textEL = useRef(null);

  const uploadResource = (user) => {
    let data = new FormData();
    data.append("filePath", user.address);
    apiDownResource(data)
      .then(function (res) {
        console.log(res);
        const { data, headers } = res;
        if (headers["content-disposition"] != null) {
          var fileName = headers["content-disposition"].replace(
            /\w+;filename=(.*)/,
            "$1"
          );
        }
        const blob = new Blob([data], { type: headers["content-type"] });
        let dom = document.createElement("a");
        let url = window.URL.createObjectURL(blob);
        dom.href = url;
        dom.download = decodeURI(fileName);
        dom.style.display = "none";
        document.body.appendChild(dom);
        dom.click();
        dom.parentNode.removeChild(dom);
        window.URL.revokeObjectURL(url);
        message.success("下载成功");
      })
      .catch((error) => {
        console.log("请求失败", error.message);
      });
  };
  const addComment = (id) => {
    if (inputValue === "" || inputValue === undefined) {
      message.error("发送内容不能为空");
      return;
    }
    apiCreateComment({
      content: inputValue,
      passageID: id,
      userID: window.sessionStorage.getItem("userID"),
    })
      .then(function (response) {
        if (response.data.code === 401) {
          message.error("发送失败");
        } else {
          message.success("发送成功");
        }
        setInputValue();
        getPassageResource(id);
      })
      .catch((error) => {
        message.error("请求超时");
        console.log("请求失败", error.message);
      });
  };
  return (
    <div>
      <Breadcrumb style={{ marginBottom: 10 }}>
        <Breadcrumb.Item>
          <Link to="/">
            <HomeOutlined style={{ marginRight: 4 }} />
            <span>主页</span>
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/passage">
            <ReadOutlined style={{ marginRight: 4 }} />
            <span>文章</span>
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{passageResource[0].title}</Breadcrumb.Item>
      </Breadcrumb>
      <Layout>
        <Sider style={{ backgroundColor: "#f0f2f5" }}>
          <Image
            width={200}
            height={270}
            src={
              url[0].id === ""
                ? require("../../images/图片加载失败.png")
                : url[0].url
            }
            preview={{
              visible: false,
            }}
            onClick={() => setVisible(true)}
          />
        </Sider>
        <Layout>
          <Content style={{ marginLeft: 50, minHeight: 400 }}>
            <Typography>
              <Title> {passageResource[0].title}</Title>
              <Tabs defaultActiveKey="1">
                <TabPane
                  key="1"
                  tab={
                    //  color: "#ed4259"
                    <span
                      style={{
                        fontSize: 18,
                        fontFamily: "FZZCYSK",
                      }}
                    >
                      文章内容
                    </span>
                  }
                >
                  <Paragraph>{passageResource[0].content}</Paragraph>
                </TabPane>
                <TabPane
                  key="2"
                  tab={
                    <span
                      style={{
                        fontSize: 18,
                        fontFamily: "FZZCYSK",
                      }}
                    >
                      资源下载
                    </span>
                  }
                >
                  <List
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    // locale={{ emptyText: "暂无下载链接" }}
                    dataSource={passageResource[1]}
                    // loading={passageResource[1].length === 0 ? true : false}
                    renderItem={(item) => (
                      <List.Item
                        actions={[
                          <Button
                            key="list-loadmore-more"
                            onClick={() => uploadResource(item)}
                          >
                            下载
                          </Button>,
                        ]}
                      >
                        {item.address}
                      </List.Item>
                    )}
                  />
                </TabPane>
              </Tabs>
            </Typography>
          </Content>
        </Layout>
      </Layout>
      <Divider orientation="left">评论</Divider>
      <div style={{ minHeight: 200, marginBottom: 50 }} className="send">
        <TextArea
          style={{ marginBottom: 13, fontSize: "1.3rem", color: "#515a6e" }}
          rows={5}
          ref={textEL}
          value={inputValue}
          onChange={getValue}
        />
        <Button
          type="primary"
          onClick={() => addComment(params.id)}
          style={{ borderRadius: "4px" }}
        >
          发送评论
        </Button>
      </div>
      <List
        className="comment-list"
        header={`共 ${passageResource[3].length} 条回复`}
        itemLayout="horizontal"
        dataSource={passageResource[3]}
        renderItem={(item) => (
          <li>
            <Comment
              author={item.username}
              content={item.content}
              datetime={item.time}
            />
          </li>
        )}
      />

      <div
        style={{
          display: "none",
        }}
      >
        <Image.PreviewGroup
          preview={{
            visible,
            onVisibleChange: (vis) => setVisible(vis),
          }}
        >
          {url &&
            url.map((item, index) => {
              return <Image src={item.url} key={index} />;
            })}
        </Image.PreviewGroup>
      </div>
    </div>
  );
};
export default PassageDetail;
