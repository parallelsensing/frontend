<template>
      <div ref="mapContainer" class="map-container"></div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import mapboxgl from 'mapbox-gl';

let router = useRouter();
const mapContainer = ref<HTMLDivElement | null>(null);
const bbox = [[116.33, 39.97], [116.34, 39.98]];
onMounted(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.value,
      center: [116.332403, 39.979241],
      zoom: 15.1, // starting zoom
      pitch: 62, // starting pitch
      bearing: -20, // starting bearing
      accessToken: import.meta.env.VITE_APP_MAPBOX_TOKEN
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