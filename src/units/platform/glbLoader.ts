import { Object3D } from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { DRACOLoader } from 'three/examples/jsm/Addons.js';
// import { IModel } from '../../type/base';

export const LOAD_EVENT = {
  LOADING: 'modelLoading',
  LOADED: 'modelLoaded',
  LOAD_FAIL: 'modelLoadFail'
};


export class GlbLoader extends Object3D {
  _loader: GLTFLoader; //加载器
  _booth: any; //模型信息
  _model: Object3D | undefined = undefined; // 模型
  constructor() {
    super();
    const dracoLoader = new DRACOLoader();
    this._loader = new GLTFLoader();
    dracoLoader.setDecoderPath('./gltfdraco');
    dracoLoader.setDecoderConfig({ type: 'js' });
    dracoLoader.preload();
    this._loader.setDRACOLoader(dracoLoader);
    this._loader.load('./model/test38-9.glb', this.onLoad, this.onLoading, this.onLoadError);
  }

  onLoad = (gltf: any) => {
    const model = gltf.scene;
    this._model = model;
    model.rotation.x = -90;
    model.rotation.z = 90;
    // model.scale.set(10,10,10)
    // model.position.set(-10,0,0)
    this.add(model);
    console.log(gltf);
  };
  onLoading = (e:Event)=>{
    const event = {type:LOAD_EVENT.LOADING,data:e} as never;
    this.dispatchEvent(event)
  };
  // onLoading = () => {};
  onLoadError = (e: any) => {
    console.log(e + 'error');
  };
}
