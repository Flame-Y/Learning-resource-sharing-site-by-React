import myAxios from "../http";

export function apiLogin(data) {
  return myAxios({
    url: "/user/userLogin?",
    method: "post",
    data
  });
}
export function apiRegister(data) {
  return myAxios({
    url: "/user/register?",
    method: "post",
    data
  });
}
