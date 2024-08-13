import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import type { loginForm, loginResponseData } from '@/type/user-type';
import { reqLogin, reqRegister } from '@/api/user';

const useUserStore = defineStore({
  id: 'User',
  // 存储数据
  state: () => {
    return {
      token: useStorage('token', ''),
      username: useStorage('username', ''),
      nickname: useStorage('nickname', '')
    };
  },
  actions: {
    async userLogin(data: loginForm) {
      const result: loginResponseData = await reqLogin(data);
      if (result.code == 200) {
        this.token = result.token;
        this.username = result.data.username;
        this.nickname = result.data.nickname;
        return 'ok';
      } else {
        this.token = '';
        return Promise.reject(result);
      }
    },
    async userRegister(data: any) {
      const result: any = await reqRegister(data);
      console.log(result);
    }
  },
  getters: {}
});

export default useUserStore;