<template>
  <MapboxMap style="height: 100vh"
    access-token="pk.eyJ1IjoidHpxMTAzMiIsImEiOiJjbHUyZWxuYTUwMWlrMndsM3VxaHJpcmd6In0.qE_R5khyiy6PYCjUuTkywQ"
    :center="mapCenter" :zoom="5" :pitch="62" :bearing="-20" @mb-created="onMapCreated">
    <!-- <MapboxMarker :lng-lat="mapCenter" @click="TOPlatform" /> -->
  </MapboxMap>
  <div ref="markerInfo" id="markerInfo">
    <p>点击进入中科院自动化研究所</p>
    <img src="/img/CASIA.jpg" alt="图片">
  </div>
</template>
<script setup lang="ts">
import { MapboxMap } from '@studiometa/vue-mapbox-gl';
import mapboxgl from 'mapbox-gl';



import { ref, } from 'vue'
import { useRouter } from 'vue-router';
let router = useRouter();

const mapCenter = ref<number[]>([116.3262, 39.978041]);
const map = ref();
const markerInfo = ref()
const marker = new mapboxgl.Marker()
const onMapCreated = (mapInstance:any) => {
  // Store the map instance for later use if needed
  map.value = mapInstance;
  console.log(map.value);
  
  map.value.on("load", function () {
    map.value.flyTo({
      center: [116.3262, 39.978041],
      zoom: 17.1, // starting zoom
      pitch: 62, // starting pitch
      bearing: -20, // starting bearing
      speed: 1.5, // 动画速度
      curve: 1, // 动画曲线
      // easing:
    });
  });

  marker.setLngLat([116.3262, 39.978041]) // Set marker position
    .addTo(mapInstance);
  marker.getElement().addEventListener("click", function () {
    router.push('/platform')
  });
  marker.getElement().addEventListener("mouseover", function (e) {
    markerInfo.value.style.display = "block";
    markerInfo.value.style.left = e.pageX + 10 + "px"; // 位置调整
    markerInfo.value.style.top = e.pageY + 10 + "px"; // 位置调整
    map.value.getCanvas().style.cursor = 'pointer';
  });
  marker.getElement().addEventListener("mouseout", function () {
    markerInfo.value.style.display = "none";
    map.value.getCanvas().style.cursor = '';
  });

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
    width: 200px; /* 设置图片宽度为父div的100% */
    height: auto;
  }
</style>