import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import type { loginForm, loginResponseData } from '@/type/user-type';
import { reqLogin } from '@/api/user';

const useUserStore = defineStore({
  id: 'User',
  // 存储数据
  state: () => {
    return {
      token: useStorage('token', ''),
      username: useStorage('username', '')
    };
  },
  actions: {
    async userLogin(data: loginForm) {
      const result: loginResponseData = await reqLogin(data);
      if (result.code == 200) {
        this.token = result.token;
        this.username = result.data.username;

        console.log(result.data.username);
        console.log(result);
        return 'ok';
      } else {
        this.token = '';
        return Promise.reject(result);
      }
    },
    userLogout() {
      this.token = '';
      this.username = '';
    }
  },
  getters: {}
});

export default useUserStore;