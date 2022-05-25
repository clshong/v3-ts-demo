# v3-ts-admin

## 一、项目介绍和核心

本项目主要通过的是Vue3+Element+Axios+Typescript技术组成，项目核心主要是刚学习vue3和ts的伙伴来熟悉一下vue3的声明周期和ts的语法使用

## 二、项目架构

- Login 登录页
- Home 首页
  - Order 订单列表
  - user 用户列表
  - role 角色列表
    - Authority 权限列表

## 三、Axios接口封装

`一、创建request.ts`

```tsx
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
```

`二、创建api.ts`  实现对页面请求统一的管理

```tsx
// 导入axios模块封装

import $http from "./requset";

// interface 接口的使用

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
```

## 四、路由拦截-动态路由

```tsx
// 路由拦截
// 需要使用同步请求 async 和 await配合使用
router.beforeEach(async (to)=>{
  // 如果没有登录，则只能进去登录页面
  const token:string | null = localStorage.getItem('token')
  if(!token && to.path !== "/login"){
    return '/login'
  }else if(to.path!=='/login'&&token){
    if(router.getRoutes().length===2){
      // 动态添加路由
      let routerData:any = await getRouter()
      routerData = routerData.data

      routerData.forEach((v:any)=>{
        const routerObj:RouteRecordRaw = {
              path:v.name,
              name:v.name,
              meta:v.meta,
              component: () => import(/* webpackChunkName: "[request]" */ `../views/${v.path}.vue`)
          }
          router.addRoute("home",routerObj)
      })
      router.replace(to.path)
    }

  }else if(to.path==='/login'&&token){
    return '/'
  }
})
```

## 五、路由默认选中

```vue
<el-menu
          router
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          :default-active="active"
          text-color="#fff"
 >
// 获取当前rouer实例对象
*import* {useRoute } *from* "vue-router";

setup() {
    const router = useRouter();
    const rouer = useRoute()
    // 拿到所有路由实例
    const list = router.getRoutes().filter((v) => v.meta.isShow);
    return {
      list,
      active:rouer.path
    };
  },
```
#### 祝大家学有所用！
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
