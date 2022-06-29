import { Layout } from "antd";
import "./App.css";
import Navigation from "./components/navigationbar";
import Homepage from "./pages/homepage";
import Passage from "./pages/passage";
import PassageDetail from "./pages/passageDetail";
import Login from "./pages/login";
import Register from "./pages/register";
import NoticeManage from "./pages/noticeManage";
import CommentManage from "./pages/commentManage";
import PassageManage from "./pages/passageManage";
import PassageManageDetail from "./pages/passageManageDetail";
import UserManage from "./pages/userManage";
import NotFound from "./pages/notFound";
import { Route, Routes, Navigate } from "react-router-dom";
import React from "react";

const { Content, Footer } = Layout;

const App = () => {
  let identity = "vistor";
  if (window.sessionStorage.getItem("userID") === "1") {
    identity = "admin";
  } else if (window.sessionStorage.getItem("userID") > 1) {
    identity = "user";
  } else {
    identity = "vistor";
  }

  return (
    <Layout className="layout">
      <Navigation />
      <Content>
        <Routes>
          <Route path="*" element={<Navigate to="/homepage" />}></Route>
          {/*重定向 */}
          <Route path="homepage" element={<Homepage />} />
          {(identity === "user" || identity === "admin") && (
            <Route path="passage" element={<Passage />}>
              <Route path=":id" element={<PassageDetail />} />
            </Route>
          )}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          {identity === "admin" && (
            <Route path="noticeManage" element={<NoticeManage />} />
          )}
          {identity === "admin" && (
            <Route path="commentManage" element={<CommentManage />} />
          )}
          {identity === "admin" && (
            <Route path="passageManage" element={<PassageManage />}>
              <Route path=":id" element={<PassageManageDetail />} />
            </Route>
          )}
          {identity === "admin" && (
            <Route path="userManage" element={<UserManage />} />
          )}
          <Route path="notFound" element={<NotFound />} />
        </Routes>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Resource Sharing Website (React) ©2022 Created by FlameY
      </Footer>
    </Layout>
  );
};
export default App;
