//统一管理项目用户相关的接口

import request from "../../units/request";
import type { loginForm, loginResponseData,userResponseData } from "../../type/userType";
enum API {
  // LOGIN_URL = "/user/login",
  LOGIN_URL = "",
  USERINFO_URL = "/user/info",
}

//登录接口方法
export const reqLogin = (data: loginForm) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data);
export const reqUserInfo = () => request.get<any,userResponseData>(API.USERINFO_URL);
