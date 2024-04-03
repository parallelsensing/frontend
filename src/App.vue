
<template>
  <router-view/>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>

<script setup lang="ts" >
// 测试request
// import axios from 'axios'

import  {onMounted} from 'vue';
import { reqLogin } from './api/user';
onMounted(()=>{
 reqLogin({username:'111111',password:'123456'})
//  axios.get('/api')
//     .then(function (response) {
//       // 处理成功响应
//     console.log(response);
    
//     })
//     .catch(function (error) {
//       // 处理错误
//       console.error('Error fetching user information:', error);
//     });

})
</script>