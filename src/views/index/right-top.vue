<script setup lang="ts">
import usePlatform from '@/stores/platform/modules/platform';
import realtimeStore from '@/stores/realtime/modules/realtime';
import { onMounted, ref} from 'vue';
const store = usePlatform();
const realtimeScene = ref<HTMLElement>()
const useRealtimeStore =realtimeStore() 
const realtimeShow = useRealtimeStore.$state.realtimeShow;

const realtimeSceneSize = ref<[number,number]>([520,260])
const onCast = (event: MouseEvent) => {
  const screenX = event.clientX;
  const screenY = event.clientY;
  store.cast(screenX, screenY);

}

onMounted(() => {
 
 if (realtimeScene.value) {
   store.platformAddCanvas(realtimeScene.value,realtimeSceneSize.value); // 装载canvas

   store.start(); // 按照config开始执行
 }
});

</script>

<template>
  <div class="realtime">
    <div v-show=" !realtimeShow" @click="onCast" class="realtimeScene" ref="realtimeScene"></div>
    <div v-show="realtimeShow" >点击传感器获取点云实时场景</div>
  </div>
</template>
<style scoped lang="scss">
  .realtime {
   height: 100%;
    width: 100%;
    box-sizing: border-box;
    position: absolute;
    .realtimeScene {
      width: 100%;
      height: 100%;
      position: relative;
      /* 父容器必须设置为相对定位 */
      z-index: 100;
    }
  }
</style>
