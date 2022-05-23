import type{FormInstance} from 'element-plus'
import{ref} from 'vue'
export interface LoginFromInt {
  username: string; 
  password: string;
}
export class InitData {
  loginFrom: LoginFromInt = {
    username: '',
    password: ''  
  };
  // 泛形
  loginFromRef = ref<FormInstance>()
}

