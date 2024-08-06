<script setup lang="ts">
import ItemWrap from "@/components/item-wrap";
import LeftTop from "./left-top.vue";
import LeftCenter from "./left-center.vue";
import LeftBottom from "./left-bottom.vue";
import CenterMap from "./center-map.vue";
import CenterBottom from "./center-bottom.vue";
import RightTop from "./right-top.vue";
import RightCenter from "./right-center.vue";
import RightBottom from "./right-bottom.vue";
import { Decoration10 as DvDecoration10 } from '@kjgl77/datav-vue3';
import { Decoration3 as DvDecoration3 } from '@kjgl77/datav-vue3';
import { Decoration1 as DvDecoration1 } from '@kjgl77/datav-vue3';

</script>

<template>
  <div>
    <div class="index-box">
      <div class="contetn_left">

        <div class="card-container">
          <div class="title">
            <div class="title-text">
              <dv-decoration1 style="width:120px;height:40px;" :color="['#9400D3', '#9400D3']" />
              <div >设备总览</div>
              <dv-decoration1 style="width:120px;height:40px;transform: scaleX(-1);" :color="['#9400D3', '#9400D3']" />
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 500 60" preserveAspectRatio="none">
              <defs>
                <filter id="shadow1" x="-20%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="3" stdDeviation="6" flood-color="#000000" flood-opacity="0.3" />
                </filter>
              </defs>
              <path
                d="M 3.2798 2.2847 Q 1.34 5.0694 2.5161 8.2527 L 14.6247 41.0253 Q 16.2025 45.2957 19.938 47.8978 Q 23.6736 50.5 28.2261 50.5 L 458.774 50.5 Q 463.326 50.5 467.062 47.8978 Q 470.798 45.2957 472.375 41.0253 L 484.484 8.2527 Q 485.66 5.0693 483.72 2.2847 Q 481.78 -0.5 478.387 -0.5 L 8.6133 -0.5 Q 5.2196 -0.5 3.2798 2.2847 Z Z"
                fill="#ffffff" filter="url(#shadow1)" />
            </svg>
          </div>
          <div style="margin-top:0px;">
            <LeftTop />
          </div>
        </div>

        <div class="card-container">
          <div class="title" style="margin-top:0px;">
            <div class="title-text">
              <dv-decoration1 style="width:120px;height:40px;" :color="['#9400D3', '#9400D3']" />
              <div >用户总览</div>
              <dv-decoration1 style="width:120px;height:40px;transform: scaleX(-1);" :color="['#9400D3', '#9400D3']" />
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 500 60" preserveAspectRatio="none">
              <defs>
                <filter id="shadow1" x="-20%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="3" stdDeviation="6" flood-color="#000000" flood-opacity="0.3" />
                </filter>
              </defs>
              <path
                d="M 3.2798 2.2847 Q 1.34 5.0694 2.5161 8.2527 L 14.6247 41.0253 Q 16.2025 45.2957 19.938 47.8978 Q 23.6736 50.5 28.2261 50.5 L 458.774 50.5 Q 463.326 50.5 467.062 47.8978 Q 470.798 45.2957 472.375 41.0253 L 484.484 8.2527 Q 485.66 5.0693 483.72 2.2847 Q 481.78 -0.5 478.387 -0.5 L 8.6133 -0.5 Q 5.2196 -0.5 3.2798 2.2847 Z Z"
                fill="#ffffff" filter="url(#shadow1)" />
            </svg>
          </div>
          <LeftCenter />
        </div>

        <div class="card-container">
          <div class="title" style="margin-top:0px;">
            <div class="title-text">
              <dv-decoration1 style="width:120px;height:40px;" :color="['#9400D3', '#9400D3']" />
              <div >设备提醒</div>
              <dv-decoration1 style="width:120px;height:40px;transform: scaleX(-1);" :color="['#9400D3', '#9400D3']" />
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 500 60" preserveAspectRatio="none">
              <defs>
                <filter id="shadow1" x="-20%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="3" stdDeviation="6" flood-color="#000000" flood-opacity="0.3" />
                </filter>
              </defs>
              <path
                d="M 3.2798 2.2847 Q 1.34 5.0694 2.5161 8.2527 L 14.6247 41.0253 Q 16.2025 45.2957 19.938 47.8978 Q 23.6736 50.5 28.2261 50.5 L 458.774 50.5 Q 463.326 50.5 467.062 47.8978 Q 470.798 45.2957 472.375 41.0253 L 484.484 8.2527 Q 485.66 5.0693 483.72 2.2847 Q 481.78 -0.5 478.387 -0.5 L 8.6133 -0.5 Q 5.2196 -0.5 3.2798 2.2847 Z Z"
                fill="#ffffff" filter="url(#shadow1)" />
            </svg>
          </div>

          <div style="height: 240px !important;overflow: hidden!important;">
            <LeftBottom />
          </div>

        </div>


      </div>
      <div class="contetn_center">
        <div>
          <CenterMap style="margin-bottom:20px;"/>
        </div>
        <div class="card-container">
          <div class="title">
            <div class="title-text">
              <dv-decoration1 style="width:180px;height:40px;" :color="['#9400D3', '#9400D3']" />
              <div >安装计划</div>
              <dv-decoration1 style="width:180px;height:40px;transform: scaleX(-1);" :color="['#9400D3', '#9400D3']" />
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 500 60" preserveAspectRatio="none">
              <defs>
                <filter id="shadow1" x="-20%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="3" stdDeviation="6" flood-color="#000000" flood-opacity="0.3" />
                </filter>
              </defs>
              <path
                d="M 3.2798 2.2847 Q 1.34 5.0694 2.5161 8.2527 L 14.6247 41.0253 Q 16.2025 45.2957 19.938 47.8978 Q 23.6736 50.5 28.2261 50.5 L 458.774 50.5 Q 463.326 50.5 467.062 47.8978 Q 470.798 45.2957 472.375 41.0253 L 484.484 8.2527 Q 485.66 5.0693 483.72 2.2847 Q 481.78 -0.5 478.387 -0.5 L 8.6133 -0.5 Q 5.2196 -0.5 3.2798 2.2847 Z Z"
                fill="#ffffff" filter="url(#shadow1)" />
            </svg>
          </div>
          <CenterBottom />
        </div>

      </div>
      <div class="contetn_right">

        <div class="card-container">
          <div class="title" style="margin-top:0px;">
            <div class="title-text">
              <dv-decoration1 style="width:120px;height:40px;" :color="['#9400D3', '#9400D3']" />
              <div >区域计数</div>
              <dv-decoration1 style="width:120px;height:40px;transform: scaleX(-1);" :color="['#9400D3', '#9400D3']" />
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 500 60" preserveAspectRatio="none">
              <defs>
                <filter id="shadow1" x="-20%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="3" stdDeviation="6" flood-color="#000000" flood-opacity="0.3" />
                </filter>
              </defs>
              <path
                d="M 3.2798 2.2847 Q 1.34 5.0694 2.5161 8.2527 L 14.6247 41.0253 Q 16.2025 45.2957 19.938 47.8978 Q 23.6736 50.5 28.2261 50.5 L 458.774 50.5 Q 463.326 50.5 467.062 47.8978 Q 470.798 45.2957 472.375 41.0253 L 484.484 8.2527 Q 485.66 5.0693 483.72 2.2847 Q 481.78 -0.5 478.387 -0.5 L 8.6133 -0.5 Q 5.2196 -0.5 3.2798 2.2847 Z Z"
                fill="#ffffff" filter="url(#shadow1)" />
            </svg>
          </div>
          <LeftTop />
        </div>

        <div class="singcard">
          <div class="title">
            <div class="title-text">
              <dv-decoration1 style="width:120px;height:40px;" :color="['#9400D3', '#9400D3']" />
              <div >报警排名</div>
              <dv-decoration1 style="width:120px;height:40px;transform: scaleX(-1);" :color="['#9400D3', '#9400D3']" />
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 500 60" preserveAspectRatio="none">
              <defs>
                <filter id="shadow1" x="-20%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="3" stdDeviation="6" flood-color="#000000" flood-opacity="0.3" />
                </filter>
              </defs>
              <path
                d="M 3.2798 2.2847 Q 1.34 5.0694 2.5161 8.2527 L 14.6247 41.0253 Q 16.2025 45.2957 19.938 47.8978 Q 23.6736 50.5 28.2261 50.5 L 458.774 50.5 Q 463.326 50.5 467.062 47.8978 Q 470.798 45.2957 472.375 41.0253 L 484.484 8.2527 Q 485.66 5.0693 483.72 2.2847 Q 481.78 -0.5 478.387 -0.5 L 8.6133 -0.5 Q 5.2196 -0.5 3.2798 2.2847 Z Z"
                fill="#ffffff" filter="url(#shadow1)" />
            </svg>
          </div>
          <div style="height:700px;">
            <RightCenter />

          </div>
        </div>

      </div>

    </div>
    <div class="content_bottom">
      <div style="flex:9;">
        <dv-decoration10 style="width:100%;height:50px;" :color="['#9370DB', '#D8BFD8']" />
      </div>
      <div style="flex:1;padding:5px;">
        <dv-decoration3 style="width:250px;height:30px;" :color="['#9370DB', '#D8BFD8']" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-container {
  width: 100%;
  height: 305px;
  border: 1px solid #ddd;
  border-radius: 30px;
  box-shadow: 2px 6px 8px 3px rgba(0, 0, 0, 0.15);
  margin-bottom: 25px;
}

