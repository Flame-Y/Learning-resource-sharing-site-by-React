import { myAxios2 } from "../http";

export function apiGetPassage(data) {
  return myAxios2({
    url: "/passage/queryAllPassage?",
    method: "get",
    params: data,
  });
}

export function apiGetPassageResource(data) {
  return myAxios2({
    url: "/passage/passageResources?",
    method: "get",
    params: data,
  });
}

export function apiCreatePassage(data) {
  return myAxios2({
    url: "/admin/createPassage?",
    method: "post",
    params: data,
  });
}

export function apiCreateComment(data) {
  return myAxios2({
    url: "/comment/createComment?",
    method: "post",
    params: data,
  });
}

export function apiUpdatePassage(data) {
  return myAxios2({
    url: "/admin/updatePassage?",
    method: "post",
    params: data,
  });
}
export function apiDownResource(data) {
  return myAxios2({
    url: "/passage/downResources?",
    method: "post",
    data,
    responseType: "blob",
  });
}

export function apiRemoveComment(data) {
  return myAxios2({
    url: "/admin/deleteComment?",
    method: "post",
    data,
  });
}

export function apiRemovePassage(data) {
  return myAxios2({
    url: "/admin/deletePassage?",
    method: "post",
    data,
  });
}
export function apiRemoveResource(data) {
  return myAxios2({
    url: "/admin/deleteResources?",
    method: "post",
    data,
  });
}

export function apiRemoveImg(data) {
  return myAxios2({
    url: "/admin/deleteImg?",
    method: "post",
    data,
  });
}
export function apiUploadResource(data) {
  return myAxios2({
    url: "/admin/uploadResources?",
    method: "post",
    data,
  });
}
export function apiUploadImg(data) {
  return myAxios2({
    url: "/admin/uploadImg?",
    method: "post",
    data,
  });
}
