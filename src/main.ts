import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

import App from './App.vue'
import router from './router'
import store from './store'

import axios from './http'

const app = createApp(App)

app.config.globalProperties.$http = axios; // 全局挂载axios

app.use(ElementPlus).use(store).use(router).mount('#app')
