import $http from "./requset";
interface loginData{
  username:string,
  password:string
}
export const Login = (data:loginData) =>$http({url:'/login',method:'POST',data})
export const getList = (data:any) =>$http({url:'/getList',method:'GET',data})
export const getRoleList = () =>$http({url:'/getRoleList',method:'GET'})
export const getUserList = () =>$http({url:'/getUserList',method:'GET'})
export const getauthority = () =>$http({url:'/getauthority',method:'GET'})
export const getRouter= () =>$http({url:'/getRouter',method:'GET'})