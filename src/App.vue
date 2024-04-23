
<template>
  
  <div id="app">
    <router-view/>
  <GlobalAlert/>
  </div>
 
</template>

<style scoped>
#app {
  width: 100vw;
  height: 100vh;
  background-color: #03050C;
}
</style>
<script setup lang="ts" >
// 测试request
// import axios from 'axios'
// import  {onMounted} from 'vue';
import GlobalAlert from '@/components/global-alert.vue'


// onMounted(()=>{
 
//  axios.get(' /api/sensing/item/get_items')
//     .then(function (response) {
//       // 处理成功响应
//     console.log(response);
//     })
//     .catch(function (error) {
//       // 处理错误
//       console.error('Error fetching user information:', error);
//     });

// })
</script>