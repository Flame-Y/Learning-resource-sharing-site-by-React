import React from "react";
import { Divider, Row, Col, Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import Displaypanel from "../../components/displayPanel";
import NoticeBoard from "../../components/noticeBoard";
import Preview from "../../components/preview";
import CommentBoard from "../../components/commentBoard";

const homepage = () => {
  return (
    <div>
      <Breadcrumb style={{ margin: "30px 50px 10px 50px", paddingTop: 50 }}>
        <Breadcrumb.Item>
          <HomeOutlined />
          <span>主页</span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Displaypanel />
      <Divider />

      <div style={{ margin: 50 }}>
        <Row gutter={16}>
          <Col className="gutter-row" span={18}>
            <Preview />
          </Col>
          <Col className="gutter-row" span={6}>
            <NoticeBoard />
          </Col>
        </Row>
      </div>
      <Divider />
      <CommentBoard />
    </div>
  );
};

export default homepage;
