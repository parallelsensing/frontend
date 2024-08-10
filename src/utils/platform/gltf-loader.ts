import { Object3D, Color } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const GLTF_LOAD_EVENT = {
  LOADING: 'modelLoading',
  LOADED: 'modelLoaded',
  LOAD_FAIL: 'modelLoadFail'
};

export class GltfLoader extends Object3D {
  _loader: GLTFLoader; // 加载器
  _booth: any; // 模型信息
  _model: Object3D | undefined = undefined; // 模型
  _color: Color;

  constructor() {
    super();
    this._loader = new GLTFLoader();
    this._color = new Color(0xffffff);
    const modelPath = new URL('/行政楼03.gltf', import.meta.url).href;
    this._loader.load(modelPath, this.onLoad, this.onLoading, this.onLoadError);
  }

  onLoad = (gltf: any) => {
    const model = gltf.scene || gltf.scenes[0];
    if (model) {
      // 如果需要，可以设置模型的颜色
      // model.traverse((child: any) => {
      //   if (child.isMesh) {
      //     child.material.color = this._color;
      //   }
      // });

      model.position.set(-12, 2, -15);
      model.rotation.y = 0;
      model.rotation.z = 11.2;
      model.rotation.x = 11;
      model.scale.set(2, 2, 2);
      this.add(model);
      this._model = model;

    } else {
      this.onLoadError(new Error("Model not found in GLTF"));
    }
  };

  onLoading = (xhr: ProgressEvent<EventTarget>) => {
    const event = { type: GLTF_LOAD_EVENT.LOADING, data: xhr } as never;
    this.dispatchEvent(event);
  };

  onLoadError = (error: any) => {
    console.error('Model loading error:', error);
    const event = { type: GLTF_LOAD_EVENT.LOAD_FAIL, data: error } as never;
    this.dispatchEvent(event);
  };
}