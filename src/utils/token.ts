//封装本地存储数据与获取数据的方法
//存储数据
export const SET_TOKEN = (token: string) => {
  localStorage.setItem("TOKEN", token);
};
//获取数据
export const GET_TOKEN = () => {
  return localStorage.getItem("TOKEN");
};
