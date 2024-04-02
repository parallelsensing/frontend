<template>
  <MapboxMap style="height: 100vh"
    access-token="pk.eyJ1IjoidHpxMTAzMiIsImEiOiJjbHUyZWxuYTUwMWlrMndsM3VxaHJpcmd6In0.qE_R5khyiy6PYCjUuTkywQ"
    :center="mapCenter" @mb-created="onMapCreated">
  </MapboxMap>
  <div ref="markerInfo" id="markerInfo">
    <p>点击进入中科院自动化研究所</p>
    <img src="/img/CASIA.jpg" alt="图片">
  </div>
  <div class="floating-input"> <!-- 悬浮输入框容器 -->
      <v-text-field v-model="inputText" label="目的地" outlined></v-text-field>
    </div>
    <div class="floating-button"> <!-- 悬浮按钮容器 -->
      <v-btn color="primary" @click="goBack">Go Back to CASIA</v-btn>
    </div>
</template>
<script setup lang="ts">
import { MapboxMap } from '@studiometa/vue-mapbox-gl';
import { ref } from 'vue'
import MapScene from '@/units/map/index'

const inputText = ref<string>()
const mapCenter = ref<[number,number]>([116.3262, 39.978041]);
const map = ref();
const markerInfo = ref()
const goBack = ()=>{
  console.log(mapCenter);
}

const onMapCreated = (mapInstance: any) => {
  // Store the map instance for later use if needed
  map.value = mapInstance;
  let mapScene = new MapScene(map.value)
  mapScene.flyTo()
  mapScene.addMarkerInfo(markerInfo.value)
  mapScene.toPlatformPage()
};

</script>
<style scoped>
#markerInfo {
  position: absolute;
  background-color: #fff;
  padding: 10px;
  border: 1px solid #ccc;
  display: none;
  width: auto;
  height: 200px;
}

#markerInfo img {
  display: block;
  margin: 0 auto;
  width: 200px;
  /* 设置图片宽度为父div的100% */
  height: auto;
}
.floating-input {
  position: absolute;
  width: 300px;
  top: 20px;
  left: 20px;
  z-index: 1000; /* 确保输入框在地图上方 */
}
.floating-button {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000; /* 确保按钮在地图上方 */
}
</style>