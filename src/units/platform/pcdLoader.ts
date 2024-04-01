import { Object3D,Color } from 'three';
import { PCDLoader } from 'three/examples/jsm/Addons.js';

export const LOAD_EVENT = {
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
    // this._booth = booth;
    this._loader = new PCDLoader();
    this._color = new Color(0x00ffff)
    this._loader.load('./model/test1.pcd', this.onLoad, this.onLoading, this.onLoadError);
  }
  onLoad = (points:any)=>{
    console.log(points)
    points.geometry.rotateX(0.5 * Math.PI);//旋转模型，可调
    points.material.color = this._color // 模型颜色
    points.rotation.x = 45;
    points.rotation.z = -45;
    points.rotation.z = 45;
    this.add(points)
  };
  onLoading = (e:Event)=>{
    const event = {type:LOAD_EVENT.LOADING,data:e} as never;
    this.dispatchEvent(event)
  };
  onLoadError = (e:any)=>{
    console.log(e +"error");

  }
}