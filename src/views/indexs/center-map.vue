<template>
  <div class="centermap">
    <div class="maptitle">
      <div class="zuo"></div>
      <span class="titletext">{{ maptitle }}</span>
      <div class="you"></div>
    </div>
    <div class="mapwrap">
      <dv-border-box-13>
        <div @click="raycast" class="bigScene" ref="bigScene">
        </div>
      </dv-border-box-13>

    </div>
  </div>
</template>

<script >
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { PCDLoader } from 'three/examples/jsm/Addons.js';
// import TWEEN from 'three/examples/jsm/libs/tween.module.js';

export default {
  data() {
    return {
      maptitle: "点云场景",
      // realtimeshow: false,
      realtimecolor: new THREE.Color(0X00FF00),
      
      scene: new THREE.Scene(),
      camera: new THREE.PerspectiveCamera(75, 720 / 548, 0.001, 10000),
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
      // 获取画布相对于屏幕的偏移量
      const canvasRect = this.renderer.domElement.getBoundingClientRect();
      const canvasOffsetX = canvasRect.left;
      const canvasOffsetY = canvasRect.top;

      const width = canvasRect.right - canvasRect.left;
      const height = canvasRect.bottom - canvasRect.top;

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
          intersects[0].object.material.color = this.realtimecolor
          this.realtimeshow = true;
          // this.$store.commit('updateSharedData', this.realtimeshow);
          // let tween = new TWEEN.Tween(this.camera.position)
          // tween.to({ x: 1, y: 1, z: 1 }, 3000)
          //   .easing(TWEEN.Easing.Quadratic.InOut) // 缓动函数
          //   .onUpdate(() => {
          //     // 在动画更新时执行的操作，更新相机的位置
          //     this.camera.lookAt(intersects[0].object.position); // 使相机始终朝向目标点
          //   })
          //   .start(); // 启动Tween动画
        }
      } else {
        console.log('无拾取');
      }
    },
    addPcdModel() {
      this.loader = new PCDLoader()
      this.loader.load('./model/GlobalMap.pcd', (points) => {
   
        points.rotation.z = 11.2;
        points.rotation.x = 11;
        this.scene.add(points)
      });
    },

    animate() {
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animate);
    }
  },
  mounted() {
    
    this.initModel()
    this.addPcdModel()
    const canvas = this.$refs.bigScene;
    console.log(canvas);
    canvas.appendChild(this.renderer.domElement)
    this.renderer.setSize(720, 548);
    // this.animate()
  },
};
</script>
<style lang="scss" scoped>
.centermap {
  margin-bottom: 30px;

  .maptitle {
    height: 60px;
    display: flex;
    justify-content: center;
    padding-top: 10px;
    box-sizing: border-box;

    .titletext {
      font-size: 28px;
      font-weight: 900;
      letter-spacing: 6px;
      background: linear-gradient(92deg,
          #0072ff 0%,
          #00eaff 48.8525390625%,
          #01aaff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0 10px;
    }


    .zuo,
    .you {
      background-size: 100% 100%;
      width: 29px;
      height: 20px;
      margin-top: 8px;
    }

    .zuo {
      background: url("../../assets/img/xiezuo.png") no-repeat;
    }

    .you {
      background: url("../../assets/img/xieyou.png") no-repeat;
    }
  }

  .mapwrap {
    height: 548px;
    width: 100%;
    margin: 0;
    padding: 0;

    // box-sizing: border-box;
    position: relative;

    .bigScene {
      width: 100%;
      height: 100%;
      position: relative;
      /* 父容器必须设置为相对定位 */
      z-index: 100;
    }
  }
}
</style>
