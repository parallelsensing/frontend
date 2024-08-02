import {
  EventDispatcher,
  WebGLRenderer,
  Color,
  AmbientLight,
  DirectionalLight,
  PerspectiveCamera,
  Scene,
  Group,
  Vector2,
  AxesHelper,
  CubeTextureLoader,
  Raycaster,
} from 'three';
// import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { GlbLoader } from './glb-loader';


/**
 * 版本
 */
export const VER = '1.0';
/**
 * 事件
 */

const Static = {
  WIDTH: 576,
  HEIGHT: 324,
};
export class MinScene extends EventDispatcher {
  _mincanvas: any = null;
  __mincamera: PerspectiveCamera; // 摄像头
  __minscene: Scene; // 场景
  __minmodels: Group; // 展位
  __minScenerenderer: any = null; // 渲染器
  _loader: any = null; // 加载器
  // _mincontrols: any; //相机控制器
  _minaxeshelper:AxesHelper
  _mintextureCubeLoader: CubeTextureLoader;
  _mintextureCube: any;
  _minraycaster:Raycaster;

  constructor() {
    super();
    this.__minscene = new Scene();
    this.__minscene.background = new Color(0xcccccc);

    this._mintextureCubeLoader = new CubeTextureLoader().setPath('./texture');
    this._mintextureCube = this._mintextureCubeLoader.load([
      '1.jpg',
      '2.jpg',
      '3.jpg',
      '4.jpg',
      '5.jpg',
      '6.jpg'
    ]);
    this.__minscene.background = this._mintextureCube;
    this.__minscene.environment = this._mintextureCube;
    this.__mincamera = new PerspectiveCamera(75, Static.WIDTH / Static.HEIGHT, 0.01, 100);
    // this.__mincamera.position.set(0, 3.1, 3);
    // this.__mincamera.lookAt(new Vector3(0, 0, 0));
    this.__mincamera.position.set( -0, 4.2, 3.5 );
    this.__mincamera.lookAt( 0, 2, 0 );
    this.__minmodels = new Group();
    this._minraycaster = new Raycaster()
    const g = new GlbLoader('./model/RobotExpressive.glb');
    this.__minmodels.add(g);
    console.log("GLBLoader",g);

    this._minaxeshelper = new AxesHelper(50);
    this.__minscene.add(this.__minmodels, this.getLights());
  }
  /**
   * 装载
   * @param canvas 元素
   */
  addCanvas(canvas: HTMLCanvasElement,size: [number, number]) {
    this._mincanvas = canvas;
    this.__minScenerenderer = new WebGLRenderer({ antialias: true });
    this._mincanvas.appendChild(this.__minScenerenderer.domElement);
    this.__minScenerenderer.setSize(size[0],size[1]);
    this.animate();
    console.log("这是minScene"+this.__minscene); 
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

  //动画
  animate = () => {
    requestAnimationFrame(this.animate);
    this.__minScenerenderer.render(this.__minscene, this.__mincamera);
  };
  cast(screenX: number, screenY: number) {
    // 获取画布相对于屏幕的偏移量
    const canvasRect = this.__minScenerenderer.domElement.getBoundingClientRect();
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

    this._minraycaster.setFromCamera(mouse, this.__mincamera);
    const intersects: any = this._minraycaster.intersectObjects(this.__minmodels.children, false);
    console.log("场景中的物体",this.__minmodels.children);
    
    if (intersects.length ) {
      intersects[0].object.material.color = new Color(0x00ff00);
      console.log(intersects);
    } else {
      console.log('小场景无拾取');
      console.log(this.__minmodels.children);
    }
  }
}
