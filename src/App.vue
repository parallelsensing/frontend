
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
//测试request
// import request from './units/request';
// import  {onMounted} from 'vue';
// onMounted(()=>{
//   request({
//     url:'/api/user/login',
//     method:'post',
//     data:{
//       username:'admin',
//       password:'123456'
//     }
//   }).then(res=>{
//     console.log(res);
//   })
// })
</script>