import { 
  createRouter, 
  createWebHistory,
} from "vue-router"
import { routes } from "./init-routes"

// 扩展 vue-router 下的 RouteMeta 接口
declare module 'vue-router' {
  interface RouteMeta {
    keepAlive?: boolean
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // console.log("to: ", to)
    // console.log("from: ", from)
    // console.log("savedPosition: ", savedPosition)
    if(savedPosition) {
      return savedPosition
    }

    return { top: 0 }
  },
})


export { router }