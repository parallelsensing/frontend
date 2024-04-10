import { defineStore } from 'pinia';
import type { loginForm, loginResponseData } from '@/type/user-type';
import { reqLogin } from '@/api/user';
//引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN } from '@/units/token';

//创建用户仓库
const useUserStore = defineStore({
  id: 'User',
  //存储数据
  state: () => {
    return {
      token: GET_TOKEN()
    };
  },
  actions: {
    // async userLogin(data: loginForm) {
    //   const result: loginResponseData = await reqLogin(data);
    //   if (result.code == 200) {
    //     this.token = result.data.token as string;
    //     SET_TOKEN(result.data.token as string);
    //     return "ok";
    //   } else {
    //     return Promise.reject(new Error(result.data.message));
    //   }
    // },
    async userLogin(data: loginForm) {
      const result: loginResponseData = await reqLogin(data);
      if (result.code == 200) {
        // console.log('ok',result);
        this.token = result.msg as string;
        SET_TOKEN(result.msg as string);
        return 'ok';
      } else {
        return Promise.reject(result);
      }
    }
    // response: ({ body }) => {
    //   //获取请求体携带过来的用户名与密码
    //   const { username, password } = body
    //   //调用获取用户信息函数,用于判断是否有此用户
    //   const checkUser = createUserList().find(
    //     (item) => item.username === username && item.password === password,
    //   )
    //   //没有用户返回失败信息
    //   if (!checkUser) {
    //     return { code: 201, data: { message: '账号或者密码不正确' } }
    //   }
    //   //如果有返回成功信息
    //   const { token } = checkUser
    //   return { code: 200, data: { token } }
    // },
  },
  getters: {}
});

export default useUserStore;
