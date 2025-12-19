import { useRouteAndLiuRouter } from "~/routes/liu-router"
import { showGlobalLoading, hideGlobalLoading } from "~/components/loaders/global-loading"
import type { LiuTimeout } from "~/utils/basic/type-tool";

const DURATION_LOADING = 190

export function useGlobalLoading() {
  const { router } = useRouteAndLiuRouter()
  let timeout: LiuTimeout

  const _beforeEach = async () => {
    if(timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      timeout = undefined
      showGlobalLoading()
    }, DURATION_LOADING)
  }

  router.beforeEach((to, from) => {
    _beforeEach()
  })

  router.beforeResolve((to, from) => {
    if(timeout) {
      clearTimeout(timeout)
    }
    else {
      // 去隐藏 loading
      hideGlobalLoading()
    }

    timeout = undefined
  })
}