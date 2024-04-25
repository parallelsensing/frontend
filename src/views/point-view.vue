<script setup lang="ts">

import { RouterView } from "vue-router";

import Headers from "./pointheader.vue";
import usePlatform from '@/stores/platform/modules/platform';
import { onMounted, ref} from 'vue';
const store = usePlatform();
const canvas = ref<HTMLElement>()
const canvasSize = ref<[number,number]>([1920,1080])



onMounted(() => {
 
  if (canvas.value) {
    store.platformAddCanvas(canvas.value,canvasSize.value); // 装载canvas

    store.start(); // 按照config开始执行
  }
});
</script>

<template>
    <div class="content_wrap" >
    <div ref="canvas" class="canvas"></div>
      <Headers />
      <RouterView />
    </div>
</template>
<style lang="scss" scoped>
.content_wrap {
  width: 1920px;
  height: 1080px;
  position: absolute;
  left: 0px;
  padding: 16px 16px 16px 16px;
  box-sizing: border-box;
  background-image: url("@/assets/img/pageBg.png");
  background-size: cover;
  background-position: center center;  
}
.canvas{
  position: absolute;
  width: 1920px;
  height: 1080px;
  
}


</style>
