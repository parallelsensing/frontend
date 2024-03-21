
import request from '../../units/request'
import type {
  LoginFormData,

} from '../../type/userType'

enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info',

}

export const reLogin = (data:LoginFormData)=> request.post(API.LOGIN_URL,data)



