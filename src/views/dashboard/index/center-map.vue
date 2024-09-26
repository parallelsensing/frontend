<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { NewPlatform } from "@/utils/newplatform";

const newPlatform = ref();
const canvas = ref<HTMLElement>();
const canvasSize = ref<[number, number]>([800, 800]);
const loadingData = ref<any>(0);
const isLoadingIncomplete = computed(() => loadingData.value < 100);

onMounted(() => {
  if (canvas.value) {
    newPlatform.value = new NewPlatform(canvas.value, canvasSize.value, (e: any) => {
      loadingData.value = Math.round(e.data.data);
    })
  }
})
</script>

<template>
  <div class="centermap">
    <div class="mapwrap">
      <div class="card-container">
        <div ref="canvas" class="canvas"></div>
        <div class="progress" v-if="isLoadingIncomplete">
      {{ '已加载：' + loadingData + '%' }}
    </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.centermap {
  margin-bottom: 30px;
  overflow: hidden;
  border-radius: 30px;
  box-shadow: 2px 6px 8px 3px rgba(0, 0, 0, 0.15);
  width: 730px;
  height: 630px;
  border: 1px solid #ddd;

  .mapwrap {
    height: 580px;
    width: 580px;
    box-sizing: border-box;
    position: relative;

    .canvas {
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 100;
    }
  }
}
.progress {
  position: fixed;
  top: 40vh;
  left: 50vw;
  width: 300px;
  height: 80px;
  z-index: 101;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 20px;
  color: rgb(0, 0, 0);
}
</style>
