import React, { useState, useEffect } from "react";
import { Card, List } from "antd";
import { apiGetNotice } from "../../request/api/notice.js";

const NoticeBoard = () => {
  const [noticeData, setNoticeData] = useState([]);
  useEffect(() => {
    const getNotice = () => {
      apiGetNotice()
        .then(function (response) {
          setNoticeData(response.data);
        })
        .catch((error) => {
          console.log("请求失败", error.message);
          getNotice();
        });
    };
    getNotice();
  }, []);
  return (
    <Card bodyStyle={{ padding: 0 }} bordered={false} hoverable={true}>
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
  );
};

export default NoticeBoard;
