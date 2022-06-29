import myAxios from "../http";
import { myAxios2 } from "../http";
import { message } from "antd";

export function apiGetComment(data) {
  return myAxios({
    url: "/hallComment/queryAllHallComment?",
    method: "post",
    data,
  });
}
export function apiAddComment(value) {
  return myAxios2({
    url: "/hallComment/createHallComment?",
    method: "post",
    params: {
      content: value,
    },
    transformRequest: [
      function (data, headers) {
        if (value === "") {
          message.error("发送内容不能为空");
          return;
        }
        headers.token = window.sessionStorage.getItem("token");
        return { data, headers };
      },
    ],
  });
}

export function apiRemoveComment(data) {
  return myAxios2({
    url: "/admin/deleteHallComment?",
    method: "post",
    data,
  });
}
