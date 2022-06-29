import { myAxios2 } from "../http";

export function apiCreateComment(data) {
  return myAxios2({
    url: "/comment/createComment?",
    method: "post",
    params: data,
  });
}
