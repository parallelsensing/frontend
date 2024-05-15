import {
  EventDispatcher,
  WebGLRenderer,
  Color,
  Clock,
  BoxGeometry,
  MeshBasicMaterial,
  AmbientLight,
  DirectionalLight,
  PerspectiveCamera,
  Scene,
  Group,
  Vector3,
  AxesHelper,
  Mesh,
  Raycaster,
  Vector2,
  CubeTextureLoader
} from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import TWEEN, { Tween } from 'three/examples/jsm/libs/tween.module.js';
// import { GlbLoader, GLB_LOAD_EVENT } from './glb-loader';
import { PcdLoader, PCD_LOAD_EVENT } from './pcd-loader';

/**
 * 版本
 */
export const VER = '1.0';
/**
 * 事件
 */
export const EVENT = {
  LOADING: 'modelLoading'
};
const Static = {
  X: 0,
  Y: 0,
  WIDTH: 1920,
  HEIGHT: 1080,
  DURATION: 1600,
  CAMERA_FAR: 50
};
export class Platform extends EventDispatcher {
  _canvas: any = null;
  __camera: PerspectiveCamera; // 摄像头
  __scene: Scene; // 场景
  __models: Group; // 展位
  __renderer: any = null; // 渲染器
  _config: any; // 配置信息
  _controls: any; //相机控制器
  _clock = new Clock();
  _axeshelper: any;
  _boxgeo: BoxGeometry;
  _boxmat: MeshBasicMaterial;
  _box: Mesh;
  _raycaster: Raycaster; // 射线
  _textureCubeLoader: CubeTextureLoader;
  _textureCube: any;

  constructor() {
    super();
    this.__scene = new Scene();

    this.__camera = new PerspectiveCamera(75, Static.WIDTH / Static.HEIGHT, 0.001, 10000);
    this._boxgeo = new BoxGeometry(0.9, 0.9, 0.3);
    this._boxmat = new MeshBasicMaterial({
      color: 0x00aa00
    });
    this._textureCubeLoader = new CubeTextureLoader().setPath('./texture');
    this._textureCube = this._textureCubeLoader.load([
      '1.jpg',
      '2.jpg',
      '3.jpg',
      '4.jpg',
      '5.jpg',
      '6.jpg'
    ]);
    this.__scene.background = this._textureCube;
    this.__scene.environment = this._textureCube;
    this._box = new Mesh(this._boxgeo, this._boxmat);
    this._box.position.set(15, 15, 15);
    this._box.name = '传感器1';
    this._raycaster = new Raycaster();

    this.__camera.position.set(43.37, 18.8, 49.6);
    this.__camera.lookAt(new Vector3(0, 0, 0));
    this.__models = new Group();
    this._axeshelper = new AxesHelper(50);
    this.__scene.add(this.__models, this.getLights(), this.__camera, this._axeshelper);
  }
  /**
   * 装载
   * @param canvas 元素
   */
  addCanvas(canvas: HTMLElement, size: [number, number]) {
    this._canvas = canvas;
    this.__renderer = new WebGLRenderer({ antialias: true });
    this.__renderer.setSize(size[0], size[1]);
    this._canvas.appendChild(this.__renderer.domElement);
    this.__renderer.shadowMap.enabled = true;

    // window.addEventListener('resize', this.onResize);
    // this.onResize();
    this.animate(0);
  }
  controlCamera() {
    this._controls = new OrbitControls(this.__camera, this.__renderer.domElement);
  }
  //尺寸重置
  onResize = () => {
    Static.X = this._canvas?.offsetLeft;
    Static.Y = this._canvas?.offsetTop;
    if (this._canvas) {
      this._canvas.width = window.innerWidth;
      this._canvas.height = window.innerHeight;
    }
    Static.WIDTH = window.innerWidth;
    Static.HEIGHT = window.innerHeight;

    if (this.__camera) {
      this.__camera.aspect = Static.WIDTH / Static.HEIGHT;
      this.__camera.updateProjectionMatrix();
      this.__renderer.setSize(Static.WIDTH, Static.HEIGHT);
      this.__renderer.setPixelRatio(window.devicePixelRatio);
    }
  };

