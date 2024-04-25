


import {defineStore} from 'pinia';

const realtimeStore = defineStore({
  id: 'platform',
  state:()=>({
    loadingPercent: 0,
    loaded: false,
    realtimeShow:false
  }),
  getters:{
 
  },
  actions:{
    updateRealtimeShow(newValue:boolean) {
      this.realtimeShow = newValue;
    },
    
  }
});
export default realtimeStore;
