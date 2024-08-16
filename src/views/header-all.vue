<template>
  <div class="cont">
    <div class="zuojuxing">
      <img src="@/assets/img/headers/juxing1.png" alt="左边形状" />
      <div class="decoration">
        <dv-decoration3 :color="['#9370DB', '#D8BFD8']" />
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="18 -2 460 56" preserveAspectRatio="none">
        <defs>
          <filter id="shadow" x="-10%" y="-50%" width="260%" height="200%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#000000" flood-opacity="0.3" />
          </filter>
        </defs>
        <path
          d="M 467.961 31.795 Q 476.069 45.32 460.134 45.002 L 28.631 44 Q 24.684 44.108 22.089 42.426 Q 20.021 40.564 20.02 36.706 L 20 4 Q 20 3 21.375 1 Q 22.375 0 25.375 -1 L 441.375 0 Q 453.278 0.346 458.304 12.369 Z"
          fill="#ffffff" filter="url(#shadow)" />
      </svg>
    </div>

    <div class="title">
      <div class="title-text">中国科学院自动化研究所</div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -1 493 56" preserveAspectRatio="none">
        <defs>
          <filter id="shadow1" x="-20%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#000000" flood-opacity="0.3" />
          </filter>
        </defs>
        <path
          d="M 3.2798 2.2847 Q 1.34 5.0694 2.5161 8.2527 L 17.815 35.592 Q 20.273 39.944 23.558 42.641 Q 26.088 45.245 33.001 45 L 455.068 45.052 Q 463.293 45.23 465.762 41.81 Q 468.811 38.178 469.914 35.252 L 484.484 8.2527 Q 485.66 5.0693 483.72 2.2847 Q 481.78 -0.5 478.387 -0.5 L 8.6133 -0.5 Q 5.2196 -0.5 3.2798 2.2847 Z"
          fill="#ffffff" filter="url(#shadow1)" />
      </svg>
    </div>

    <div class="youjuxing">
      <img src="@/assets/img/headers/juxing1.png" alt="右边形状" style="right: 30%;" />
      <div class="decoration" style="right:0;">
        <dv-decoration3 :color="['#9370DB', '#D8BFD8']" />
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="18 -2 460 56" preserveAspectRatio="none">
        <defs>
          <filter id="shadow0" x="-10%" y="-50%" width="260%" height="200%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#000000" flood-opacity="0.3" />
          </filter>
        </defs>
        <path
          d="M 28.108 31.795 Q 19.999 45.32 35.935 45.002 L 467.438 44 Q 471.385 44.108 473.98 42.426 Q 476.048 40.564 476.049 36.706 L 476.069 4 Q 476.069 3 474.694 1 Q 473.694 0 470.694 -1 L 54.694 0 Q 42.791 0.346 37.765 12.369 Z"
          fill="#ffffff" filter="url(#shadow0)" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Decoration3 as DvDecoration3 } from '@kjgl77/datav-vue3';

</script>

<style scoped lang="scss">
.cont {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 7vh;
  box-sizing: border-box;
}

.zuojuxing,
.youjuxing {
  position: relative;
  width: 32%;
  height: auto;
  display: flex;
  align-items: center;
}

.zuojuxing img,
.youjuxing img {
  position: absolute;
  width: 40%;
  height: 5px;
  z-index: 1;
  top: 0px;
  left: 30%;
  filter: hue-rotate(400deg) saturate(2);
}

.decoration {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 10vw;
  height: 3vh;
}

.title {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 36%;
  text-align: center;
}

.title-text {
  position: absolute;
  z-index: 1;
  font-size: 1.8vw;
  font-weight: 900;
  color: #920783;
  width: 100%;
}

.title svg {
  position: absolute;
  z-index: 0;
  width: 100%;
  height: auto;
}

</style>