<template>
  <div class="login_container">
    <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-card-title class="primary">
            <span class="white--text">中国科学院自动化研究所</span>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field v-model="loginForm.username" label="用户名" prepend-inner-icon="mdi-account" outlined  ></v-text-field>
              <v-text-field v-model="loginForm.password" label="密码" 
               prepend-inner-icon="mdi-lock"
               :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
               @click.append-inner = "togglePasswordVisibility"
               :type="showPassword ? 'text' : 'password'"
               outlined
                ></v-text-field>
              <v-btn color="primary" type="submit">登录</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  </div>
</template>
<script setup lang="ts">

import { ref,reactive} from 'vue'
import { useUserStore } from '../store/users';
import {useRouter} from 'vue-router';

let loginForm= reactive({username:'admin',password:'123456'})
let showPassword =ref(false) 
let useStore = useUserStore()
let router = useRouter();

let login = ()=>{
  useStore.userLogin(loginForm)
  router.push('/home')
}

let togglePasswordVisibility = ()=> {
  showPassword.value = !showPassword.value;
    }
</script>

<style scoped lang="scss">
  .login_container{
    width: 100%;
    height: 100vh;
    // background:url('../assets/image/background.jpg') no-repeat;
    // background-size: cover;
  }
  .primary {
    text-align: center;
    background-color: #71b0e4;
  }
  .elevation-12{
    top: 30vh;
  }

</style>