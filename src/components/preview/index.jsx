import React from "react";
import { Card } from "antd";
import "./index.css";

const Preview = () => {
  return (
    <Card style={{ height: 230 }} bordered={true} className="bgc">
      <h1
        style={{
          textAlign: "center",
          lineHeight: "170px",
          fontSize: 40,
          fontWeight: 700,
          marginBottom: 0,
          color: "#515a6e",
        }}
      >
        敬请期待
      </h1>
    </Card>
  );
};
export default Preview;
