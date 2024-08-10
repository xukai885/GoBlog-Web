import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router'
import axios from './service/api'
import VueAxios from 'vue-axios'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// createApp(App).mount('#app')

router.beforeEach((to,from,next)=>{
    if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
        if (localStorage.getItem("loginResult")) { //判断本地是否存在access_token
          next();
        } else {
          if (to.path == '/login') {
            next();
          } else {
            next({
              path: '/login'
            })
          }
        }
      }
      else {
        next();
    }
    /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
    if (to.fullPath == "/login") {
      if (localStorage.getItem("loginResult")) {
        next({
          path: from.fullPath
        });
      } else {
        next();
      }
    }
})




const app = createApp(App)
app.config.globalProperties.$axios=axios
app.config.globalProperties.$store=store

app.use(VueAxios,axios)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(store)

app.use(router)
app.mount('#app')