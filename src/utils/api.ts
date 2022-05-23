import $http from "./requset";
interface loginData{
  username:string,
  password:string
}
export const Login = (data:loginData) =>$http({url:'/login',method:'POST',data})
export const getList = (data:any) =>$http({url:'/getList',method:'GET',data})