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
  background-color: #ffffff;
}
</style>
<script setup lang="ts" >
import GlobalAlert from '@/components/global-alert.vue'

</script>