<template>
  <div>
    <v-card>
      <v-card-title>ros 3d</v-card-title>
      <v-card-actions>
        <div v-if="isConnected">
          <v-btn @click="subscribe">订阅</v-btn><v-btn color="error" @click="closeSocket">关闭</v-btn>
        </div>
        <div v-else><v-btn color="primary" @click="connectSocket">连接</v-btn></div>
      </v-card-actions>
      <v-card-text>
        <div id="pointCloudContainer" ref="pointCloudContainer">显示点云的内容</div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup lang="ts">
import { Ros, Topic, TFClient } from 'roslib';
import { ref, onMounted } from 'vue';
import * as ROS3D from 'ros3d';
import {Points,PointsMaterial } from 'three';
import { triggerRef } from 'vue';
const pointCloudData = ref<any>(null);
const isConnected = ref(false);

const ros = new Ros({});

// 订阅点云主题
const listener = new Topic({
  ros,
  name: '/livox/lidar',
  messageType: 'sensor_msgs/PointCloud2'
});

ros.on('connection', function () {
  console.log('Connected to websocket server.');
  isConnected.value = true;
});
ros.on('error', function (error) {
  console.log('Error connecting to websocket server: ', error);
});
ros.on('close', function () {
  console.log('Connection to websocket server closed.');
  isConnected.value = false;
});


function connectSocket() {

  ros.connect('ws://192.168.3.5:9090');
}
function closeSocket() {
  ros.close();
}
const subscribe = () => {
  if (isConnected.value) {
    listener.subscribe((message: PointCloud2) => {
      pointCloudData.value = message;
      console.log('Received message on ' + listener.name + ': ' + message.data);
      // 手动触发 pointCloudData 的响应式更新
      triggerRef(pointCloudData);
    });

  }

  console.log('订阅成功');
}

onMounted(() => {
  const viewer = new ROS3D.Viewer({
    divID: "pointCloudContainer",
    width: window.innerWidth,
    height: window.innerHeight,
    antialias: true
  })
  if(pointCloudData.value){
    const pointCloud = new Points(pointCloudData.value, new PointsMaterial({ color: 0xff0000 }));
    viewer.scene.add(pointCloud)
    console.log(pointCloud);
  }else{
    console.log("空");
    
  }




  var grid = new ROS3D.Grid({
    // ros : ros,
    cellSize: 0.5, //每个网格单元的尺寸
    color: '#ffffff',
    lineWidth: 2,//this.lineWidth
    num_cells: 20, //网格单元的数量

  });
  viewer.scene.add(grid)


  const tfClient = new TFClient({
    ros: ros,
    angularThres: 0.01,
    transThres: 0.01,
    rate: 10.0,
    fixedFrame: '/base_link'
  });

 
  const pointcloud = new ROS3D.PointCloud2({
    tfClient: tfClient,
    ros: ros,
    rootObject: viewer.scene,
    topic: '/livox/lidar',
    material: { size: 0.25, color: 0xffffff },
    max_pts: 50000000,

  });
  console.log(pointcloud);

  console.log(viewer);

})


</script>
