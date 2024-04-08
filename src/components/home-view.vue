
<template>
 <div class="home">
   <div id="nav">
    <router-link to="./login">登录</router-link> |
    <router-link to="./platform">点云数据</router-link> |
    <router-link to="./map">地图</router-link> |
    <router-link to="./search">搜索框</router-link> |
   </div>
  </div>
</template>

<script setup lang="ts">
</script>
<style scoped>
  #nav {
    padding: 10px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>