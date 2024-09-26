<template>
    <div class="time-container">
      <div>{{ formattedDate }}</div>
      <div>{{ formattedDay }}  <span>{{ formattedTime }}</span></div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  
  const formattedDate = ref<string>('');
  const formattedDay = ref<string>('');
  const formattedTime = ref<string>('');
  
  const updateTime = () => {
    const now = new Date();
    
    // 格式化日期
    formattedDate.value = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`;
    
    // 格式化星期几
    const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    formattedDay.value = days[now.getDay()];
    
    // 格式化时间
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    formattedTime.value = `${hours}:${minutes}:${seconds}`;
  }
  
  onMounted(() => {
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    // 清除定时器
    onUnmounted(() => {
      clearInterval(interval);
    });
  });
  </script>
  
  <style scoped>
  .time-container {
    background-color: #660874a3;
    padding: 10px;
    border-radius: 8px;
    color: white;
    text-align: center;
    font-size: 18px;
  }
  
  .time-container div {
    margin: 5px 0;
  }
  
  .time-container span {
    font-size: 16px;
    font-weight: 600;
  }
  </style>