// import { IModel } from '../../type/base';
import { Platform,EVENT } from '../../units/platform/index'
import {defineStore} from 'pinia';

const usePlatform = defineStore({
  id: 'platform',
  state:()=>({
    loadingPercent: 0,
    loaded: false,
    errorMsg: '',
    // info: <IModel>({}),
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
      return this.loadingPercent == 1?'模型解压中' : `loading:${Math.floor(this.loadingPercent * 1000) / 10}%`;    
    },
  },
  actions:{
    freight(canvas:HTMLCanvasElement) {
      this.instance.platform = new Platform();
      this.instance.platform.freight(canvas);
      this.instance.platform.addEventListener(EVENT.LOADING, this.onLoading);
    },
    start(){
      this.instance.platform?.start()
    },
    onLoading(e:any) {
      const { data } = e;
      this.loadingPercent =data.loaded / data.total;
    },
  }
});
export default usePlatform;
