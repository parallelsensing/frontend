import {
  EventDispatcher,
  WebGLRenderer,
  Color,
  AmbientLight,
  DirectionalLight,
  PerspectiveCamera,
  Scene,
  Group,
  Vector3,
  AxesHelper,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';


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
  WIDTH: 576,
  HEIGHT: 324,
};
export class MinScene extends EventDispatcher {
  _canvas: any = null;
  __camera: PerspectiveCamera; // 摄像头
  __scene: Scene; // 场景
  __models: Group; // 展位
  __minScenerenderer: any = null; // 渲染器
  _loader: any = null; // 加载器
  _controls: any; //相机控制器
  _axeshelper: any;
  constructor() {
    super();
    this.__scene = new Scene();
    this.__scene.background = new Color(0xcccccc);
    this.__camera = new PerspectiveCamera(75, Static.WIDTH / Static.HEIGHT, 0.01, 100);
    this.__camera.position.set(1, 1, 1);
    this.__camera.lookAt(new Vector3(0, 0, 0));
    this.__models = new Group();
    this._axeshelper = new AxesHelper(50);
    this.__scene.add(this.__models, this.getLights(), this.__camera, this._axeshelper);
  }
  /**
   * 装载
   * @param canvas 元素
   */
  addCanvas(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    console.log(canvas);
    
    this.__minScenerenderer = new WebGLRenderer({ canvas, antialias: true });
    this.__minScenerenderer.shadowMap.enabled = true;
    this.__minScenerenderer.setSize(canvas.width,canvas.height);
    this.animate();
    console.log('小场景加载成功');
    
  }
  controlCamera() {
    this._controls = new OrbitControls(this.__camera, this.__minScenerenderer.domElement);
  }

  //入场动画
  enterSceneAnimate() {
    this.controlCamera();
    // this.modelInit();

    
  }
  start() {
    this.enterSceneAnimate();
  }
  // modelInit() {
  // }
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

  onLoading = () => {};
  //动画
  animate = () => {
    requestAnimationFrame(this.animate);
    if (this._controls) this._controls.update();
    this.__minScenerenderer.render(this.__scene, this.__camera);
  };
}
