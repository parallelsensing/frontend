<script setup lang="ts">
import BorderBox13 from "@/components/datav/border-box-13";
import { BorderBox8 as DvBorderBox8 } from '@kjgl77/datav-vue3';
import { Decoration1 as DvDecoration1 } from '@kjgl77/datav-vue3';

const props = withDefaults(
  defineProps<{
    // 标题
    title: number | string;
  }>(),
  {
    title: "",
  }
);
</script>

<template>
  <dv-border-box8 :color="['#920783', '	#A020F0']">
    <div class="item_title" v-if="title !== ''">
      <!-- <div class="zuo"></div> -->
      <dv-decoration1 style="width:100px;height:30px;" :color="['#A020F0', '#D8BFD8']" />
      <span class="title-inner"> &nbsp;&nbsp;{{ title }}&nbsp;&nbsp; </span>
      <dv-decoration1 style="width:100px;height:30px;" :color="['#A020F0', '#D8BFD8']" />
      <!-- <div class="you"></div> -->
    </div>
    <div :class="title !== '' ? 'item_title_content' : 'item_title_content_def'">
      <slot></slot>
    </div>
  </dv-border-box8>
</template>

<style scoped lang="scss">
$item-title-height: 38px;
$item_title_content-height: calc(100% - 38px);

.item_title {
  height: $item-title-height;
  line-height: $item-title-height;
  width: 100%;
  color: #31abe3;
  text-align: center;
  // background: linear-gradient(to right, transparent, #0f0756, transparent);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .zuo,
  .you {
    width: 58px;
    height: 14px;
    background-image: url("@/assets/img/titles/zuo.png");
  }

  .you {
    transform: rotate(180deg);
  }

  .title-inner {
    font-weight: 900;
    font-family: '黑体';
    font-size: larger;
    letter-spacing: 2px;
    background: linear-gradient(92deg,
        #9333ed 0%,
        #920783 48.8525390625%,
        #9333ed 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

:deep(.dv-border-box-content) {
  box-sizing: border-box;
  padding: 6px 16px 0px;
}

.item_title_content {
  height: $item_title_content-height;
}

.item_title_content_def {
  width: 100%;
  height: 100%;
}
</style>
