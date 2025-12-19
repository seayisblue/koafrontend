import { ref, watch } from "vue";
import { type FileKey } from "~/config/files";
import { useRouteAndLiuRouter } from "~/routes/liu-router";
import typeCheck from "~/utils/basic/type-check";
import liuUtil from "~/utils/liu-util";
import { getAutoExams } from "../../shared/getAutoExams";
import type { QaItem } from "../../shared/types";

export function useVideoQuestion() {
  const videoId = ref("")
  const rr = useRouteAndLiuRouter()
  const autoExams = getAutoExams() 
  const qaItems = ref<QaItem[]>([])

  watch(rr.route, (newV) => {
    const q = newV.query
    if(newV.name !== "ae-video-question") return

    const aeType = newV.params.aeType
    if(!typeCheck.isString(aeType)) return
    liuUtil.setAppTitle({
      val_key: `auto-exam.title-${aeType}`
    })

    const vid = q.vid as FileKey
    if(!typeCheck.isString(vid)) return
    if(videoId.value === vid) return
    videoId.value = vid

    const atom = autoExams.find(v => v.type === aeType)
    if(!atom) return
    const videoItem = atom.videos.find(v => v.id === vid)
    if(!videoItem) return

    const _qaItems = videoItem.qaItems
    if(!_qaItems) return
    qaItems.value = _qaItems

  }, { immediate: true })

  const onTapNext = () => {
    const aeType = rr.route.params.aeType
    if (!typeCheck.isString(aeType)) return

    const idx1 = autoExams.findIndex(v => v.type === aeType)
    if (idx1 < 0) return
    const atom = autoExams[idx1]

    const videos = atom.videos
    const vid = videoId.value
    const idx2 = videos.findIndex(v => v.id === vid)
    if (idx2 < 0) return

    const nextVideo = videos[idx2 + 1]
    if (nextVideo) {
      rr.router.push({
        name: "ae-video-box",
        params: { aeType },
        query: { vid: nextVideo.id },
      })
      return
    }

    const nextAtom = autoExams[idx1 + 1]
    if (nextAtom) {
      rr.router.push({
        name: "ae-video-start",
        params: { aeType: nextAtom.type },
      })
      return
    }

    // TODO 前往 level4

  }

  const onTapBack = () => {
    const stacks = rr.router.getStack()
    if (stacks.length < 2) {
      rr.router.goHome()
      return
    }
    rr.router.naviBack()
  }

  return {
    qaItems,
    onTapNext,
    onTapBack,
  }
}