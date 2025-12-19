import { reactive } from "vue";
import { getVideoLinks } from "~/config/files";
import type { TugData } from "./types";
import { usePageShared } from "~/pages/shared/usePageShared";
import { useKoaLevel2 } from "~/pages/shared/useKoaSaved";


export function useTugCollect() {
  const videoLinks = getVideoLinks()
  const tugData = reactive<TugData>({
    videoSrc: videoLinks.timed_up_and_go_test,
    time: 0,
  })
  useKoaLevel2(tugData, "tug-collect")

  const { onTapNext, onTapBack } = usePageShared({
    title_key: "tug-collect.title",
    prev_page_name: "touch-collect",
    next_page_name: "tug-result",
  })

  return {
    tugData,
    onTapBack,
    onTapNext,
  }
}