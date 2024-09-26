//统一管理项目用户相关的接口

import request from '@/utils/request';
import type { loginForm, loginResponseData, userResponseData } from '@/type/user-type';
enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/users/me',
  REGISTER_URL = '/user/create',
  RESET_PASSWORD_URL = '/user/reset_password',
  USER_GET_CREATE_CODE_URL = '/user/get_create_code',
  FORGET_PASSWORD_GET_TOKEN = '/user/forgot_password_link',
  FORGET_PASSWORD_USE_TOKEN = '/user/checktoken',
  FORGET_PASSWORD_URL = '/user/forgot_password'
}

//登录接口方法
export const reqLogin = (data: loginForm) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data);
export const reqUserInfo = () => request.get<any, userResponseData>(API.USERINFO_URL);

//注册接口方法
export const reqRegister = (data: loginForm) => request.post<any, any>(API.REGISTER_URL, data);

//重置密码接口方法
export const resetPassword = (data: any) => request.post<any, any>(API.RESET_PASSWORD_URL, data);

//获取邮箱验证码
export const userGetCreateCode = (data: string) =>
  request.post<any, any>(API.USER_GET_CREATE_CODE_URL, data);
//获取邮箱验证码
export const forgetPassword = (data: string) =>
  request.post<any, any>(API.FORGET_PASSWORD_URL, data);
//获取邮箱验证token
export const forgetPasswordGetToken = (data: string) =>
  request.post<any, any>(API.FORGET_PASSWORD_GET_TOKEN, data);
//用token进行验证
export const forgetPasswordUseToken = (data: any) => {
  return request.get<any, any>(API.FORGET_PASSWORD_USE_TOKEN + '/' + data);
  // console.log(API.FORGET_PASSWORD_USE_TOKEN + '/' + data);
};
