
import type { IModel } from '@/type/base';
import { Platform,EVENT } from '@/units/platform';
import {defineStore} from 'pinia';

const usePlatform = defineStore({
  id: 'platform',
  state:()=>({
    loadingPercent: 0,
    loaded: false,
    errorMsg: '',
    info: <IModel>({}),
    ModelContainers: <{platform:Platform|undefined}>{
      platform:undefined,
    },
  }),
  getters:{
    isLoading():boolean {
      return !this.loaded;
    },
    loadingMsg():string {
      return this.loadingPercent == 100?'模型加载成功' : `模型已加载:${this.loadingPercent.toFixed(2) }%`;    
    },
  },
  actions:{
    addCanvas(canvas:HTMLCanvasElement) {
      this.ModelContainers.platform = new Platform();
      this.ModelContainers.platform.addCanvas(canvas);
      this.ModelContainers.platform.addEventListener(EVENT.LOADING, this.onLoading);
    },
    start(){
      this.ModelContainers.platform?.start()
    },
    onLoading(e:any) {
      const { data } = e;
      this.loadingPercent =(data.loaded / data.total)*100;
      console.log(this.loadingPercent);
      
    },
  }
});
export default usePlatform;
