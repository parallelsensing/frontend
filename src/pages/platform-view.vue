<template>
  <!-- <div>{{ LoadingMsg }}</div> -->
  <canvas ref="canvas" style="width:100%;height:100%"></canvas>
  <div class="loading" v-if="LoadingProgress != 100"></div>
  <div class="progress" v-if="LoadingProgress != 100">
    <img src="/public/img/loading.gif" alt="" />
    <span>{{LoadingMsg}}</span>
  </div>
</template>

<script setup lang="ts">
import usePlatform from '@/store/platform/modules/platform';
import { onMounted, ref, computed } from 'vue';

const store = usePlatform();
const canvas = ref<HTMLCanvasElement>();
const LoadingProgress = computed(() => store.loadingPercent)
const LoadingMsg = computed(() => store.loadingMsg)

onMounted(() => {
  if (canvas.value) {
    store.addCanvas(canvas.value); // 装载canvas
    store.start(); // 按照config开始执行
  }
});
</script>
<style scoped>
.progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 1920px;
  height: 1080px;
  z-index: 101;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #fff;
}

.progress>img {
  padding: 0 15px;
  width: 100px;
  height: 50px;
}

.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 1920px;
  height: 1080px;
  background-image: url(/public/img/loading.png);
  background-size: cover;
  filter: blur(50px);
  z-index: 100;
}
</style>
