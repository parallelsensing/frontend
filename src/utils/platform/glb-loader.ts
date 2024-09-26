import { Object3D} from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { DRACOLoader } from 'three/examples/jsm/Addons.js';
// import { IModel } from '../../type/base';

export const GLB_LOAD_EVENT = {
  LOADING: 'modelLoading',
  LOADED: 'modelLoaded',
  LOAD_FAIL: 'modelLoadFail'
};


export class GlbLoader extends Object3D {
  _loader: GLTFLoader; //加载器
  _booth: any; //模型信息
  _model: Object3D | undefined = undefined; // 模型
  constructor(url:any) {
    super();
    const dracoLoader = new DRACOLoader();
    this._loader = new GLTFLoader();
    dracoLoader.setDecoderPath('./gltfdraco');
    dracoLoader.setDecoderConfig({ type: 'js' });
    dracoLoader.preload();
    this._loader.setDRACOLoader(dracoLoader);
    this._loader.load(url, this.onLoad, this.onLoading, this.onLoadError);
  }

  onLoad = (gltf: any) => {
    const model = gltf.scene;
    this._model = model;
    this.animations =gltf.animations; 
    console.log("this",this);
    console.log(this._model);
    console.log(gltf);
    // model.rotation.x = -90;
    // model.rotation.z = 90;
    // model.scale.set(0.55,0.55,0.55)
    model.position.set(0.6,-0.2,0)
    this.add(model);
  };

  onLoading = () => {};
  onLoadError = (e: any) => {
    console.log(e + 'error');
  };

}
