<template>
  <div class="back-top-container" @click="emit('onBackTop')">
    <v-icon>mdi-arrow-up</v-icon>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['onBackTop']);
</script>

<style lang="less" scoped>
.back-top-container {
  position: fixed;
  bottom: 240px;
  right: 180px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1;
  i {
    font-size: 24px;
    color: #666;
  }
  @media screen and (max-width: 500px) {
    width: 32px;
    height: 32px;
    right: 16px;
    i {
      font-size: 16px;
    }
  }
}
</style>
