<script setup lang="ts">
import { reactive } from "vue";
import dayjs from 'dayjs';
import type { DateDataType } from "./index.d"
import { useSettingStore } from '../stores/index'

const dateData = reactive<DateDataType>({
  dateDay: "",
  dateYear: "",
  dateWeek: "",
  timing: null
});

const { checkoutPage } = useSettingStore()
const weekday = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
const timeFn = () => {
  dateData.timing = setInterval(() => {
    dateData.dateDay = dayjs().format("YYYY-MM-DD hh : mm : ss");
    dateData.dateWeek = weekday[dayjs().day()];
  }, 1000);
};
timeFn()


</script>

<template>
  <div class="d-flex jc-center title_wrap">
    <div class="zuojuxing"></div>
    <div class="youjuxing"></div>
    <div class="guang"></div>
    <div class="d-flex jc-center">
      <div class="title">
        <span class="title-text">点云场景</span>
        <div class="checkoutpage" @click="checkoutPage">大屏</div>
      </div>
    </div>
    <div class="timers">
      {{ dateData.dateYear }} {{ dateData.dateWeek }} {{ dateData.dateDay }}
    </div>

  </div>
</template>

<style scoped lang="scss">
.checkoutpage {
  float: left;
  left: 420px;
  bottom: 10px;
  position: absolute;
  width: 15%;
  height: 50%;
  border: 1px solid #00eded;
  border-radius: 10px;
  color: #00f7f6;
  text-align: center;
  line-height: 26px;
  letter-spacing: 6px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 237, 237, 0.5), 0 0 6px rgba(0, 237, 237, 0.4);
  z-index: 100000;
}

.title_wrap {
  position: absolute;
  top: 10px;
  height: 60px;
  width: 100%;
  background-image: url("@/assets/img/top.png");
  background-size: cover;
  background-position: center center;
  margin-bottom: 4px;

  .guang {
    position: absolute;
    bottom: -26px;
    background-image: url("@/assets/img/guang.png");
    background-position: 80px center;
    width: 100%;
    height: 56px;
  }

  .zuojuxing,
  .youjuxing {
    position: absolute;
    top: -2px;
    width: 140px;
    height: 6px;
    background-image: url("@/assets/img/headers/juxing1.png");
  }

  .zuojuxing {
    left: 11%;
  }

  .youjuxing {
    right: 11%;
    transform: rotate(180deg);
  }

  .timers {
    position: absolute;
    right: 25px;
    top: 30px;
    font-size: 18px;
    display: flex;
    align-items: center;
  }
}

.title {
  overflow: hidden;
  /* 清除浮动 */
  position: absolute;
  width: 500px;
  left: 765px;
  text-align: center;
  background-size: cover;
  color: transparent;
  height: 60px;
  line-height: 46px;

  .title-text {
    float: left;
    font-size: 38px;
    font-weight: 900;
    letter-spacing: 6px;
    width: 80%;
    background: linear-gradient(92deg,
        #0072ff 0%,
        #00eaff 48.8525390625%,
        #01aaff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
