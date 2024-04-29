<template>
  <div>
    <v-card>
      <v-card-title>ros 3d</v-card-title>
      <v-card-text>
        <div></div>
      </v-card-text>
      <v-card-actions>
        <div v-if="isConnected">
          <v-btn @click="subscribe">订阅</v-btn
          ><v-btn color="error" @click="closeSocket">关闭</v-btn>
        </div>
        <div v-else><v-btn color="primary" @click="connectSocket">连接</v-btn></div>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script setup lang="ts">
import { Ros, Topic } from 'roslib';
import { ref } from 'vue';

const isConnected = ref(false);

const ros = new Ros({});
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
  // ros.connect('ws://127.0.0.1:9090');
  ros.connect('ws://192.168.3.5:9090');
}
function closeSocket() {
  ros.close();
}
function subscribe() {
  listener.subscribe(function (message: any) {
    console.log('message');
    console.log('Received message on ' + listener.name + ': ' + message.data);
  });
  console.log('订阅成功');
}
</script>
