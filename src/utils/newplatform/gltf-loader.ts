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
    this._loader.load(modelPath, this.onLoad, this.onProgress, this.onError);
  }

  onLoad = (gltf: any) => {
    const model = gltf.scene || gltf.scenes[0];
    if (model) {
      model.position.set(-60, -20, 0);
      model.rotation.x = Math.PI / 2;
      this.add(model);
      this._model = model;
    }
  };

  onProgress = (e: ProgressEvent) => {
    if (e.lengthComputable) {
      const percentComplete = (e.loaded / e.total) * 100;
      const event = { type: GLTF_LOAD_EVENT.LOADING, data: percentComplete } as never;
      this.dispatchEvent(event)
    }

  };

  onError = (error: unknown) => {
    console.error('An error happened during model loading:', error);
  };
}
