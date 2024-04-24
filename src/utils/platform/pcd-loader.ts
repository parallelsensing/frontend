
import { Object3D,Color} from 'three';
import { PCDLoader } from 'three/examples/jsm/Addons.js';

export const PCD_LOAD_EVENT = {
  LOADING: 'modelLoading',
  LOADED: 'modelLoaded',
  LOAD_FAIL: 'modelLoadFail'
};

export class PcdLoader extends Object3D{
  _loader:PCDLoader; //加载器
  _booth:any;//模型信息
  _model:Object3D|undefined = undefined; // 模型
  _color: Color
  constructor(){
    super();

    this._loader = new PCDLoader();
    this._color = new Color(0xffffff)

    this._loader.load('./model/bunny.pcd', this.onLoad, this.onLoading, this.onLoadError);
  }
  onLoad = (points:any)=>{
    points.material.color = this._color // 模型颜色
    points.rotation.y = 0;
    points.rotation.z = 11.2;
    points.rotation.x = 11;
    this.add(points)

    
  };
  onLoading = (e:Event)=>{
    const event = {type:PCD_LOAD_EVENT.LOADING,data:e} as never;
    this.dispatchEvent(event)
  };
  onLoadError = (e:any)=>{
    console.log(e +"error");

  }
}