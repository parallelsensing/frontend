
<template>
 <div class="home">
   <div id="nav">
    <router-link to="./login">登录</router-link> |
    <router-link to="./point">点云数据</router-link> |
    <router-link to="./map">地图</router-link> |
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
      color: #f2f5f8;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>