.singcard {
  width: 100%;
  height: 630px;
  border: 1px solid #ddd;
  border-radius: 30px;
  box-shadow: 2px 6px 8px 3px rgba(0, 0, 0, 0.15);
}

.index-box {
  width: 100%;
  display: flex;
  min-height: calc(100% - 64px);
  justify-content: space-between;
  padding-bottom: 5px;
}

//左边 右边 结构一样
.contetn_left,
.contetn_right {
  display: flex;
  flex-direction: column;
  // justify-content: space-around;
  position: relative;
  width: 540px;
  box-sizing: border-box;
  flex-shrink: 0;
}

.contetn_center {
  flex: 1;
  margin: 0 54px;
  display: flex;
  flex-direction: column;
  // justify-content: space-around;
  align-items: center; 
  justify-content: center; 

  .contetn_center-bottom {
    height: 315px;
  }
}

.contetn_lr-item {
  height: 305px;
}

.contetn_lr-item-bottom {
  height: 670px;
}

.content_bottom {
  position: absolute;
  bottom:-30px;
  display: flex;
  height: 60px;
  width: 100%;
}

.title {
  padding: 5px 0 0 0;
  position: relative;
  top: 0;
  left: 11%;
  // transform: translateX(-50%);
  transform: translateY(-25%);
  height: 60px;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title-text {
  display: flex;
  position: absolute;
  z-index: 1;
  font-size: 24px;
  font-weight: 900;
  color: #920783;
}

.title svg {
  width: 100%;
  height: 100%;
  z-index: 0;

}
</style>