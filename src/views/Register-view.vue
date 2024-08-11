<template>
  <div class="login-container">
    <v-container>
      <v-card class="register-card-container">
        <v-card-title class="login-primary">
          <div class="login-title1">欢迎注册</div>
          <div class="login-title2">你的数字时空场景</div>
        </v-card-title>
        <v-card-text style="margin-top: 5%;">
          <v-form @submit.prevent="register">

            <v-text-field v-model="registerForm.username" label="请输入用户名" bg-color="#ffffff" density="comfortable"
              width="90%" class="mx-auto">
              <template v-slot:prepend-inner>
                <v-icon>
                  <img src="/img/用户.png" alt="Account Icon" class="icon">
                </v-icon>
              </template>
            </v-text-field>

            <v-text-field v-model="registerForm.first_name_last_name" label="请输入姓名" bg-color="#ffffff"
              density="comfortable" width="90%" class="mx-auto">
              <template v-slot:prepend-inner>
                <v-icon>
                  <img src="/img/姓名.png" alt="Account Icon" style="width: 25px; height: 25px;">
                </v-icon>
              </template>
            </v-text-field>

            <v-text-field v-model="registerForm.phone" label="请输入手机号" bg-color="#ffffff" density="comfortable" width="90%"
              class="mx-auto">
              <template v-slot:prepend-inner>
                <v-icon>
                  <img src="/img/手机号.png" alt="Account Icon" class="icon">
                </v-icon>
              </template>
            </v-text-field>

            <v-text-field v-model="registerForm.password" label="请输入密码" bg-color="#ffffff" density="comfortable"
              type="password" width="90%" class="mx-auto">
              <template v-slot:prepend-inner>
                <v-icon>
                  <img src="/img/密码.png" alt="Password Icon" class="icon">
                </v-icon>
              </template>
            </v-text-field>

            <v-text-field v-model="registerForm.password" label="请再次输入确认密码" bg-color="#ffffff" density="comfortable"
              type="password" width="90%" class="mx-auto">
              <template v-slot:prepend-inner>
                <v-icon>
                  <img src="/img/密码.png" alt="Password Icon" class="icon">
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

</script>