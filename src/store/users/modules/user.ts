import { defineStore } from "pinia";
import type {LoginFormData} from'../../../type/userType'
import { reLogin } from "../../../api/user";

//创建用户仓库
let useUserStore = defineStore({
  id:"User",
  //存储数据
  state:()=>{
  return{}
  },
  actions:{
  async userLogin(data:LoginFormData){
    let result =  await reLogin(data);
    console.log(result);
  }

  },
  getters:{
  }
})

export default useUserStore;