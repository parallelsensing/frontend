<script setup lang="ts">
import { onMounted, ref, computed, onBeforeUnmount } from 'vue';
import headersall from "../../components/HeaderAll/header-all.vue";
import PointCloud from './components/PointCloud.vue';
import VideoSurveillance from './components/VideoSurveillance.vue';
import { NewPlatform } from "@/utils/newplatform";

const newPlatform = ref();
const canvas = ref<HTMLElement>();
const canvasSize = ref<[number, number]>([window.innerWidth, window.innerHeight]);
const loadingData = ref<any>(0);
const isPointCloudShow = ref(false);
const isVideoSurveillance = ref(false);
const isLoadingIncomplete = computed(() => loadingData.value < 100);

/**显示实时监控 */
const showVideoSurveillance = () => {
  isVideoSurveillance.value = !isVideoSurveillance.value;
}

/**显示实时点云 */
const showPointCloud = () => {
  isPointCloudShow.value = !isPointCloudShow.value;
}

/**点击canvas时触发*/
const onCast = (event: MouseEvent) => {
  const screenX = event.clientX;
  const screenY = event.clientY;
  console.log(screenX, screenY);
  const sensorName = newPlatform.value.cast(screenX, screenY);
  switch (sensorName) {
    case "实时监控":
      showVideoSurveillance();
      break;
    case "实时点云":
      showPointCloud();
      break;
    default:
      console.log('无');
  }
}

// 组件挂载后初始化
onMounted(() => {
  const updateCanvasSize = () => {
    canvasSize.value = [window.innerWidth, window.innerHeight];
  };

  window.addEventListener('resize', updateCanvasSize);
  updateCanvasSize(); // 初始调用

  if (canvas.value) {
    newPlatform.value = new NewPlatform(canvas.value, canvasSize.value, (e: any) => {
      loadingData.value = Math.round(e.data.data);
    });
  }

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateCanvasSize);
  });
});

</script>

<template>
  <div class="content_wrap">
    <div ref="canvas" class="canvas" @click="onCast"></div>
    <headersall />
    <div class="progress" v-if="isLoadingIncomplete">
      {{ '已加载：' + loadingData + '%' }}
    </div>
  </div>

  <div v-if="isPointCloudShow">
    <PointCloud />
  </div>
  <div v-if="isVideoSurveillance">
    <VideoSurveillance />
  </div>
</template>

<style lang="scss" scoped>
.content_wrap {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  box-sizing: border-box;
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