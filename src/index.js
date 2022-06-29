import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { ConfigProvider } from "antd";
import cn from "antd/es/locale/zh_CN";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ConfigProvider locale={cn}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ConfigProvider>
);
reportWebVitals();
