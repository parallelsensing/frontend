<script setup lang="ts">
import { ref } from "vue";
import { RouterView } from "vue-router";
import ScaleScreen from "@/components/scale-screen";
import Headers from "./header.vue";
import Setting from "./setting.vue";
import { useSettingStore } from "@/stores/index";
import { storeToRefs } from "pinia";
import MessageContent from "@/components/Plugins/MessageContent";
import { useFullscreen } from '@vueuse/core';
const settingStore = useSettingStore();
const { isScale } = storeToRefs(settingStore);
const wrapperStyle = {};
const { isFullscreen, toggle } = useFullscreen();
const showHeader = ref(true);
const fullScreen = () => {
  showHeader.value = !showHeader.value;
  toggle();
}

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
        <MessageContent />
      </div>
    </ScaleScreen>
    <span>
      <Setting />
    </span>
  </div>
</template>

<style lang="scss" scoped>
.content_wrap {
  width: 100%;
  height: 100%;
  // padding: 16px 16px 16px 16px;
  box-sizing: border-box;
  // background-image: url("@/assets/img/bg.png");
  background-size: cover;
  background-position: center center;
}

.fullscreen-btn {
  width: 55px;
  height: 65px;
  background-color: #ffffff;
  border-radius: 15px;
  margin-top: 20px;
  box-shadow: 0px 2px 4px 4px rgba(0, 0, 0, 0.10);
  z-index: 999999;

  img {
    width: 100%;
    height: 100%;
  }
}

.home {
  width: 100%;
  height: 100%;
  background-image: url("@/assets/img/bg.png");
  background-size: cover;
  background-position: center center;
}
</style>
