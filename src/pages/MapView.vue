<template>
      <div ref="mapContainer" class="map-container" id="map"></div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import mapboxgl from 'mapbox-gl';

let router = useRouter();
const mapContainer = ref();
const bbox = [[116.33, 39.97], [116.34, 39.98]];
onMounted(() => {
  mapContainer.value = document.getElementById('map');
    const map = new mapboxgl.Map({
      container: 'map',
      center: [116.332403, 39.979241],
      zoom: 15.1, // starting zoom
      pitch: 62, // starting pitch
      bearing: -20, // starting bearing
      accessToken: "pk.eyJ1IjoidHpxMTAzMiIsImEiOiJjbHUyZWxuYTUwMWlrMndsM3VxaHJpcmd6In0.qE_R5khyiy6PYCjUuTkywQ"
    });
    console.log(map);
    
    map.on("click", function (e:any) { // Example bounding box
      if (e.lngLat.lng >= bbox[0][0] && 
          e.lngLat.lng <= bbox[1][0] && 
          e.lngLat.lat >= bbox[0][1] && 
          e.lngLat.lat <= bbox[1][1]) {
            router.push('/platform')
      } 
    });
});
</script>
<style>
.map-container {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
}
</style>