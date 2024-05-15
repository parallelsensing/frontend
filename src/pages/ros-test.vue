<template>
  <!-- <div> -->
    <!-- <v-card>
      <v-card-title>ros 3d</v-card-title>
      <v-card-actions>
        <div v-if="isConnected">
          <v-btn @click="subscribe">订阅</v-btn><v-btn color="error" @click="closeSocket">关闭</v-btn>
        </div>
        <div v-else><v-btn color="primary" @click="connectSocket">连接</v-btn></div>
      </v-card-actions>
      <v-card-text> -->
        <div id="viewer" ref="viewer">显示点云的内容</div>
      <!-- </v-card-text>
    </v-card>
  </div> -->
</template>
<script lang="ts" setup>
import { Ros, Topic, TFClient } from 'roslib';
import {  onMounted } from 'vue';
import {Viewer,PointCloud2} from '@/utils/ros/ros3d.esm.js'
import { drawDemo } from '@/utils/ros/tool';

// const isConnected = ref(false);

onMounted(() => {
  const ros = new Ros({
    url: 'ws://192.168.3.5:9090'
  });

  ros.on('connection', function () {
    console.log('Connected to websocket server.');
    // drawDemo(imClient, viewer);
    drawDemo(imClient);
    console.log(123);
  });
  ros.on('error', function (error) {

    console.error('Error connecting to websocket server: ', error);
    // drawDemo(imClient, viewer);
  });
  ros.on('close', function () {
    console.warn('Connection to websocket server closed.');
  });
  const listener = new Topic({
    ros: ros,
    name: "/livox/lidar",
    messageType: "sensor_msgs/PointCloud2",
  });
  listener.subscribe((message) => {
    console.log(
      "Received message on " + listener.name + ": " + message
    );
    console.log(viewer);
  });
  const viewer = new Viewer({
    divID: 'viewer',
    width: window.innerWidth/2,
    height: window.innerHeight/2,
    antialias: true,
    background: '#ffffff',
    cameraZoomSpeed: 5,//缩放速度
    alpha: 0.1, //背景色透明度
    cameraPose: {  //相机初始视角，值越大，总览范围越大
      x: -60,
      y: 40,
      z: 20,
    },
    displayPanAndZoomFrame: true, //是否显示坐标轴，默认true
    // near:5,//相机远近层级的倍数，超过范围则不绘制
    // far:100,
    cameraHelper: {},

  });
  console.log(viewer);
  const tfClient = new TFClient({
    ros: ros,
    angularThres: 0.01,
    transThres: 0.01,
    rate: 10.0,
    fixedFrame: '/world'
  });
  const imClient = new PointCloud2({
    ros: ros,
    tfClient: tfClient,
    rootObject: viewer.scene,
    topic: '/livox/lidar',
    throttle_rate: 0,
    material: { size: 1 },
    compression: 'cbor', //压缩放肆，默认cbor
    max_pts: 5000000,  //最大绘制点数，生效
    // colorsrc: 'rgb'
  });
})
</script>

<style scope>
#viewer{
  position: absolute;
  left: 500px;
  top: 200px;
}
</style>