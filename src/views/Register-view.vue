<template>
  <div class="register_container">
    <v-container>

      <v-card :class="backgroundClass">
        <v-card-title class="primary">
          <div class="title1">欢迎注册</div>
          <div class="title2">中国科学院自动化研究所</div>
        </v-card-title>
        <v-card-text style="margin-top: 5%;">
          <v-form @submit.prevent="register">

            <v-text-field v-model="registerForm.username" label="请输入用户名">
              <template v-slot:prepend-inner>
                <v-icon>
                  <img src="/img/用户.png" alt="Account Icon" style="width: 24px; height: 24px;">
                </v-icon>
              </template>
            </v-text-field>

            <v-text-field v-model="registerForm.first_name_last_name" label="请输入姓名">
              <template v-slot:prepend-inner>
                <v-icon>
                  <img src="/img/姓名.png" alt="Account Icon" style="width: 25px; height: 25px;">
                </v-icon>
              </template>
            </v-text-field>

            <v-text-field v-model="registerForm.phone" label="请输入手机号">
              <template v-slot:prepend-inner>
                <v-icon>
                  <img src="/img/手机号.png" alt="Account Icon" style="width: 24px; height: 24px;">
                </v-icon>
              </template>
            </v-text-field>

            <v-text-field v-model="registerForm.password" label="请输入密码" type="password">
              <template v-slot:prepend-inner>
                <v-icon>
                  <img src="/img/密码.png" alt="Password Icon" style="width: 24px; height: 24px;">
                </v-icon>
              </template>
            </v-text-field>

            <v-text-field v-model="registerForm.password" label="请再次输入确认密码" type="password">
              <template v-slot:prepend-inner>
                <v-icon>
                  <img src="/img/密码.png" alt="Password Icon" style="width: 24px; height: 24px;">
                </v-icon>
              </template>
            </v-text-field>
            <v-btn class="register-btn" height="45px" color="#920783" type="submit">立即注册</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { useUserStore } from '@/stores/users';
import { useRouter } from 'vue-router';
import { successAlert, errorAlert } from '@/utils/alert'
// let registerForm = reactive({ phone: '15801585812', password: '123456' })
let registerForm = reactive({
  username: '',
  first_name_last_name: '',
  phone: '',
  password: ''
})

let useStore = useUserStore();
let router = useRouter();

let windowWidth = ref(window.innerWidth);
let windowHeight = ref(window.innerHeight);

const handleResize = () => {
  windowWidth.value = window.innerWidth
  windowHeight.value = window.innerHeight
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

let register = async () => {
  // try {
  //   await useStore.userLogin(registerForm)
  router.push('/')
  successAlert(`HI,请登录`)
  // } catch (error: any) {
  //   console.log(error);
  //   errorAlert(error.msg)
  // }
}

const backgroundClass = computed(() => {
  return windowWidth.value > 1400 ? 'large-screen' : 'small-screen'
})

</script>
<style scoped lang="scss">
.register_container {
  width: 100%;
  height: 100vh;
  background: url('/img/登录背景.png') no-repeat;
  background-size: 90% 90%;
}

.primary {
  text-align: start;
  background-color: #920783;
}

.small-screen {
  width: 450px;
  height: 600px;
  margin-top: 3vh;
  border-radius: 10px;
  float: right;
  margin-right: 2vw;
  /* 或你希望的具体值 */
  background-color: #f0eaf041;
}

.large-screen {
  width: 450px;
  height: 600px;
  margin-top: 14vh;
  border-radius: 10px;
  float: right;
  margin-right: 9vw;
  /* 或你希望的具体值 */
  background-color: #f0eaf041;
}

.title1 {
  padding: 3% 3% 0 5%;
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

.register-btn {
  width: 100%;
  font-family: '黑体';
  font-size: 22px;
  font-weight: 550;
}
</style>