//统一管理项目用户相关的接口

import request from "@/utils/request";
import type { loginForm, loginResponseData,userResponseData } from "@/type/user-type";
enum API {
  LOGIN_URL = "/user/login",
  USERINFO_URL = "/user/get_users",
}

//登录接口方法
export const reqLogin = (data: loginForm) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data);
export const reqUserInfo = () => request.get<any,userResponseData>(API.USERINFO_URL);
