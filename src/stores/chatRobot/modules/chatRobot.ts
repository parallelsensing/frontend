
import { MinScene } from '@/utils/platform/minScene';
import {defineStore} from 'pinia';

const useMinScene = defineStore({
  id: 'minScene',
  state:()=>({
    minScene:<{minScene:MinScene|undefined}>{
      minScene:undefined,
    },
  }),
  getters:{
  

  },
  actions:{

    minSceneAddCanvas(canvas:any,size:[number,number]){
      this.minScene.minScene = new MinScene();
      this.minScene.minScene?.addCanvas(canvas,size)
    },
    cast(x:number, y:number) {
      this.minScene.minScene?.cast(x, y);
      },
 
  }
});
export default useMinScene;
