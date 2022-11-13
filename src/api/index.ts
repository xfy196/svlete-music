import request from "../utils/request";
// 获取banner图
export const getBanner = (): any => {
  return request.get("/api/banner");
};
// 获取列表图
export const getPersonalized = (): any => {
  return request.get("/api/personalized");
};
