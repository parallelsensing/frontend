<template>
  <canvas ref="canvas" id="canvas" @click="onCast"></canvas>
  <div class="loading" v-if="LoadingProgress != 100"></div>
  <div class="progress" v-if="LoadingProgress != 100">
    <img src="/img/loading.gif" alt="" />
    {{ LoadingMsg }}
  </div>
  <div class="realtime">
  <div style="position: absolute; width:100%">
    <p >位置1的实时点云数据</p>
  </div>
  <canvas ref="minCanvas" id="minScen">我是小场景</canvas>
  </div>
</template>

<script setup lang="ts">
import usePlatform from '@/stores/platform/modules/platform';
import { onMounted, ref, computed } from 'vue';
const store = usePlatform();
const canvas = ref<HTMLCanvasElement>();

const minCanvas = ref<any>();
const LoadingProgress = computed(() => store.loadingPercent)
const LoadingMsg = computed(() => store.loadingMsg)
function onCast(e: MouseEvent) {
  const x = (e.clientX / window.innerWidth) * 2 - 1;
  const y = - (e.clientY / window.innerHeight) * 2 + 1;
  store.cast(x, y);
}
onMounted(() => {
  if (canvas.value) {
    store.platformAddCanvas(canvas.value); // 装载canvas
    store.minSceneAddCanvas(minCanvas.value)
    store.start(); // 按照config开始执行
  }
});
</script>
<style scoped>
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}
p {
    /* font: 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif; */
    text-align:center;
    font-size:130%;
}
.realtime{
  display: block;
  bottom: 0;
  left: 800px;
  position: absolute;
  margin: 0 auto;
  width: 576px;
  background-color: #fff;
  /* 设置图片宽度为父div的100% */
  height: 350px;
}
#minScen {
  position: absolute;
  top: 20px;
  width: 576px;
  height: 324px;
  /* z-index: ; */
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
  background-image: url(/img/loading.png);
  background-size: cover;
  filter: blur(50px);
  display: block;
  z-index: 100;
}
</style>
