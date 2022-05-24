import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import {getRouter} from '../utils/api';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect:"order"
    // children:[
    //   {
    //     path: 'order',
    //     name: 'order',
    //     meta:{
    //       isShow:true,
    //       title:"订单列表"
    //     },
    //     component: () => import(/* webpackChunkName: "order" */ '../views/OrderView.vue')
    //   },
    //   {
    //     path: 'userList',
    //     name: 'userList',
    //     meta:{
    //       isShow:true,
    //       title:"用户列表"

    //     },
    //     component: () => import(/* webpackChunkName: "userList" */ '../views/UserView.vue')
    //   },
    //   {
    //     path: 'roleList',
    //     name: 'roleList',
    //     meta:{
    //       isShow:true,
    //       title:"角色列表"

    //     },
    //     component: () => import(/* webpackChunkName: "userList" */ '../views/RoleView.vue')
    //   },
    //   {
    //     path: 'authority',
    //     name: 'authority',
    //     meta:{
    //       isShow:false,
    //       title:"权限列表" 

    //     },
    //     component: () => import(/* webpackChunkName: "userList" */ '../views/AuthorityView.vue')
    //   }
    // ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由拦截
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

export default router
