import React, { useState, useEffect, useRef } from "react";
import { Card, List, Input, Button, message } from "antd";
import { apiGetComment, apiAddComment } from "../../request/api/hall";

import "./index.css";

let listTotal = 0;
let listFooter = "";
const { TextArea } = Input;
const CommentBoard = () => {
  let ban = true;
  if (window.sessionStorage.getItem("token")) {
    ban = false;
  } else {
    ban = true;
  }
  const pageSize = 10;
  const [pageNo, setPageNo] = useState(1);
  const [inputValue, setInputValue] = useState();
  const [commentData, setCommentData] = useState([]);

  useEffect(() => {
    const getComment = () => {
      let data = new URLSearchParams();
      data.append("pageNo", pageNo);
      data.append("pageSize", pageSize);
      apiGetComment(data)
        .then(function (response) {
          setCommentData(response.data[0]);
          listFooter = response.data[2];
          var numArr = listFooter.match(/\d+/g);
          listTotal = numArr[0] - 0;
        })
        .catch((error) => {
          console.log("请求失败", error.message);
          // getComment();
        });
    };
    getComment();
  }, [pageNo]);
  const getValue = (e) => {
    setInputValue(e.target.value);
  };
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
  const addComment = () => {
    // console.log(inputValue);
    if (inputValue === "" || inputValue === undefined) {
      message.error("发送内容不能为空");
      return;
    }
    apiAddComment(inputValue)
      .then(function (response) {
        console.log(response);
        if (response.data === "insertSuccessfully!") {
          message.success("发送成功");
          setInputValue();
          getComment();
        }
      })
      .catch((error) => {
        console.log("请求失败", error.message);
        // addComment();
      });
  };
  const textEL = useRef(null);
  const changeSize = (current, size) => {
    setPageNo(current);
  };
  return (
    <div>
      <Card hoverable={true} style={{ margin: 50 }}>
        <div style={{ minHeight: 200 }} className="send">
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
            rows={5}
            ref={textEL}
            value={inputValue}
            onChange={getValue}
            disabled={ban}
          />
          <Button
            type="primary"
            danger
            onClick={addComment}
            style={{ borderRadius: "4px", display: ban ? "none" : "block" }}
          >
            发射犇犇！
          </Button>
        </div>
      </Card>
      <Card
        style={{ margin: 50 }}
        bodyStyle={{ padding: 0 }}
        bordered={false}
        hoverable={true}
      >
        <List
          style={{ padding: 0 }}
          size="large"
          header={
            <h2
              style={{
                fontSize: 40,
                fontWeight: 700,
                marginBottom: 0,
                color: "#515a6e",
                textAlign: "center",
              }}
            >
              留 言 板
            </h2>
          }
          bordered
          loading={commentData.length === 0 ? true : false}
          pagination={{
            position: "bottom",
            total: listTotal * 10,
            style: { textAlign: "center" },
            showQuickJumper: true,
            showSizeChanger: false,
            onChange: changeSize,
          }}
          dataSource={commentData}
          renderItem={(item) => <List.Item>{item.content}</List.Item>}
        />
      </Card>
    </div>
  );
};
export default CommentBoard;
