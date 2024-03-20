<script setup lang="ts">
import { onMounted, ref } from 'vue';
import IconTooling from './icons/icon-tooling.vue';

defineProps<{
  msg: string;
}>();
const canvas = ref();
onMounted(() => {
  const gl = canvas.value.getContext('webgl');
  console.log(gl);
});
</script>

<template>
  <div class="webgl-map">
    <h1 class="green">{{ msg }}</h1>
    <h2><icon-tooling></icon-tooling></h2>
    <canvas ref="canvas" width="500" height="500" style="width: 100%"></canvas>
  </div>
</template>
