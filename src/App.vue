
<template>
  <router-view/>
  <GlobalAlert/>
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
import axios from 'axios'
import  {onMounted} from 'vue';
import GlobalAlert from '@/components/global-alert.vue'


onMounted(()=>{
 
 axios.get(' /api/sensing/item/get_items')
    .then(function (response) {
      // 处理成功响应
    console.log(response);
    })
    .catch(function (error) {
      // 处理错误
      console.error('Error fetching user information:', error);
    });

})
</script>