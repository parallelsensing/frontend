//登录接口需要携带参数ts类型
export interface loginForm {
  phone: string;
  password: string;
}

export interface dataType {
  token?: string;
  message?:string;
}
//服务器返回的数据类型
export interface loginResponseData {  
    "code": number,
    "data": "string",
    "msg": "string"
}

interface userInfo {
  userId: number;
  avatar: string;
  username: string;
  password: string;
  desc: string;
  roles: string[];
  buttons: string[];
  routes: string[];
  token: string;
}

interface user {
  checkUser: userInfo;
}

//定义服务器返回用户信息相关的数据类型
export interface userResponseData {
  code: number;
  data: user;
}
