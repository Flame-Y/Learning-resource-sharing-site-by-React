import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import React from "react";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="文章不存在"
      style={{ margin: 50 }}
      extra={
        <Button
          type="primary"
          onClick={() => {
            navigate("/passage");
          }}
        >
          回到文章页面
        </Button>
      }
    />
  );
};

export default NotFound;
