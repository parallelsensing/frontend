<template>
  <div class="login-container">
    <v-container>
      <v-card class="card-container">
        <v-card-title class="primary">
          <div class="title1">欢迎登录</div>
          <div class="title2">你的数字时空场景</div>
        </v-card-title>
        <v-card-text style="margin-top: 5%;">
          <v-form @submit.prevent="handleLogin">
            <v-text-field v-model="loginForm.phone" label="请输入用户名" bg-color="#ffffff" density="comfortable" >
              <template v-slot:prepend-inner>
                <v-icon>
                  <img src="/img/用户.png" alt="Account Icon" style="width: 24px; height: 24px;">
                </v-icon>
              </template>
            </v-text-field>
            <v-text-field v-model="loginForm.password" label="请输入密码"  bg-color="#ffffff" density="comfortable" type="password">
              <template v-slot:prepend-inner>
                <v-icon>
                  <img src="/img/密码.png" alt="Password Icon" style="width: 24px; height: 24px;">
                </v-icon>
              </template>
            </v-text-field>
            <v-btn class="login-btn" height="45px" color="#920783" type="submit">立即登录</v-btn>
            <v-row>
              <v-col class="d-flex justify-end">
                <v-btn variant="text" class="register-btn" color="#920783" @click="navigateToRegister">
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
import { computed, onMounted, onBeforeUnmount, reactive, ref } from 'vue';
import { useUserStore } from '@/stores/users';
import { useRouter } from 'vue-router';
import { getTime } from '@/utils/time';
import { successAlert, errorAlert } from '@/utils/alert';

const loginForm = reactive({ phone: '15801585812', password: '123456' });

const userStore = useUserStore();
const router = useRouter();

const handleLogin = async () => {
  try {
    await userStore.userLogin(loginForm);
    router.push('/map');
    successAlert(`HI,${getTime()}好`);
  } catch (error: any) {
    console.error(error);
    errorAlert(error.msg);
  }
};

const navigateToRegister = () => {
  router.push('/register');
};

</script>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100vh;
  background: url('/img/登录背景.png') no-repeat;
  background-size: 90% 90%;
}

.primary {
  text-align: start;
  background-color: #920783;
}

.card-container {
  width: 360px;
  height: 400px;
  margin-top: 22vh;
  border-radius: 10px;
  float: right;
  background-color: #f9f3fd;
  box-shadow: 0px 5px 5px 5px rgba(0, 0, 0, 0.15);

}

@media (min-width: 1400px) {
  .card-container {
    margin-right: 10vw;
  }
}

@media (max-width: 1399px) {
  .card-container {
    margin-right: 3vw;
  }
}

.title1 {
  padding: 5% 3% 0 5%;
  color: #ffffff;
  font-size: 32px;
  font-weight: 550;
  font-family: '黑体', sans-serif;
}

.title2 {
  padding: 0 0 0 5%;
  color: #ffffff;
  font-size: 22px;
  font-weight: 550;
  font-family: '黑体', sans-serif;
}

.login-btn {
  width: 100%;
  font-family: '黑体';
  margin-top: 5%;
  font-size: 22px;
  font-weight: 550;
  display: block;
  margin: 0 auto;
}

.register-btn {
  width: 50%;
  font-family: '黑体';
  font-size: 14px;
  font-weight: 600;
  
}
</style>
