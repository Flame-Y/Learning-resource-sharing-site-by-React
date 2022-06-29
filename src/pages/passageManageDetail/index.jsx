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
  Upload,
  Drawer,
  Space,
  Popconfirm,
  message,
  Breadcrumb,
} from "antd";
import { UploadOutlined, HomeOutlined, ReadFilled } from "@ant-design/icons";
import "./index.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  apiGetPassageResource,
  apiCreateComment,
  apiDownResource,
  apiUpdatePassage,
  apiUploadResource,
  apiUploadImg,
  apiRemoveImg,
  apiRemoveComment,
  apiRemovePassage,
  apiRemoveResource,
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
  const [drawerVisible, setDrawerVisible] = useState(false);
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
          getPassageResource(id);
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
        getPassageResource(id);
      });
  };
  const getValue = (e) => {
    setInputValue(e.target.value);
  };
  const textEL = useRef(null);
  const downloadResource = (user) => {
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
  const updatePassageTitle = (title) => {
    apiUpdatePassage({
      content: passageResource[0].content,
      passageID: id,
      title: title,
    })
      .then(function (response) {
        console.log(response);
        message.success("更新成功");
        getPassageResource(id);
      })
      .catch((error) => {
        console.log("请求失败", error.message);
        message.error("请求超时");
      });
  };
  const updatePassageContent = (content) => {
    apiUpdatePassage({
      content: content,
      passageID: id,
      title: passageResource[0].title,
    })
      .then(function (response) {
        console.log(response);
        message.success("更新成功");
        getPassageResource(id);
      })
      .catch((error) => {
        console.log("请求失败", error.message);
        message.error("请求超时");
      });
  };
  const removeComment = (comment) => {
    let data = new URLSearchParams();
    data.append("commentID", comment.commentID);
    apiRemoveComment(data)
      .then(function (response) {
        message.success("删除成功");
        getPassageResource(id);
      })
      .catch((error) => {
        console.log("请求失败", error.message);
      });
  };
  const removeResoruce = (resource) => {
    let data = new URLSearchParams();
    data.append("resourcesID", resource.id);
    apiRemoveResource(data)
      .then(function (response) {
        console.log(response);
        message.success("删除成功");
        getPassageResource(id);
      })
      .catch((error) => {
        console.log("请求失败", error.message);
        // removeComment(id);
      });
  };
  const uploadResource = (file) => {
    let data = new FormData();
    data.append("file", file);
    data.append("passageID", id);
    apiUploadResource(data)
      .then(function (response) {
        message.success("上传成功");
        getPassageResource(id);
      })
      .catch((error) => {
        console.log("请求失败", error);
        message.error("请求超时");
      });
    return false; //拦截组件默认的请求
  };
  const uploadImg = (file) => {
    let data = new FormData();
    data.append("file", file);
    data.append("passageID", id);
    apiUploadImg(data)
      .then(function (response) {
        // console.log(response);
        message.success("上传成功");
        getPassageResource(id);
      })
      .catch((error) => {
        console.log("请求失败", error);
        message.error("请求超时");
      });
    return false; //拦截组件默认的请求
  };
  const showDrawer = () => {
    setDrawerVisible(true);
  };
  const onClose = () => {
    setDrawerVisible(false);
  };
  const removeImg = (user) => {
    let data = new URLSearchParams();
    data.append("imgID", user.id);
    apiRemoveImg(data)
      .then(function (response) {
        message.success("删除成功");
        getPassageResource(id);
      })
      .catch((error) => {
        console.log("请求失败", error.message);
      });
  };
  const removePassage = () => {
    let data = new URLSearchParams();
    data.append("passageID", id);
    apiRemovePassage(data)
      .then(function (response) {
        message.success("删除成功");
        navigate("/passageManage");
        window.location.reload();
      })
      .catch((error) => {
        console.log("请求失败", error.message);
        message.error("请求超时");
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
          <Link to="/passageManage">
            <ReadFilled style={{ marginRight: 4 }} />
            <span>文章管理</span>
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
          <Button
            type="primary"
            block
            style={{ marginTop: 20 }}
            onClick={showDrawer}
          >
            图片管理
          </Button>
        </Sider>
        <Layout>
          <Content style={{ marginLeft: 50, minHeight: 400 }}>
            <Typography>
              <Title
                editable={{
                  onChange: (text) => {
                    updatePassageTitle(text);
                  },
                }}
                style={{ display: "inline-block" }}
              >
                {passageResource[0].title}
              </Title>
              <Popconfirm title="确认删除?" onConfirm={() => removePassage()}>
                <Button
                  style={{ float: "right", top: 5 }}
                  danger
                  type="primary"
                  size="large"
                >
                  删除文章
                </Button>
              </Popconfirm>

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
                  <Paragraph
                    editable={{
                      onChange: (text) => {
                        updatePassageContent(text);
                      },
                    }}
                  >
                    {passageResource[0].content}
                  </Paragraph>
                </TabPane>
                <TabPane
                  key="2"
                  tab={
                    <div>
                      <span
                        style={{
                          fontSize: 18,
                          fontFamily: "FZZCYSK",
                        }}
                      >
                        资源管理
                      </span>

                      <Upload
                        beforeUpload={(file) => {
                          uploadResource(file);
                        }}
                        showUploadList={false}
                      >
                        <Button
                          icon={<UploadOutlined style={{ marginRight: 0 }} />}
                          style={{ marginLeft: 10 }}
                        >
                          上传资源
                        </Button>
                      </Upload>
                    </div>
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
                        style={{ marginBottom: 10 }}
                        actions={[
                          <div>
                            <Button
                              onClick={() => downloadResource(item)}
                              style={{ marginRight: 10 }}
                            >
                              下载
                            </Button>
                            <Button
                              type="primary"
                              danger
                              onClick={() => removeResoruce(item)}
                            >
                              删除
                            </Button>
                          </div>,
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
              style={{ display: "inline-block" }}
            />
            <Button
              type="primary"
              danger
              style={{ float: "right", top: 30 }}
              onClick={() => removeComment(item)}
            >
              删除
            </Button>
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

        <Drawer
          title="图片管理"
          placement="right"
          width={700}
          onClose={onClose}
          visible={drawerVisible}
          extra={
            <Space>
              <Upload
                action={""}
                showUploadList={false}
                beforeUpload={(file) => {
                  uploadImg(file);
                }}
              >
                <Button
                  icon={<UploadOutlined style={{ marginRight: 0 }} />}
                  type="primary"
                  shape="round"
                  style={{ marginRight: 100 }}
                >
                  图片上传
                </Button>
              </Upload>
              <Button onClick={onClose}>取消</Button>
              <Button type="primary" onClick={onClose}>
                确认
              </Button>
            </Space>
          }
        >
          <p
            style={{
              color: "black",
              display: url[0].id === "" ? "block" : "none",
            }}
          >
            暂无图片
          </p>
          {url &&
            url.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{
                    marginBottom: 20,
                    display: item.id === "" ? "none" : "block",
                  }}
                >
                  <Image height={200} src={item.url} />
                  <Button
                    type="primary"
                    danger
                    onClick={() => removeImg(item)}
                    style={{ float: "right", top: 90 }}
                  >
                    删除
                  </Button>
                </div>
              );
            })}
        </Drawer>
      </div>
    </div>
  );
};
export default PassageDetail;
