<script setup lang="ts">
import { useRouter } from 'vue-router';
// import useRealtimeStore from '@/stores/realtime/modules/realtime'
import usePlatform from '@/stores/platform/modules/platform';
import { onMounted, ref } from 'vue';
const store = usePlatform();
const bigScene = ref<HTMLElement>()
const bigSceneSize = ref<[number, number]>([700, 580])
// const realtimeShow = ref<boolean>(false)
// const realtimeStore = useRealtimeStore()


let router = useRouter()
const chexkoutPage = () => {
  router.push("./point")
}
const onCast = (event: MouseEvent) => {
  const screenX = event.clientX;
  const screenY = event.clientY;
  store.cast(screenX, screenY);
}

onMounted(() => {

  if (bigScene.value) {
    store.platformAddCanvas(bigScene.value, bigSceneSize.value); // 装载canvas
    store.start(); // 按照config开始执行
  }
});
</script>

<template>
  <div class="centermap">
    <div class="maptitle">
      <div class="zuo"></div>
      <span class="titletext"> 点云场景</span>
      <div class="you"></div>
    </div>
    <div class="mapwrap">
      <BorderBox13>
        <div @click="onCast" class="bigScene" ref="bigScene"></div>
        <div class="checkoutpoint" @click="chexkoutPage()">大场景</div>
      </BorderBox13>
    </div>
  </div>
</template>

<style scoped lang="scss">
.centermap {
  margin-bottom: 30px;

  .maptitle {
    height: 60px;
    display: flex;
    justify-content: center;
    padding-top: 10px;
    box-sizing: border-box;

    .titletext {
      font-size: 28px;
      font-weight: 900;
      letter-spacing: 6px;
      background: linear-gradient(92deg, #0072ff 0%, #00eaff 48.8525390625%, #01aaff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0 10px;
    }

    .zuo,
    .you {
      background-size: 100% 100%;
      width: 29px;
      height: 20px;
      margin-top: 8px;
    }

    .zuo {
      background: url("@/assets/img/xiezuo.png") no-repeat;
    }

    .you {
      background: url("@/assets/img/xieyou.png") no-repeat;
    }
  }

  .mapwrap {
    height: 580px;
    width: 100%;
    box-sizing: border-box;
    position: relative;

    .bigScene {
      width: 100%;
      height: 100%;
      position: relative;
      /* 父容器必须设置为相对定位 */
      z-index: 100;
    }

    .checkoutpoint {
      position: absolute;
      right: 20px;
      top: -46px;
      width: 80px;
      height: 28px;
      border: 1px solid #00eded;
      border-radius: 10px;
      color: #00f7f6;
      text-align: center;
      line-height: 26px;
      letter-spacing: 6px;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0, 237, 237, 0.5), 0 0 6px rgba(0, 237, 237, 0.4);
      z-index: 10;
    }
  }
}
</style>
