
<template>
  
  <!-- <div id="app">
    <router-view/>
  <GlobalAlert/>
  </div> -->
  <router-view/>
  <GlobalAlert/>
 
 
</template>

<style scoped>
#app {
  width: 100vw;
  height: 100vh;
  background-color: #03050C;
}
</style>
<script setup lang="ts" >

import GlobalAlert from '@/components/global-alert.vue'

</script>