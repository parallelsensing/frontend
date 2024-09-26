<template>
  <div>
    <div class="board-index-box">
      <div class="board-contetn_left">
        <div class="board-card-container">
          <div class="board-title">
            <div class="board-title-text">
              <dv-decoration1 class="board-decoration" :color="['#9400D3', '#9400D3']" />
              <div>设备总览</div>
              <dv-decoration1 class="board-decoration reverse" :color="['#9400D3', '#9400D3']" />
            </div>
            <TitleDecoration />
          </div>
          <div class="board-top-margin-zero">
            <LeftTop />
          </div>
        </div>

        <div class="board-card-container">
          <div class="board-title board-top-margin-zero">
            <div class="board-title-text">
              <dv-decoration1 class="board-decoration" :color="['#9400D3', '#9400D3']" />
              <div>用户总览</div>
              <dv-decoration1 class="board-decoration reverse" :color="['#9400D3', '#9400D3']" />
            </div>
            <TitleDecoration />
          </div>
          <LeftCenter />
        </div>

        <div class="board-card-container">
          <div class="board-title board-top-margin-zero">
            <div class="board-title-text">
              <dv-decoration1 class="board-decoration" :color="['#9400D3', '#9400D3']" />
              <div>设备提醒</div>
              <dv-decoration1 class="board-decoration reverse" :color="['#9400D3', '#9400D3']" />
            </div>
            <TitleDecoration />
          </div>

          <div class="board-left-bottom">
            <LeftBottom />
          </div>
        </div>
      </div>

      <div class="board-contetn_center">
        <div>
          <CenterMap class="board-map-margin-bottom" />
        </div>
        <div class="board-card-container">
          <div class="board-title">
            <div class="board-title-text">
              <dv-decoration1 class="board-decoration large" :color="['#9400D3', '#9400D3']" />
              <div>安装计划</div>
              <dv-decoration1 class="board-decoration large reverse" :color="['#9400D3', '#9400D3']" />
            </div>
            <TitleDecoration />
          </div>
          <CenterBottom />
        </div>
      </div>

      <div class="board-contetn_right">
        <div class="board-card-container">
          <div class="board-title board-top-margin-zero">
            <div class="board-title-text">
              <dv-decoration1 class="board-decoration" :color="['#9400D3', '#9400D3']" />
              <div>区域计数</div>
              <dv-decoration1 class="board-decoration reverse" :color="['#9400D3', '#9400D3']" />
            </div>
            <TitleDecoration />
          </div>
          <LeftTop />
        </div>

        <div class="board-singcard">
          <div class="board-title">
            <div class="board-title-text">
              <dv-decoration1 class="board-decoration" :color="['#9400D3', '#9400D3']" />
              <div>报警排名</div>
              <dv-decoration1 class="board-decoration reverse" :color="['#9400D3', '#9400D3']" />
            </div>
            <TitleDecoration />
          </div>
          <div class="board-right-center-height">
            <RightCenter />
          </div>
        </div>
      </div>
    </div>

    <div class="board-content_bottom">
      <div class="board-decoration-bottom">
        <dv-decoration10 class="board-decoration10" :color="['#9370DB', '#D8BFD8']"/>
      </div>
      <div class="board-decoration-side">
        <dv-decoration3 class="board-decoration3" :color="['#9370DB', '#D8BFD8']"/>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import LeftTop from "./left-top.vue";
import LeftCenter from "./left-center.vue";
import LeftBottom from "./left-bottom.vue";
import CenterMap from "./center-map.vue";
import CenterBottom from "./center-bottom.vue";
import RightCenter from "./right-center.vue";
import { Decoration10 as DvDecoration10 } from '@kjgl77/datav-vue3';
import { Decoration3 as DvDecoration3 } from '@kjgl77/datav-vue3';
import { Decoration1 as DvDecoration1 } from '@kjgl77/datav-vue3';
import TitleDecoration from "./title-decoration.vue";
</script>

<style scoped lang="scss">
$color-main: #9400D3;
$color-secondary: #9370DB;
$color-light: #D8BFD8;
$font-weight-bold: 900;

@mixin decoration($width, $height) {
  width: $width;
  height: $height;
}

.board-card-container,
.board-singcard {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 30px;
  box-shadow: 2px 6px 8px 3px rgba(0, 0, 0, 0.15);
}

.board-card-container {
  height: 305px;
  margin-bottom: 25px;
}

.board-singcard {
  height: 630px;
}

.board-index-box {
  width: 100%;
  display: flex;
  min-height: calc(100% - 64px);
  justify-content: space-between;
  padding-bottom: 5px;
}

.board-contetn_left,
.board-contetn_right {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 540px;
  box-sizing: border-box;
  flex-shrink: 0;
}

.board-contetn_center {
  flex: 1;
  margin: 0 54px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.board-content_bottom {
  position: absolute;
  bottom: -30px;
  display: flex;
  height: 60px;
  width: 100%;
}

.board-title {
  padding: 5px 0 0 0;
  position: relative;
  top: 0;
  left: 11%;
  transform: translateY(-25%);
  height: 60px;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.board-title-text {
  display: flex;
  position: absolute;
  z-index: 1;
  font-size: 24px;
  font-weight: $font-weight-bold;
  color: #920783;
}

.board-title svg {
  width: 100%;
  height: 100%;
  z-index: 0;
}

.board-decoration {
  @include decoration(120px, 40px);
  color: $color-main;
}

.large {
  width: 180px;
}

.reverse {
  transform: scaleX(-1);
}

.board-top-margin-zero {
  margin-top: 0px;
}

.board-left-bottom {
  height: 240px !important;
  overflow: hidden !important;
}

.board-map-margin-bottom {
  margin-bottom: 20px;
}

.board-right-center-height {
  height: 700px;
}

.board-decoration-bottom {
  flex: 9;
}

.board-decoration-side {
  flex: 1;
  padding: 5px;
}

.board-decoration10 {
  width: 100%;
  height: 50px;
  color: $color-secondary, $color-light;
}

.board-decoration3 {
  width: 250px;
  height: 30px;
  color: $color-secondary, $color-light;
}
</style>
