<template>
  <MapboxMap style="height: 100vh"
    access-token="pk.eyJ1IjoidHpxMTAzMiIsImEiOiJjbHUyZWxuYTUwMWlrMndsM3VxaHJpcmd6In0.qE_R5khyiy6PYCjUuTkywQ"
    :center="mapCenter" @mb-created="onMapCreated">
  </MapboxMap>
  <div ref="markerInfo" id="markerInfo">
    <p>点击进入中科院自动化研究所</p>
    <img src="/img/CASIA.jpg" alt="图片">
  </div>
</template>
<script setup lang="ts">
import { MapboxMap } from '@studiometa/vue-mapbox-gl';

import { ref, } from 'vue'
// import { useRouter } from 'vue-router';
import MapScene from '@/units/map/index'
// let router = useRouter();

const mapCenter = ref<number[]>([116.3262, 39.978041]);
const map = ref();
const markerInfo = ref()

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
</style>