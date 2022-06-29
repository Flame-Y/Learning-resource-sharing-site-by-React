import React, { useRef } from "react";
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./index.css";

const contentStyle = {
  height: "400px",
  lineHeight: "400px",
  textAlign: "center",
  background: "#364d79",
};

const DisplayPanel = () => {
  const carouselEL = useRef(null);
  return (
    <div>
      <button
        className="leftButton"
        style={{ left: 55 }}
        onClick={() => {
          carouselEL.current.prev();
        }}
      >
        <LeftOutlined />
      </button>
      <button
        className="rightButton"
        style={{ right: 55 }}
        onClick={() => {
          carouselEL.current.next();
        }}
      >
        <RightOutlined />
      </button>
      <Carousel
        autoplay
        // arrows={true}
        style={{
          margin: "0 50px 0 50px",
          cursor: "pointer",
        }}
        ref={carouselEL}
      >
        <div>
          <h3 style={contentStyle}>
            <div className="img">
              <a href="https://space.bilibili.com/672346917">
                <img src={require("../../images/向晚.png")} alt="" />
              </a>
            </div>
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <div className="img">
              <a href="https://space.bilibili.com/672346917">
                <img src={require("../../images/贝拉.png")} alt="" />
              </a>
            </div>
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <div className="img">
              <img src={require("../../images/珈乐.png")} alt="" />
            </div>
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <div className="img">
              <a href="https://space.bilibili.com/672346917">
                <img src={require("../../images/嘉然.png")} alt="" />
              </a>
            </div>
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <div className="img">
              <a href="https://space.bilibili.com/672346917">
                <img src={require("../../images/乃琳.png")} alt="" />
              </a>
            </div>
          </h3>
        </div>
      </Carousel>
    </div>
  );
};
export default DisplayPanel;