  //入场动画
  enterSceneAnimate() {
    const v = new Vector3();
    v.x = 41.95;
    v.y = 26.12;
    v.z = 34.46;
    const tween = new Tween(this.__camera.position).to(v, Static.DURATION);
    tween.onUpdate(() => {
      this.__camera.lookAt(new Vector3(0, 0, 0));
    });
    tween.onComplete(() => {
      this.controlCamera();
      this.modelInit();
    });
    tween.start();
  }
  start() {
    this.enterSceneAnimate();
    this.setGlbLoading();
  }
  modelInit() {
    // const g = new GlbLoader('./model/RobotExpressive.glb');
    const g1 = new PcdLoader();
    this.__models.add(g1, this._box);

    
  }
  //添加灯光
  getLights() {
    const group = new Group();
    const sun = new DirectionalLight(0xffffff, 0.8);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    sun.shadow.camera.left = -180;
    sun.shadow.camera.right = 180;
    sun.shadow.camera.top = -180;
    sun.shadow.camera.bottom = 180;
    sun.position.set(50, 50, 0);
    group.add(new AmbientLight(0xffffff, 0.6), sun);
    return group;
  }
  setGlbLoading() {
    // const group: any = new GlbLoader();
    // group.addEventListener(GLB_LOAD_EVENT.LOADING, (e: any) => {
    //   this.onLoading(e.data);
    // });
    const group: any = new PcdLoader();
    group.addEventListener(PCD_LOAD_EVENT.LOADING, (e: any) => {
      this.onLoading(e.data);
    });
  }
  onLoading = (e: Event) => {
    const event = { type: EVENT.LOADING, data: e } as never;
    this.dispatchEvent(event);
  };
  //动画
  animate = (time: number) => {
    // console.log(this.__camera.position);

    requestAnimationFrame(this.animate);
    // console.log("Initial Camera Rotation:", this.__camera.rotation,this.__camera.position);
    if (this._controls) this._controls.update();
    this.__renderer.render(this.__scene, this.__camera);
    TWEEN.update(time);
  };

  cast(screenX: number, screenY: number) {
    // 获取画布相对于屏幕的偏移量
    const canvasRect = this.__renderer.domElement.getBoundingClientRect();
    const canvasOffsetX = canvasRect.left;
    const canvasOffsetY = canvasRect.top;

    const width = canvasRect.right - canvasRect.left;
    const height = canvasRect.bottom - canvasRect.top;
    console.log(width, height);

    // 将屏幕坐标转换为画布坐标
    const canvasX = screenX - canvasOffsetX;
    const canvasY = screenY - canvasOffsetY;
    // 将画布坐标转换为标准化设备坐标
    const mouse = new Vector2();
    // 当画布尺寸改变的时候需要换分母
    mouse.x = (canvasX / width) * 2 - 1;
    mouse.y = -(canvasY / height) * 2 + 1;

    this._raycaster.setFromCamera(mouse, this.__camera);
    const intersects: any = this._raycaster.intersectObjects(this.__models.children, false);

    if (intersects.length && intersects[0].object.name === '传感器1') {
      intersects[0].object.material.color = new Color(0x00ff00);
      console.log(intersects);
      const tween = new TWEEN.Tween(this.__camera.position);
      tween
        .to({ x: 17, y: 17, z: 17 }, 1000)
        // .easing(TWEEN.Easing.Quadratic.InOut) // 缓动函数
        .onUpdate(() => {
          // 在动画更新时执行的操作，更新相机的位置
          this.__camera.lookAt(intersects[0].object.position); // 使相机始终朝向目标点
        })
        .start(); // 启动Tween动画
    } else {
      console.log('无拾取');
      console.log(this.__models.children);
    }
  }
}
