import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 全局引入
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 链式编程
createApp(App).use(router).use(ElementPlus).mount('#app')
