import axios from 'axios'
import { ElMessage } from 'element-plus'

// 枚举
enum  MSG{
  '操作成功'=200,
  '密码错误',
  '账号错误',
  '请求异常'

}
// 创建一个实例
const $http = axios.create({
  baseURL:'https://www.fastmock.site/mock/323354e56ef21147c3f550e18435baa1/api',
  timeout:3000,
  headers:{
    "Content-Type":"application/json;charset=utf-8"
  }
}) 

// 请求拦截
$http.interceptors.request.use(config=>{
  config.headers = config?.headers || {}
  if(localStorage.getItem('token')){
    config.headers.token = localStorage.getItem('token') || ''
  }
  return config
})
// 响应拦截
$http.interceptors.response.use( res =>{
  const code:number = res.data.code
  if(code !== 200){
    MSG[code]
    ElMessage.error(MSG[code])
    return Promise.reject(res.data)
  }
  return res.data
},err =>{
  console.log(err);
  
}
)
export default $http