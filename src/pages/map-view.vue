<template>
  <MapboxMap ref="mapBox" style="height: 100vh" @click="inputBlur"
    access-token="pk.eyJ1IjoidHpxMTAzMiIsImEiOiJjbHUyZWxuYTUwMWlrMndsM3VxaHJpcmd6In0.qE_R5khyiy6PYCjUuTkywQ"
    :center="mapCenter" @mb-created="onMapCreated">
  </MapboxMap>

  <div v-for="(item, index) in items" :key="index" class="markerInfo" ref="markerDivArray">
    <p>双击进入{{ item.title }}</p>
    <img :src="item.img" alt="图片">
  </div>

  <div class="floating-search">
    <v-text-field solo hide-details label="目的地" prepend-inner-icon="mdi-magnify" @focus="displayList" close-on-blur
      v-model.trim="keyWord" class="input-search" autocomplete="off" ref="search">
    </v-text-field>
    <v-list v-show="filterItems.length > 0 && showList" class="border-list">
      <v-list-item v-for="(item, index) in filterItems" :key="index" @click="itemClick(item)">
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <v-list-item-title-subtitle>经度：{{ item.LngLat[0] }}，纬度{{ item.LngLat[1] }}</v-list-item-title-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
  <div class="floating-button"> <!-- 悬浮按钮容器 -->
    <v-btn color="primary" @click="goBack(mapCenter)">Go Back to center</v-btn>
  </div>
</template>


<script setup lang="ts">
import { MapboxMap } from '@studiometa/vue-mapbox-gl';
import { ref, computed } from 'vue'
import MapScene from '@/units/map/index'

const markerDivArray = ref([]);
const items = ref([
  {
    title: "中国科学院自动化研究所", LngLat: [116.3262, 39.978041], img: "/img/CASIA.jpg"
  },
  {
    title: "A", LngLat: [114.3262, 39.978041], img: "/img/CASIA.jpg"
  },
  {
    title: "B", LngLat: [118.3262, 39.978041], img: "/img/CASIA.jpg"
  },
  {
    title: "C", LngLat: [116.3262, 37.978041], img: "/img/CASIA.jpg"
  },
  {
    title: "D", LngLat: [116.3262, 41.978041], img: "/img/CASIA.jpg"
  },
]);

let keyWord = ref('')
let search = ref('')
let mapBox = ref()
const mapCenter = ref<[number, number]>([116.3262, 39.978041]);
const map = ref();

const filterItems = computed(() => {
  if (keyWord.value.trim() === '') {
    return [];
  } else {
    return items.value.filter(item => item.title.includes(keyWord.value));
  }
});
let showList = ref<boolean>(true)
console.log(keyWord)
const inputBlur = () => {
  keyWord.value = ''
}
const displayList = () => {
  showList.value = true
}

let flyToDist = (LngLat: [number, number], zoom?: number) => {
  mapBox.value.map.flyTo({
    center: LngLat,
    zoom: zoom ? zoom : 7,
    Pitch: 62,
    bearing: -20
  })
}
const itemClick = (item: any) => {
  showList.value = true
  flyToDist(item.LngLat, 17)
  keyWord.value = ''


}
const goBack = (center: [number, number]) => {
  flyToDist(center)
}
const onMapCreated = (mapInstance: any) => {
  map.value = mapInstance;
  let mapScene = new MapScene(map.value, items.value)
  mapScene.goToDist()
  mapScene.addMarkerInfo(markerDivArray.value)
  mapScene.toPlatformPage()
  flyToDist(mapCenter.value)
};
</script>
<style scoped>
.markerInfo {
  position: absolute;
  background-color: #fff;
  padding: 10px;
  border: 1px solid #ccc;
  display: none;
  width: auto;
  height: 200px;
}

.markerInfo img {
  display: block;
  margin: 0 auto;
  width: 200px;
  /* 设置图片宽度为父div的100% */
  height: auto;
}

.floating-search {
  position: absolute;
  width: 300px;
  top: 20px;
  left: 20px;
  z-index: 1000;
  /* display: flex; */
  /* 确保输入框在地图上方 */
}

.floating-button {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000;
  /* 确保按钮在地图上方 */
}

.input-search {
  width: 100%;
  margin: auto;
  top: 20px;
  left: 20px;
  z-index: 1000;
}

.width-20-percent {
  width: 20%;
}

.img-div {
  margin: 16vh 0 40px 0;
  text-align: center;
}

.v-menu__content {
  box-shadow: none !important;
}

.border-list {
  border: 1px solid #eee !important;

  width: 300px;
  height: auto;
}

.list-content {
  /* display: flex; */
  /* justify-content: center; */
  align-items: center;

}

.list-item-btn {
  position: absolute;
  right: 0px;
  width: 10px;
  text-align: center;
  text-size-adjust: 10px;
}
</style>