<script setup lang="ts">
import { RouterView } from "vue-router";
import Headers from "./pointheader.vue";
import useMinScene from '@/stores/chatRobot/modules/chatRobot'
import usePlatform from '@/stores/platform/modules/platform';
import { onMounted, ref, computed } from 'vue';
import chatHome from "@/pages/chat/Home/chat-home.vue";
const LoadingProgress = computed(() => store.loadingPercent)
const LoadingMsg = computed(() => store.loadingMsg)
const store = usePlatform();
const minStore = useMinScene()
const canvas = ref<HTMLElement>()
const canvasSize = ref<[number, number]>([window.innerWidth, window.innerHeight])
const mincanvasSize = ref<[number, number]>([250,200])
const minScene = ref<HTMLElement>()
const isChatShow = ref(false)


const onCast = (event: MouseEvent) => {
  const screenX = event.clientX;
  const screenY = event.clientY;
  store.cast(screenX, screenY);
}
const onMinCast = (event: MouseEvent) => {
  const screenX = event.clientX;
  const screenY = event.clientY;
  isChatShow.value = true
  minStore.cast(screenX, screenY);
}
const closeChat = ()=>{
 isChatShow.value = false
}

onMounted(() => {

  if (canvas.value) {

    store.platformAddCanvas(canvas.value, canvasSize.value); // 装载canvas
    
    store.start(); // 按照config开始执行
  }
  if (minScene.value) {
    minStore.minSceneAddCanvas(minScene.value,mincanvasSize.value)
  }
});
</script>

<template>

  <div class="content_wrap">
    <div ref="canvas" class="canvas" @click="onCast"></div>

    <div class="progress" v-if="LoadingProgress != 100">
      <img src="/img/loading.gif" alt="" />
      {{ LoadingMsg }}
    </div>
    <Headers />
    <RouterView />
  </div>
  <div id="minScene" ref="minScene" @click="onMinCast"></div>
  <div class="chat"  v-if="isChatShow" >
  <chatHome/>
  <div class="close-btn">
      <button  @click="closeChat">
        <v-icon>mdi-close</v-icon>
      </button>
    </div>
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
  background-image: url("@/assets/img/pageBg.png");
  background-size: cover;
  background-position: center center;
  overflow: hidden;
}
.chat{
position: absolute;
right:170px;
bottom: 150px;
z-index: 1000000;
width: 600px;
height: 400px;
background-color: rgb(161, 159, 159);
opacity: 0.9;
animation:fadenum 8s 1;
  .close-btn {
  position: absolute;
  top: 0;
  right: 0;
  margin: 2px;
  
}
}
@keyframes fadenum{
  0%{opacity: 0;}
}

#minScene {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 220px;
  height:200px;
  z-index: 10000000000;
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
  color: #fff;
}

.progress>img {
  padding: 0 15px;
  width: 100px;
  height: 20px;
}

.loading {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 1920px;
  height: 1080px;
  // background-image: url(/img/loading.png);
  // background-size: cover;
  // filter: blur(50px);
  display: block;
  z-index: 100;
}
</style>
