<template>
  <div class="login-container">
    <v-container>
      <v-card class="forgetpassword-card-container" style="height: 300px; top:25vh">
        <v-card-title class="login-primary">
          <div class="login-title1">邮箱验证</div>
          <div class="login-title2">你的数字时空场景</div>
        </v-card-title>
        <v-card-text style="margin-top: 5%;">
          <v-form @submit.prevent="tokenCheck">
            <v-text-field v-model="checkForm.email" :rules="emailRules" label="请输入邮箱" bg-color="#ffffff"
              density="comfortable" width="90%" class="mx-auto">
              <template v-slot:prepend-inner>
                <v-icon>
                  <img src="/img/手机号.png" alt="Account Icon" class="icon">
                </v-icon>
              </template>
            </v-text-field>

            <div style="display: flex;">
              <v-btn class="register-btn" height="45px" color="#920783" @click="toLogin">返回登陆</v-btn>
              <v-btn class="register-btn" height="45px" :disabled="isDisabled" color="#920783" type="submit">{{
                buttonText
              }}</v-btn>
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


const isDisabled = ref(false);
const countdown = ref(60);
const buttonText = ref('点击验证');

let checkForm = reactive({
  code: '',
  email: '',
  new_password: '',
  confirmPassword: '',
})


const emailRules = [
  (v: string) => !!v || '邮箱不能为空',
  (v: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v) || '邮箱格式不正确',
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

let tokenCheck = async () => {
  if (!isValidEmail(checkForm.email)) {
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
  try {
    const formData = {
      email: checkForm.email,
    };
    const result = await useStore.forgetPasswordGetToken(formData)
    console.log("res", result);
    if (result.code == 200) {
      successAlert("验证邮件已经发送请前往邮箱进行查看...")
    }
  } catch (error: any) {
    errorAlert(error.msg)
  }

}

</script>