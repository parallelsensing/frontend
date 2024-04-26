<script setup lang="ts">

import realtimeStore from '@/stores/realtime/modules/realtime';
import {ref} from 'vue';

const realtimeScene = ref<HTMLElement>()
const useRealtimeStore =realtimeStore() 
const realtimeShow = useRealtimeStore.$state.realtimeShow;

</script>

<template>
  <div class="realtime">
    <div v-show=" !realtimeShow" class="realtimeScene" ref="realtimeScene"></div>
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
