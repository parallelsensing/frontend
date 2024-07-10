<template>
  <input type="file" @change="handleFileChange" />
  <div ref="threeContainer" style="width: 100%; height: 100vh;"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
interface Point {
  x: number;
  y: number;
  z: number;
  intensity: number;
}

// 响应式变量保存解析后的点
const points = ref<Point[]>([]);

const threeContainer = ref<HTMLDivElement | null>(null);
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let controls: OrbitControls;

const handleFileChange = async (event: Event) => {
  const input = event.target as HTMLInputElement;

  if (input.files && input.files.length > 0) {
    const file = input.files[0];

    const reader = new FileReader();

    reader.onload = function (event) {
      const content = event.target!.result as string; // 读取到的文件内容，类型为string
      console.log(content); // 可以在控制台打印文件内容
      // 假设文件内容是用逗号分隔的数字字符串
      const numbersStringArray = content.split(',').map(numStr => numStr.trim());
      const numbersArray = numbersStringArray.map(numStr => parseInt(numStr, 10));

      const data = new Uint8Array(numbersArray);
      console.log(data);

      // 在这里调用处理数据的函数，例如解析数据和创建点云等
      parseData(data);
      createPointCloud(points.value); // 假设这个函数用于创建点云
     
      
    };

    reader.readAsText(file); // 以文本格式读取文件
  }
};

const parseData = (data: Uint8Array) => {
  const pointStep = 32; // 每个点的字节数
  const offsetX = 0;    // x 坐标的偏移量
  const offsetY = 4;    // y 坐标的偏移量
  const offsetZ = 8;    // z 坐标的偏移量
  const offsetIntensity = 16; // 强度的偏移量
  const totalPoints = data.length / pointStep; // 点的总数量
  console.log(totalPoints);

  for (let i = 0; i < totalPoints - 1; i++) {
    const baseIndex = i * pointStep;

    const x = new DataView(data.buffer).getFloat32(baseIndex + offsetX, true);
    const y = new DataView(data.buffer).getFloat32(baseIndex + offsetY, true);
    const z = new DataView(data.buffer).getFloat32(baseIndex + offsetZ, true);
    const intensity = new DataView(data.buffer).getFloat32(baseIndex + offsetIntensity, true);

    points.value.push({ x, y, z, intensity });
  }
};

const createPointCloud = (points: { x: number, y: number, z: number, intensity: number }[]) => {
  if (!threeContainer.value) return;

  const scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 100000);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  threeContainer.value.appendChild(renderer.domElement);

  const geometry = new THREE.BufferGeometry();
  const vertices: number[] = [];
  const colors: number[] = [];

  points.forEach(point => {
    vertices.push(point.x, point.y, point.z);
    const color = new THREE.Color(`hsl(${point.intensity}, 100%, 50%)`);
    colors.push(color.r, color.g, color.b);
  });

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({ size: 0.0001, vertexColors: true });
  const pointCloud = new THREE.Points(geometry, material);
  scene.add(pointCloud);
  console.log(scene);
  camera.position.z = 5;

  controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };

  animate();
};

const onWindowResize = () => {
  if (!threeContainer.value) return;
  const width = threeContainer.value.clientWidth;
  const height = threeContainer.value.clientHeight;
  const aspect = width / height;
  camera.aspect = aspect;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
};

onMounted(() => {
  window.addEventListener('resize', onWindowResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', onWindowResize);
});
</script>

<style>
html,
body {
  margin: 0;
  overflow: hidden;
}
</style>
