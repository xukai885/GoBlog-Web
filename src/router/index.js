
import {createRouter,createWebHashHistory,createWebHistory} from 'vue-router'
// 1 定义路由组件 也可以从其他文件导入



import Login from '../views/Login.vue'
import Base from '../components/base.vue'
import Index from '../views/Index.vue'
import BokeInfo from '../views/Boke.vue'
import Search from '../views/Search.vue'
import SearchType from '../views/SearchType.vue'
import TimeArchive from '../views/TimeArchive.vue'
import Share from '../views/Share.vue'
import About from '../views/About.vue'
// 2 定义一些路由
// 每个路由都需要映射到一个组件
//

const routes = [
    {
      path: "/",
      name:"index",
      component: Index,
    },
    {
        path: "/search",
        name:"search",
        component: Search,
    },
    {
        path: "/searchType",
        name:"searchType",
        component: SearchType,
    },
    {
        path: "/timeArchive/:url",
        name:"timeArchive",
        component: TimeArchive,
    },
    {
        path: "/boke",
        name:"boke",
        component: BokeInfo,
    },
    {
        path: "/share",
        name:"share",
        component: Share,
    },
    {
        path: "/about",
        name: "about",
        component: About,
    }
    // {
    //     path:"/login",
    //     name:"login",
    //     component: Login,
    // },
    // {
    //     path:"/info",
    //     name:"Info",
    //     component:Info,
    //     meta: {requireAuth: true} // 添加meta信息 登陆使用
    // },
]

// 3 创建路由实例并传递routes配置


const router = createRouter({
    // 4 内部提供了history模式的实现,为了简单， 使用hash模式
    history: createWebHashHistory(),
    // history: createWebHistory(),
    routes, // 路由表
});

export default router
