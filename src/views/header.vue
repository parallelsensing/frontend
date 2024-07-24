<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref } from "vue";
import dayjs from 'dayjs';
import type { DateDataType } from "./index.d";
import { useSettingStore } from '../stores/index';
import { Decoration3 as DvDecoration3 } from '@kjgl77/datav-vue3';
// import { useFullscreen } from '@vueuse/core';
// const { isFullscreen, toggle } = useFullscreen();
// const showHeader = ref(true);
// const fullScreen = () => {
//   showHeader.value = !showHeader.value;
//   toggle();
// }

const dateData = reactive<DateDataType>({
  dateDay: "",
  dateYear: "",
  dateWeek: "",
  timing: null
});

const { setSettingShow } = useSettingStore()
const weekday = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
const timeFn = () => {
  dateData.timing = setInterval(() => {
    dateData.dateDay = dayjs().format("YYYY-MM-DD hh : mm : ss");
    dateData.dateWeek = weekday[dayjs().day()];
  }, 1000);
};
timeFn();

</script>

<template>
  <div style="display: flex;width: 100%;height: 90px;margin-bottom: 0px;">
    <div class="cont">
      <div class="zuojuxing">
        <img src="@/assets/img/headers/juxing1.png" alt="左边形状" style="position: absolute;width:200px;height: 5px;z-index: 1;top:0px;left: 250px;filter: hue-rotate(400deg) saturate(2);">
        <div style="position: absolute;z-index: 1;top:15px">
          <dv-decoration3 style="width:200px;height:30px;" :color="['#9370DB', '#D8BFD8']" />
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="18.992 -2.042 463 60.64" preserveAspectRatio="none">
          <defs>
            <filter id="shadow" x="-20%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="3" stdDeviation="6" flood-color="#000000" flood-opacity="0.3" />
            </filter>
          </defs>
          <path
            d="M 19.992 7.239 Q 19.992 10.833 20.074 15.957 L 20.155 41.171 Q 20 46 22 49 Q 23.6736 50.5 28.2261 50.5 L 458.774 50.5 Q 467 51 469 49 Q 472 47 470.462 41.778 L 457.393 10.045 Q 450.075 -1.609 437.331 -1.013 L 27.882 -0.554 Q 20.584 -0.262 20.003 7.228 Z"
            fill="#ffffff" filter="url(#shadow)" />
        </svg>
      </div>

      <div class="title">
        <div class="title-text">中国科学院自动化研究所</div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="2.07218 -0.5 486.9 58" preserveAspectRatio="none">
          <defs>
            <filter id="shadow1" x="-20%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="3" stdDeviation="6" flood-color="#000000" flood-opacity="0.3" />
            </filter>
          </defs>
          <path
            d="M 3.2798 2.2847 Q 1.34 5.0694 2.5161 8.2527 L 14.6247 41.0253 Q 16.2025 45.2957 19.938 47.8978 Q 23.6736 50.5 28.2261 50.5 L 458.774 50.5 Q 463.326 50.5 467.062 47.8978 Q 470.798 45.2957 472.375 41.0253 L 484.484 8.2527 Q 485.66 5.0693 483.72 2.2847 Q 481.78 -0.5 478.387 -0.5 L 8.6133 -0.5 Q 5.2196 -0.5 3.2798 2.2847 Z"
            fill="#ffffff" filter="url(#shadow1)" />
        </svg>
      </div>

      <div class="youjuxing">
        <img src="@/assets/img/headers/juxing1.png" alt="左边形状" style="position: absolute;width:200px;height: 5px;z-index: 1;top:0px;right: 260px;filter: hue-rotate(400deg) saturate(2);">
        <div style="position: absolute;z-index: 1;top:15px;right: 0;">
          <dv-decoration3 style="width:200px;height:30px;" :color="['#9370DB', '#D8BFD8']" />
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="16.992 -2.042 457.4 60.64" preserveAspectRatio="none">
          <defs>
            <filter id="shadow0" x="-10%" y="-50%" width="260%" height="200%">
              <feDropShadow dx="0" dy="3" stdDeviation="6" flood-color="#000000" flood-opacity="0.3" />
            </filter>
          </defs>
          <path
            d="M 33.592 10.652 L 22 43 Q 20 46 22 49 Q 23.6736 50.5 28.2261 50.5 L 458.774 50.5 Q 467 51 469 49 Q 472 47 472.375 41.0253 L 472 4 Q 472 3 471 1 Q 470 0 467 -1 L 51 0 Q 39.105 0.009 33.592 10.525 Z"
            fill="#ffffff" filter="url(#shadow0)" />
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cont {
  position: relative;
  width: 100%;
}

.zuojuxing,
.youjuxing {
  position: absolute;
  top: 0;
  width: 560px;
  height: 55px;
  // overflow: visible;
}

.zuojuxing {
  left: 0px;
}

.youjuxing {
  right: 0px;
}

.title {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 70px;
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title-text {
  position: absolute;
  z-index: 1;
  font-size: 38px;
  font-weight: 900;
  color: #920783;
}

.title svg {
  width: 100%;
  height: 100%;
  z-index: 0;

}
</style>