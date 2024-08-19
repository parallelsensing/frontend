<script setup lang="ts">
import { ref, reactive } from "vue";
import { graphic } from "echarts/core";
import { countUserNum } from "@/api";
import {ElMessage} from "element-plus"

let colors = ["#A020F0", "#A020F0", "#A020F0", "#A020F0"];
const option = ref({});
const state = reactive({
  lockNum: 0,
  offlineNum: 0,
  onlineNum: 0,
  alarmNum: 0,
  totalNum: 0,
});
const echartsGraphic = (colors: string[]) => {
  return new graphic.LinearGradient(1, 0, 0, 0, [
    { offset: 0, color: colors[0] },
    { offset: 1, color: colors[1] },
  ]);
};
const getData = () => {
  countUserNum().then((res) => {
    if (res.success) {
      state.lockNum = res.data.lockNum;
      state.offlineNum = res.data.offlineNum;
      state.onlineNum = res.data.onlineNum;
      state.totalNum = res.data.totalNum;
      state.alarmNum = res.data.alarmNum;
      setOption();
    }else{
      ElMessage.error(res.msg)
    }
  }).catch(err=>{
    ElMessage.error(err)
  });
};
getData();
const setOption = () => {
  option.value = {
    title: {
      top: "center",
      left: "center",
      text: [`{value|${state.totalNum}}`, "{name|总数}"].join("\n"),
      textStyle: {
        rich: {
          value: {
            color: "#A020F0",
            fontSize: 24,
            fontWeight: "bold",
            lineHeight: 20,
            padding:[4,0,4,0]
          },
          name: {
            color: "#A020F0",
            lineHeight: 20,
          },
        },
      },
    },
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(0,0,0,.6)",
      borderColor: "rgba(147, 235, 248, .8)",
      textStyle: {
        color: "#FFF",
      },
    },
    series: [
      {
        name: "用户总览",
        type: "pie",
        radius: ["40%", "70%"],
        // avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 6,
          borderColor: "rgba(255,255,255,0)",
          borderWidth: 2,
        },
        color: colors,
        label: {
          show: true,
          formatter: "   {b|{b}}   \n   {c|{c}个}   {per|{d}%}  ",
          //   position: "outside",
          rich: {
            b: {
              color: "#fff",
              fontSize: 12,
              lineHeight: 26,
            },
            c: {
              color: "#A020F0",
              fontSize: 14,
            },
            per: {
              color: "#A020F0",
              fontSize: 14,
            },
          },
        },
        emphasis: {
          show: false,
        },
        legend: {
          show: false,
        },
        tooltip: { show: true },

        labelLine: {
          show: true,
          length: 10, // 第一段线 长度
          length2: 36, // 第二段线 长度
          smooth: 0.2,
          lineStyle: {},
        },
        data: [
          {
            value: state.onlineNum,
            name: "在线",
            itemStyle: {
              color: echartsGraphic(["#7B68EE", "#D8BFD8"]),
            },
          },
          {
            value: state.offlineNum,
            name: "离线",
            itemStyle: {
              color: echartsGraphic(["#6A5ACD", "#D8BFD8"]),
            },
          },
          {
            value: state.lockNum,
            name: "锁定",
            itemStyle: {
              color: echartsGraphic(["#A020F0", "#D8BFD8"]),
            },
          },
          {
            value: state.alarmNum,
            name: "异常",
            itemStyle: {
              color: echartsGraphic(["#8A2BE2", "#D8BFD8"]),
            },
          },
        ],
      },
    ],
  };
};
</script>

<template>
  <v-chart class="chart" :option="option" />
</template>

<style scoped lang="scss">
.chart {
  height: 70%;
}
</style>
