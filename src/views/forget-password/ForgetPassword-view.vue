<template>
  <div class="login-container">
    <v-container>
      <v-card class="forgetpassword-card-container">
        <v-card-title class="login-primary">
          <div class="login-title1">重置密码</div>
          <div class="login-title2">你的数字时空场景</div>
        </v-card-title>
        <v-card-text style="margin-top: 5%;">
          <v-form v-model="valid" @submit.prevent="resetPassword">



            <v-text-field v-model="resetForm.email" :rules="emailRules" label="请输入邮箱" bg-color="#ffffff"
              density="comfortable" width="90%" class="mx-auto">
              <template v-slot:prepend-inner>
                <v-icon>
                  <img src="/img/手机号.png" alt="Account Icon" class="icon">
                </v-icon>
              </template>
            </v-text-field>

            <div class="flex w-0.8" style="width: 90%; margin-left: 15px;">
              <v-text-field v-model="resetForm.code" label="请输入验证码" bg-color="#ffffff" density="comfortable" width="10%"
                class="mx-2">
                <template v-slot:prepend-inner>
                  <v-icon>
                    <img src="/img/手机号.png" alt="Account Icon" class="icon">
                  </v-icon>
                </template>
              </v-text-field>
              <v-btn :disabled="isDisabled" style="width: 30%;" height="45px" color="#920783" @click="getEmailCode">{{
                buttonText }}</v-btn>
            </div>

            <v-text-field v-model="resetForm.new_password" :rules="passwordRules" label="请输入新密码" bg-color="#ffffff"
              density="comfortable" type="password" width="90%" class="mx-auto">
              <template v-slot:prepend-inner>
                <v-icon>
                  <img src="/img/密码.png" alt="Password Icon" class="icon">
                </v-icon>
              </template>
            </v-text-field>

            <div style="display: flex;">
              <v-btn class="register-btn" height="45px" color="#920783" @click="toLogin">返回登陆</v-btn>
              <v-btn :disabled="!valid" class="register-btn" height="45px" color="#920783" type="submit">重置密码</v-btn>
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

let resetForm = reactive({
  code: '',
  email: '',
  new_password: '',
})


const emailRules = [
  (v: string) => !!v || '邮箱不能为空',
  (v: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v) || '邮箱格式不正确',
]

const passwordRules = [
  (v: string) => !!v || '密码不能为空',
  (v: string) => v.length >= 6 || '密码必须至少包含6个字符',
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
const toLogin = () => {
  router.push('/')
}
let getEmailCode = async () => {

  console.log("email", resetForm.email);
  if (!isValidEmail(resetForm.email)) {
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
  const res = await useStore.forgetPasswordGetCreateCode({ email: resetForm.email })
  if (res.code == 200) {
    successAlert("验证码发送成功，请登陆邮箱查看")
  } else if (res.code == 400 && res.msg == 'captcha have been sent') {
    errorAlert("验证码已发送，请一分钟后重试")
  }
  console.log("res", res);

}
let resetPassword = async () => {
  if (valid.value) {
    try {
      const formData = {
        email: resetForm.email,
        new_password: resetForm.new_password,
        code: resetForm.code
      };
      const result = await useStore.resetPassword(formData)
      if (result === 'ok') {
        successAlert(`HI, 重置密码成功,请登录！`)
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