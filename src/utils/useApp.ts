import { useGlobalLoading } from "~/hooks/tools/useGlobalLoading"
import { useRouteAndLiuRouter } from "~/routes/liu-router"
import liuApi from "./liu-api"
import valTool from "./basic/val-tool"
import type { RouteLocationNormalizedGeneric } from "vue-router"
import { onMounted } from "vue"
import APIs from "~/requests/APIs"
import liuReq from "~/requests/liu-req"

export function useApp() {
  printHelloWorld()
  useGlobalLoading()
  saveProgress()

  onMounted(() => {
    pingAPI()
  })
}

async function pingAPI() {
  // 测试一下后端 api 是否联通
  const url = APIs.HELLO

  console.log("请求 hello-world 接口......")
  const res = await liuReq.request(url)
  console.log("hello-world 接口返回结果：", res)
}



function printHelloWorld() {
  const version = LIU_ENV.version
  console.log(`You're using Koa System v${version}`)
}

function saveProgress() {
  // 创建全局守卫导航，存储当前进度页面
  const { router } = useRouteAndLiuRouter()
  router.beforeEach((to, from) => {
    if (to.name === from.name) {
      return true
    }

    if (!from.name && to.name === "home") {
      const lastRoute = liuApi.getStorageSync<RouteLocationNormalizedGeneric>("last-route")
      if (lastRoute && lastRoute.name !== to.name) {
        return lastRoute
      }
      return true
    }

    if (from.name) {
      const to2 = valTool.copyObject(to)
      liuApi.setStorageSync("last-route", to2)
    }
    
    return true
  })
}