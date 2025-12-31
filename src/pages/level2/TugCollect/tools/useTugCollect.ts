import { reactive } from "vue";
import { getVideoLinks } from "~/config/files";
import type { TugData } from "./types";
import { postMetrics } from "./scripts";
import { usePageShared } from "~/pages/shared/usePageShared";
import { useKoaLevel2 } from "~/pages/shared/useKoaSaved";
import { handleResultOfPosting } from "~/pages/shared/ui-tip";

export function useTugCollect() {
  const videoLinks = getVideoLinks();
  const tugData = reactive<TugData>({
    videoSrc: videoLinks.timed_up_and_go_test,
    time: 0,
  });
  const save = useKoaLevel2(tugData, "tug-collect");

  const { onTapNext: originalOnTapNext, onTapBack, rr } = usePageShared({
    title_key: "tug-collect.title",
    prev_page_name: "touch-collect",
    next_page_name: "tug-result",
  });

  const onTapNext = async () => {
    save();
    originalOnTapNext();
    const res = await postMetrics();
    const success = await handleResultOfPosting(res);
    if (!success) rr.router.naviBack();
  }

  return {
    tugData,
    onTapBack,
    onTapNext,
  };
}