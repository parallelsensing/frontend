<script setup lang="ts">
import { RouterView } from "vue-router";
import Headers from "./pointheader.vue";
import ScaleScreen from "@/components/scale-screen";
import usePlatform from '@/stores/platform/modules/platform';
import { onMounted, ref,computed } from 'vue';
const LoadingProgress = computed(() => store.loadingPercent)
const LoadingMsg = computed(() => store.loadingMsg)
const store = usePlatform();
const canvas = ref<HTMLElement>()
const canvasSize = ref<[number, number]>([window.innerWidth, window.innerHeight])
import { storeToRefs } from "pinia";
import { useSettingStore } from "@/stores/index";
const settingStore = useSettingStore();
const { isScale } = storeToRefs(settingStore);
const wrapperStyle = {};
const onCast = (event: MouseEvent) => {
  const screenX = event.clientX;
  const screenY = event.clientY;
  store.cast(screenX, screenY);
}



onMounted(() => {

  if (canvas.value) {
    store.platformAddCanvas(canvas.value, canvasSize.value); // 装载canvas

    store.start(); // 按照config开始执行
  }
});
</script>

<template>
   <!-- <ScaleScreen
    width="1920"
    height="1080"
    :delay="500"
    :fullScreen="false"
    :boxStyle="{
      background: '#03050C',
      overflow:  'auto',
    }"
    :wrapperStyle="wrapperStyle"
    :autoScale="isScale"
  >
  <div class="content_wrap">
    <div ref="canvas" class="canvas" @click="onCast"></div>
    <div class="loading" v-if="LoadingProgress != 100"></div>
  <div class="progress" v-if="LoadingProgress != 100">
    <img src="/img/loading.gif" alt="" />
    {{ LoadingMsg }}
  </div>
  <Headers />
    <RouterView />
  </div>
  </ScaleScreen> -->
  <div class="content_wrap">
    <div ref="canvas" class="canvas" @click="onCast"></div>
   
  <div class="progress" v-if="LoadingProgress != 100">
    <img src="/img/loading.gif" alt="" />
    {{ LoadingMsg }}
  </div>
    <Headers />
    <RouterView />
  </div>
</template>
<style lang="scss" scoped>
.content_wrap {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  // padding: 16px 16px 16px 16px;
  box-sizing: border-box;
  background-image: url("@/assets/img/pageBg.png");
  background-size: cover;
  background-position: center center;
  overflow: hidden;
}

.canvas {
  position: absolute;
  width: 100%;
  height: 100%;

}
.progress {
  position: fixed;
  top: 500px;
  left: 1000px;
  width: 300px;
  height: 80px;
  z-index: 101;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 20px;
  color: #fff;
}

.progress>img {
  padding: 0 15px;
  width: 100px;
  height: 20px;
}

.loading {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 1920px;
  height: 1080px;
  // background-image: url(/img/loading.png);
  // background-size: cover;
  // filter: blur(50px);
  display: block;
  z-index: 100;
}
</style>
