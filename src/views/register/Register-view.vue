<template>
  <div class="login-container">
    <v-container>
      <v-card class="register-card-container">
        <v-card-title class="login-primary">
          <div class="login-title1">欢迎注册</div>
          <div class="login-title2">你的数字时空场景</div>
        </v-card-title>
        <v-card-text style="margin-top: 5%;">
          <v-form v-model="valid" @submit.prevent="register">

            <v-text-field v-model="registerForm.username" :rules="usernameRules" label="请输入用户名" bg-color="#ffffff"
              density="comfortable" width="90%" class="mx-auto">
              <template v-slot:prepend-inner>
                <v-icon>
                  <img src="/img/用户.png" alt="Account Icon" class="icon">
                </v-icon>
              </template>
            </v-text-field>

            <v-text-field v-model="registerForm.nickname" :rules="nameRules" label="请输入姓名" bg-color="#ffffff"
              density="comfortable" width="90%" class="mx-auto">
              <template v-slot:prepend-inner>
                <v-icon>
                  <img src="/img/姓名.png" alt="Account Icon" style="width: 25px; height: 25px;">
                </v-icon>
              </template>
            </v-text-field>

            <v-text-field v-model="registerForm.email" :rules="emailRules" label="请输入邮箱" bg-color="#ffffff"
              density="comfortable" width="90%" class="mx-auto">
              <template v-slot:prepend-inner>
                <v-icon>
                  <img src="/img/手机号.png" alt="Account Icon" class="icon">
                </v-icon>
              </template>
            </v-text-field>

            <div class="flex w-0.8" style="width: 90%; margin-left: 15px;">
              <v-text-field v-model="registerForm.code" label="请输入验证码" bg-color="#ffffff" density="comfortable"
                width="10%" class="mx-2">
                <template v-slot:prepend-inner>
                  <v-icon>
                    <img src="/img/手机号.png" alt="Account Icon" class="icon">
                  </v-icon>
                </template>
              </v-text-field>
              <v-btn :disabled="isDisabled" style="width: 30%;" height="45px" color="#920783" @click="getEmailCode">{{
                buttonText
              }}</v-btn>
            </div>

            <v-text-field v-model="registerForm.password" :rules="passwordRules" label="请输入密码" bg-color="#ffffff"
              density="comfortable" type="password" width="90%" class="mx-auto">
              <template v-slot:prepend-inner>
                <v-icon>
                  <img src="/img/密码.png" alt="Password Icon" class="icon">
                </v-icon>
              </template>
            </v-text-field>

            <!-- <v-text-field v-model="registerForm.confirmPassword" :rules="confirmPasswordRules" label="请再次输入确认密码"
              bg-color="#ffffff" density="comfortable" type="password" width="90%" class="mx-auto">
              <template v-slot:prepend-inner>
                <v-icon>
                  <img src="/img/密码.png" alt="Password Icon" class="icon">
                </v-icon>
              </template>
            </v-text-field> -->

            <div style="display: flex;">
              <v-btn class="register-btn" height="45px" color="#920783" @click="toLogin">返回登陆</v-btn>
              <v-btn :disabled="!valid" class="register-btn" height="45px" color="#920783" type="submit">立即注册</v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useUserStore } from '@/stores/users';
import { useRouter } from 'vue-router';
import { successAlert, errorAlert } from '@/utils/alert'

let valid = ref(false);
const isDisabled = ref(false);
const countdown = ref(60);
const buttonText = ref('获取验证码');

let emailCodeValid = ref(false);

let registerForm = reactive({
  username: '',
  code: '',
  nickname: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const usernameRules = [
  (v: string) => !!v || '用户名不能为空',
  (v: string) => /^[a-zA-Z0-9]+$/.test(v) || '用户名只能包含大小写字母和数字',
  (v: string) => v.length >= 3 || '用户名必须至少包含3个字符',
];

const nameRules = [
  (v: string) => !!v || '姓名不能为空',
  (v: string) => /^[\u4e00-\u9fa5a-zA-Z]+$/.test(v) || '姓名只能包含汉字或字母',
]

const emailRules = [
  (v: string) => !!v || '邮箱不能为空',
  (v: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v) || '邮箱格式不正确',
]

const passwordRules = [
  (v: string) => !!v || '密码不能为空',
  (v: string) => v.length >= 6 || '密码必须至少包含6个字符',
]

const confirmPasswordRules = [
  (v: string) => !!v || '确认密码不能为空',
  (v: string) => v === registerForm.password || '两次输入的密码不一致',
]

let useStore = useUserStore();
let router = useRouter();

/**
 * 判断邮箱格式是否合格
 * @param {string} email - 要验证的邮箱地址
 * @returns {boolean} - 如果邮箱格式合格返回 true，否则返回 false
 */
const isValidEmail = (email: string) => {
  // 正则表达式用于匹配邮箱格式
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}
let getEmailCode = async () => {

  console.log("email", registerForm.email);
  if (!isValidEmail(registerForm.email)) {
    errorAlert("邮箱格式不正确")
    return;
  }
  isDisabled.value = true;
  buttonText.value = `${countdown.value}秒后可重试`;

  const interval = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(interval);
      isDisabled.value = false;
      buttonText.value = '获取验证码';
      countdown.value = 60; // 重置倒计时
    } else {
      buttonText.value = `${countdown.value}秒后可重试`;
    }
  }, 1000);
  const res = await useStore.userGetCreateCode({ email: registerForm.email })

  console.log("res", res);

}
let toLogin = () => {
  router.push('/')
}
let register = async () => {
  if (valid.value) {
    try {
      const formData = {
        username: registerForm.username,
        nickname: registerForm.nickname,
        email: registerForm.email,
        password: registerForm.password,
        code: registerForm.code
      };
      const result = await useStore.userRegister(formData)
      if (result === 'ok') {
        successAlert(`HI, 注册成功,请登录！`)
        router.push('/')
      }
    } catch (error: any) {
      errorAlert(error.msg)
    }
  } else {
    errorAlert('表单填写不完整或有误，请检查后再试')
  }
}

</script>