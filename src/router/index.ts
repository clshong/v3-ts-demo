import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "order",
        name: "order",
        meta: {
          isShow: true,
          title:'订单列表'
        },
        component: () => import("../views/Order.vue"),
      },
      {
        path: "userlist",
        name: "userlist",
        meta: {
          isShow: true,
          title:'用户列表'
        },
        component: () => import("../views/UserList.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
