import { onActivated } from "vue"
import { useRouteAndLiuRouter } from "~/routes/liu-router"
import liuUtil from "~/utils/liu-util"

interface PageSharedOption {
  title_key: string
  next_page_name?: string
  prev_page_name?: string
}

export function usePageShared(option: PageSharedOption) {

  const rr = useRouteAndLiuRouter()

  const onTapNext = () => {
    if(option.next_page_name) {
      rr.router.push({ name: option.next_page_name })
    }
  }
  const onTapBack = () => {
    const prevName = option.prev_page_name
    if(prevName) {
      rr.router.naviBackToTarget(prevName)
      return
    }
    rr.router.naviBack()
  }

  onActivated(() => {
    liuUtil.setAppTitle({ val_key: option.title_key })
  })

  return {
    onTapNext,
    onTapBack,
    rr,
  }
}