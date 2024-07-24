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
import { ref, onMounted, watch } from 'vue';
import * as ROS3D from 'ros3d';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

import { AxesHelper, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const pointCloudContainer = ref<HTMLDivElement>();
const pointCloudData = ref<any>(null);
const isConnected = ref(false);
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let controls: OrbitControls;
interface Point {
  x: number;
  y: number;
  z: number;
  intensity: number;
}

// 响应式变量保存解析后的点
const points = ref<Point[]>([]);
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

  ros.connect('ws://10.11.37.193:9090');
}
function closeSocket() {
  ros.close();
}

const subscribe = () => {
  if (isConnected.value) {
    listener.subscribe((message: any) => {
      pointCloudData.value = message.data;
      // console.log(message);
      const data = new Uint8Array(message.data);
      parseData(data)
    });
  }
  console.log('订阅成功');
}

const init = () => {
  if (!pointCloudContainer.value) return;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000000000);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  pointCloudContainer.value.appendChild(renderer.domElement);
  // camera.lookAt(new Vector3(500, 0, 10));
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 5, 50);
  scene.add(light);
  const Axes = new AxesHelper(50);
  scene.add(Axes);
  controls = new OrbitControls(camera, renderer.domElement);
  controls.update();
  camera.position.z = 30;
  camera.position.y = 0;
  camera.position.x = 0;

  const loader = new GLTFLoader();
  loader.load('/行政楼03.gltf', (gltf) => {
    // gltf.scene.position.set(-150, -100, -2);
    // gltf.scene.rotation.y = Math.PI / 4;
    // gltf.scene.scale.set(8, 8, 8);
    gltf.scene.rotation.x = Math.PI / 2;

    scene.add(gltf.scene);
  });

  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);

  };

  animate();
}

const parseData = (data: Uint8Array) => {

  const pointStep = 32; // 每个点的字节数
  const offsetX = 0;    // x 坐标的偏移量
  const offsetY = 4;    // y 坐标的偏移量
  const offsetZ = 8;    // z 坐标的偏移量
  const offsetIntensity = 16; // 强度的偏移量
  const totalPoints = data.length / pointStep; // 点的总数量

  for (let i = 0; i < totalPoints - 1; i++) {
    const baseIndex = i * pointStep;

    const x = new DataView(data.buffer).getFloat32(baseIndex + offsetY, true);
    const y = new DataView(data.buffer).getFloat32(baseIndex + offsetX, true);
    const z = new DataView(data.buffer).getFloat32(baseIndex + offsetZ, true);
    const intensity = new DataView(data.buffer).getFloat32(baseIndex + offsetIntensity, true);

    points.value.push({ x, y, z, intensity });
  }
};

watch(
  () => pointCloudData.value,
  (newval: any) => {
    // points.value = []
    if (scene.children.length > 3) {
      scene.remove(scene.children[3]);
    }

    const geometry = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const colors: number[] = [];

    points.value.forEach((point: any) => {
      vertices.push(point.x, point.y, point.z);
      const color = new THREE.Color(`hsl(${point.intensity}, 100%, 50%)`);//生成一个 HSL 颜色，然后将其转换为 RGB 颜色
      colors.push(color.r, color.g, color.b);
    });

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({ size: 0.0001, vertexColors: true });
    const pointCloud = new THREE.Points(geometry, material);

    points.value = [];
    scene.add(pointCloud);
  }
);


onMounted(() => {
  init()

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
    // rootObject: viewer.scene,
    topic: '/livox/lidar',
    material: { size: 0.25, color: 0xffffff },
    max_pts: 50000000,
  });
})


</script>
