<template>
  <div class="login-container">
    <v-container>
      <v-card class="login-card-container">
        <v-card-title class="login-primary">
          <div class="login-title1">欢迎登录</div>
          <div class="login-title2">你的数字时空场景</div>
        </v-card-title>
        <v-card-text style="margin-top: 5%;">
          <v-form @submit.prevent="handleLogin">
            <v-text-field v-model="loginForm.email" label="请输入邮箱" bg-color="#ffffff" density="comfortable">
              <template v-slot:prepend-inner>
                <v-icon>
                  <img src="/img/用户.png" alt="Account Icon" class="login-icon">
                </v-icon>
              </template>
            </v-text-field>
            <v-text-field v-model="loginForm.password" label="请输入密码" bg-color="#ffffff" density="comfortable"
              type="password">
              <template v-slot:prepend-inner>
                <v-icon>
                  <img src="/img/密码.png" alt="Password Icon" class="login-icon">
                </v-icon>
              </template>
            </v-text-field>
            <v-btn class="login-btn" height="45px" color="#920783" type="submit">立即登录</v-btn>
            <v-row>
              <v-col class="d-flex justify-end">
                <v-btn variant="text" class="forgetpassword-btn justify-start" color="#920783"
                  @click="navigateToForgetPassword">
                  忘记密码?
                </v-btn>
                <v-btn variant="text" class="toregister-btn" color="#920783" @click="navigateToRegister">
                  没有账号?立即注册>>
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useUserStore } from '@/stores/users';
import { useRouter } from 'vue-router';
import { getTime } from '@/utils/time';
import { successAlert, errorAlert } from '@/utils/alert';

const loginForm = reactive({ email: '', password: '' });
const userStore = useUserStore();
const router = useRouter();

const handleLogin = async () => {
  try {
    const result = await userStore.userLogin(loginForm);
    if (result === 'ok') {
      successAlert(`HI,${getTime()}好`);
      router.push('/map');
    }
  } catch (error: any) {
    errorAlert(error.msg);
  }
};

const navigateToRegister = () => {
  router.push('/register');
};
const navigateToForgetPassword = () => {
  router.push('/forgetpasswordcheck');
};
</script>