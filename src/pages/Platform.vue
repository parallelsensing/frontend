
<template>
  <div>{{ LoadingMsg }}</div>
  <canvas ref="canvas" style="width:100%;height:100%" ></canvas>
</template>

<script setup lang="ts">

import { usePlatform } from '../store';
import { computed, onMounted, ref} from 'vue';


const store = usePlatform();

const canvas = ref<HTMLCanvasElement>();
const LoadingMsg = computed(()=>store.loadingMsg)

onMounted(() =>{
  if(canvas.value) {
    store.freight(canvas.value); // 装载canvas
    store.start(); // 按照config开始执行
  }
});

</script>


