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

            <v-text-field v-model="resetForm.new_password" :rules="passwordRules" label="请输入新密码" bg-color="#ffffff"
              density="comfortable" type="password" width="90%" class="mx-auto">
              <template v-slot:prepend-inner>
                <v-icon>
                  <img src="/img/密码.png" alt="Password Icon" class="icon">
                </v-icon>
              </template>
            </v-text-field>

            <v-text-field v-model="resetForm.confirmPassword" :rules="confirmPasswordRules" label="请再次输入确认密码"
              bg-color="#ffffff" density="comfortable" type="password" width="90%" class="mx-auto">
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
import { onMounted, reactive, ref } from 'vue'
import { useUserStore } from '@/stores/users';
import { useRouter } from 'vue-router';
import { successAlert, errorAlert } from '@/utils/alert'
import { useRoute } from 'vue-router';

const route = useRoute();




let valid = ref(false);

const isDisabled = ref(false);
const countdown = ref(60);
const buttonText = ref('获取验证码');

let resetForm = reactive({
  code: '',
  email: '',
  new_password: '',
  confirmPassword: '',
})


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
  (v: string) => v === resetForm.new_password || '两次输入的密码不一致',
]


let useStore = useUserStore();
let router = useRouter();


const toLogin = () => {
  router.push('/')
}

let resetPassword = async () => {
  const tokenStartIndex = route.fullPath.indexOf('token=');
  let tokenValue: any = null;
  if (tokenStartIndex !== -1) {
    tokenValue = route.fullPath.substring(tokenStartIndex + 6); // 6 是 "token=".length
  }
  if (valid.value) {
    try {
      const formData = {
        email: resetForm.email,
        new_password: resetForm.new_password,
        token: tokenValue
      };
      console.log(formData)
      const result = await useStore.resetPassword(formData)
      if (result === 'ok') {
        successAlert(`HI, 重置密码成功,请登录！`)
        router.push('/')
      }
    } catch (error: any) {
      errorAlert(error.msg)
      router.push('/forgetpasswordcheck')
    }
  } else {
    errorAlert('表单填写不完整或有误，请检查后再试')
  }
}

</script>