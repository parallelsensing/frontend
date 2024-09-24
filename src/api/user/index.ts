//统一管理项目用户相关的接口

import request from '@/utils/request';
import type { loginForm, loginResponseData, userResponseData } from '@/type/user-type';
enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/users/me',
  REGISTER_URL = '/user/create',
  RESETPASSWORD_URL = '/user/reset_password',
  USERGETCREATECODE_URL = '/user/get_create_code',
  FORGETPASSWORD_URL = '/user/forgot_password'
}

//登录接口方法
export const reqLogin = (data: loginForm) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data);
export const reqUserInfo = () => request.get<any, userResponseData>(API.USERINFO_URL);

//注册接口方法
export const reqRegister = (data: loginForm) => request.post<any, any>(API.REGISTER_URL, data);

//重置密码接口方法
export const resetPassword = (data: any) => request.post<any, any>(API.RESETPASSWORD_URL, data);

//获取邮箱验证码
export const userGetCreateCode = (data: string) =>
  request.post<any, any>(API.USERGETCREATECODE_URL, data);
//获取邮箱验证码
export const forgetPassword = (data: string) =>
  request.post<any, any>(API.FORGETPASSWORD_URL, data);
