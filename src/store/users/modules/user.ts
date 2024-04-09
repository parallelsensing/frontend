import { defineStore } from "pinia";
import type { loginForm, loginResponseData } from "@/type/user-type";
import { reqLogin } from "@/api/user";
//引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN } from "@/units/token";

//创建用户仓库
const useUserStore = defineStore({
  id: "User",
  //存储数据
  state: () => {
    return {
      token: GET_TOKEN(),
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
      console.log('ok',result);
        return "ok";
      } else {
        // return Promise.reject(new Error(result.data.message));
        console.log('不OK');
        
      }
    },
  },
  getters: {},
});

export default useUserStore;
