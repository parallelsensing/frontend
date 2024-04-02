
import type { IModel } from '@/type/base';
import { Platform,EVENT } from '@/units/platform';
import {defineStore} from 'pinia';
// import { DefaultLoadingManager } from 'three';

const usePlatform = defineStore({
  id: 'platform',
  state:()=>({
    loadingPercent: 0,
    loaded: false,
    errorMsg: '',
    info: <IModel>({}),
    fold: false,
    instance: <{platform:Platform|undefined, }>{
      platform:undefined,
      visitor:undefined
    }  
  }),
  getters:{
    isLoading():boolean {
      return !this.loaded;
    },
    loadingMsg():string {
      return this.loadingPercent == 100?'模型加载成功' : `模型已加载:${this.loadingPercent.toFixed(2) }%`;    
    },
    // loadingMsg(){
    //   DefaultLoadingManager.onProgress =(item,loaded,total)=>{
    //     this.loadingPercent= parseFloat(((loaded/total)*100).toFixed(2)); 
    //   }
  

    // }
 
  },
  actions:{
    addCanvas(canvas:HTMLCanvasElement) {
      this.instance.platform = new Platform();
      this.instance.platform.addCanvas(canvas);
      this.instance.platform.addEventListener(EVENT.LOADING, this.onLoading);
    },
    start(){
      this.instance.platform?.start()
    },
    onLoading(e:any) {
      const { data } = e;
      this.loadingPercent =(data.loaded / data.total)*100;
    },
    // updateLoadingPercent(){
    //   DefaultLoadingManager.onProgress =(item,loaded,total)=>{
    //     this.loadingPercent= parseFloat(((loaded/total)*100).toFixed(2)); 
    //     // this.loadingMsg = "模型加载中："+((loaded/total)*100).toFixed(2)
    //   }
    // },
    // onLoading() {
    // },
  }
});
export default usePlatform;
