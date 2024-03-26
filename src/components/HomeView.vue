
<template>
 <div class="home">
   <div id="nav">
    <router-link to="./">Home</router-link> |
    <router-link to="./platform">点云数据</router-link> |
    <router-link to="./map">地图</router-link> |
   </div>
   <h1>示例展示</h1>
   <p>3D模型可视化加载</p>
 
   <ul>
     <li><router-link to="./platform">点云数据</router-link></li>
     <li><router-link to="./map">地图</router-link></li>
     
     
   </ul>
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