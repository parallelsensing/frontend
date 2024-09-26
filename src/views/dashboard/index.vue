<script setup lang="ts">
import { RouterView } from "vue-router";
import ScaleScreen from "@/components/scale-screen";
import Headers from "./header.vue";
import { useSettingStore } from "@/stores/index";
import { storeToRefs } from "pinia";
const settingStore = useSettingStore();
const { isScale } = storeToRefs(settingStore);
const wrapperStyle = {};
</script>

<template>
  <div class="home">
    <ScaleScreen width="1920" height="1080" :delay="500" :fullScreen="false" :boxStyle="{
      backgroundColor: '#ffffff',
      overflow: 'auto',
    }" :wrapperStyle="wrapperStyle" :autoScale="isScale">
      <div class="content_wrap">
        <Headers />
        <RouterView />
      </div>
    </ScaleScreen>
  </div>
</template>

<style lang="scss" scoped>
.content_wrap {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-size: cover;
  background-position: center center;
}

.home {
  width: 100%;
  height: 100%;
}
</style>
