import { ref, watch } from "vue";
import { getVideoLinks, type FileKey } from "~/config/files";
import { useRouteAndLiuRouter } from "~/routes/liu-router";
import typeCheck from "~/utils/basic/type-check";
import liuUtil from "~/utils/liu-util";
import { getAutoExams } from "../../shared/getAutoExams";


export function useVideoBox() {
  const videoSrc = ref("")
  const videoId = ref("")
  const rr = useRouteAndLiuRouter()
  
  watch(rr.route, (newV) => {
    const q = newV.query
    const vid = q.vid
    if(newV.name !== "ae-video-box") return
    if(!typeCheck.isString(vid)) return
    videoId.value = vid

    const vLinks = getVideoLinks()
    const src = vLinks[vid as FileKey]
    if(!src) return

    if(videoSrc.value === src) return
    videoSrc.value = src

    // set title
    const aeType = newV.params.aeType
    if(!typeCheck.isString(aeType)) return
    liuUtil.setAppTitle({
    val_key: `auto-exam.title-${aeType}`
    })
  }, { immediate: true })


  const autoExams = getAutoExams()
  const onTapNext = () => {
    const aeType = rr.route.params.aeType
    if(!typeCheck.isString(aeType)) return

    const idx1 = autoExams.findIndex(v => v.type === aeType)
    if(idx1 < 0) return
    const atom = autoExams[idx1]

    const videos = atom.videos
    const vid = videoId.value
    const idx2 = videos.findIndex(v => v.id === vid)
    if(idx2 < 0) return
    const theVideo = videos[idx2]
    const qaItems = theVideo.qaItems

    if(qaItems) {
      rr.router.push({
        name: "ae-video-question",
        params: { aeType },
        query: { vid }
      })
      return
    }

    const nextVideo = videos[idx2 + 1]
    if(nextVideo) {
      rr.router.push({
        name: "ae-video-box",
        params: { aeType },
        query: { vid: nextVideo.id },
      })
      return
    }

    const nextAtom = autoExams[idx1 + 1]
    if(nextAtom) {
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
    if(stacks.length < 2) {
      rr.router.goHome()
      return
    }
    rr.router.naviBack()
  }

  return {
    videoSrc,
    onTapNext,
    onTapBack,
  }
}