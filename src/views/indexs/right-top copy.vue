
<template>
  <div>
    <!-- <div v-show="realtimeShow" @click="raycast" ref="bigScene"></div>
    <div v-show="!realtimeShow" >点击传感器获取点云实时场景</div> -->

    <div  @click="raycast" ref="bigScene"></div>
    <!-- <div  >点击传感器获取点云实时场景</div> -->
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { PCDLoader } from 'three/examples/jsm/Addons.js';
export default {
  data() {
    return {
      maptitle: "实时点云",
      scene: new THREE.Scene(),
      camera: new THREE.PerspectiveCamera(75, 510/ 245, 0.001, 10000),
      boxgeo: new THREE.BoxGeometry(1, 1, 1),
      boxmat: new THREE.MeshBasicMaterial({
        color: 0xff0000,
        side: THREE.DoubleSide
      }),
      axeshelper: new THREE.AxesHelper(50),
      sun: new THREE.DirectionalLight(0xffffff, 0.8),
      ambient: new THREE.AmbientLight(0XFFFFFF, 0.0),
      renderer: new THREE.WebGLRenderer({ antialias: true }),
      raycaster: new THREE.Raycaster(),
      textureCubeLoader: new THREE.CubeTextureLoader,
      canvasWidth: 0,
      canvasHeight: 0,
    };
  },
  computed: {
    // realtimeShow() {
    //   // return this.$store.state.realtimeshow;
    // }
  },
  methods: {
    initModel() {
      this.box = new THREE.Mesh(this.boxgeo, this.boxmat)
      this.box.useType = "传感器"
      this.scene.add(this.axeshelper, this.sun, this.ambient, this.box);
      this.box.position.set(20, 10, 10)
      this.textureCubeLoader = new THREE.CubeTextureLoader().setPath('./texture')
      this.textureCube = this.textureCubeLoader.load([
        "1.jpg",
        "2.jpg",
        "3.jpg",
        "4.jpg",
        "5.jpg",
        "6.jpg",
      ])
      this.scene.background = this.textureCube;
      this.scene.environment = this.textureCube;
      this.camera.lookAt(0, 0, 0)
      this.camera.position.set(25, 25, 25)
      this.control = new OrbitControls(this.camera, this.renderer.domElement)

    },
    raycast(event) {

      // 获取屏幕坐标
      const screenX = event.clientX;
      const screenY = event.clientY;
      console.log(screenX, screenY);
      // 获取画布相对于屏幕的偏移量
      const canvasRect = this.renderer.domElement.getBoundingClientRect();
      const canvasOffsetX = canvasRect.left;
      const canvasOffsetY = canvasRect.top;

      const width = canvasRect.right - canvasRect.left;
      const height = canvasRect.bottom - canvasRect.top;
      console.log(width, height);


      // 将屏幕坐标转换为画布坐标
      const canvasX = screenX - canvasOffsetX;
      const canvasY = screenY - canvasOffsetY;

      // 将画布坐标转换为标准化设备坐标
      const mouse = new THREE.Vector2();
      // 当画布尺寸改变的时候需要换分母
      mouse.x = (canvasX / width) * 2 - 1;
      mouse.y = -(canvasY / height) * 2 + 1;

      // 根据相机和画布坐标创建射线
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, this.camera);

      // 计算射线与场景中的物体的相交情况
      const intersects = raycaster.intersectObjects(this.scene.children);

      // 如果有相交的物体，则输出其名称
      if (intersects.length > 0) {
        if (intersects[0].object.useType === "传感器") {
          intersects[0].object.material.color = new THREE.Color(0x00ff00)
        }

      } else {
        console.log('无拾取');
      }
    },
    addPcdModel() {
      this.loader = new PCDLoader()
      this.loader.load('./model/GlobalMap.pcd', (points) => {
        console.log(points);
        points.rotation.z = 11.2;
        points.rotation.x = 11;
        this.scene.add(points)
      });
    },


    animate() {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
    }
  },
  mounted() {

    this.initModel()
    // this.animate()
    this.addPcdModel()
    var canvas = this.$refs.bigScene;
    canvas.appendChild(this.renderer.domElement)
    this.renderer.setSize(510, 245);
  },
};

</script>
<style lang='scss' scoped>
.right_top_inner {
  margin-top: -8px;
  background-color: 0xff0000;

}
</style>