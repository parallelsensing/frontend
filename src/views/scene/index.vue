<script setup lang="ts">
import { RouterView } from "vue-router";
import useNewPlatform from '@/stores/newplatform/modules/newplatform';
import { onMounted, ref, computed, watch } from 'vue';
import headersall from "../header-all.vue";
import PointCloud from './components/PointCloud.vue';
import VideoSurveillance from './components/VideoSurveillance.vue';
import { NewPlatform } from "@/utils/newplatform";

const store = useNewPlatform();
const newPlatform = ref();
const canvas = ref<HTMLElement>();
const canvasSize = ref<[number, number]>([window.innerWidth, window.innerHeight]);
const loadingData = ref<any>(0);
const isPointCloudShow = ref(false);
const isVideoSurveillance = ref(false);
const isLoadingComplete = computed(() => {
  if(loadingData.value === 100) {
    return false;
  } else  {
    return true;
  }
});
const showVideoSurveillance = () => {
  isVideoSurveillance.value = !isVideoSurveillance.value;
}
const showPointCloud = () => {
  isPointCloudShow.value = !isPointCloudShow.value;
}

const onCast = (event: MouseEvent) => {
  const screenX = event.clientX;
  const screenY = event.clientY;
  // store.cast(screenX, screenY);
  const sensorName = newPlatform.value.cast(screenX, screenY);
  if (sensorName === "实时监控") {
    showVideoSurveillance();
  } else if (sensorName === "实时点云") {
    showPointCloud();
  } else {
    console.log('无');

  }
}

onMounted(() => {
  if (canvas.value) {
    newPlatform.value = new NewPlatform(canvas.value, canvasSize.value, (e: any) => {
      loadingData.value = Math.round(e.data.data)
    })
  }

});

</script>

<template>
  <div class="content_wrap">
    <div ref="canvas" class="canvas" @click="onCast"></div>
    <headersall />
    <div class="progress" v-if="isLoadingComplete">
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
/* 定义淡出过渡 */
.content_wrap {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  // padding: 16px 16px 16px 16px;
  box-sizing: border-box;
  background-size: cover;
  background-position: center center;
  overflow: hidden;
}


@keyframes fadenum {
  0% {
    opacity: 0;
  }
}

.canvas {
  position: absolute;
  width: 50%;
  height: 50%;

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
  color: rgb(0, 0, 0);
}

.progress>img {
  padding: 0 15px;
  width: 100px;
  height: 20px;
}
</style>