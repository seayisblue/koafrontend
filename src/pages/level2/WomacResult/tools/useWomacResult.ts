import { onActivated, reactive } from "vue";
import type { WrData } from "./types";
import { ScoreController } from "~/utils/controllers/ScoreController";
import { usePageShared } from "~/pages/shared/usePageShared";
import { postWomac } from "./scripts";
import { handleResultOfPosting } from "~/pages/shared/ui-tip";

export function useWomacResult() {

  const { onTapNext: sharedOnTapNext, rr } = usePageShared({ 
    title_key: "womac-result.title",
    next_page_name: "sas-home",
  })

  const wrData = reactive<WrData>({
    womacScore: 0,
    klScore: 0,
    score: 0,
  })
  onActivated(() => {
    wrData.womacScore = ScoreController.getWomac()
    wrData.klScore = ScoreController.getKL();
    wrData.score = ScoreController.getOverallScore();
  })

  const onTapNext = async () => {
    sharedOnTapNext()
    const res = await postWomac();
    const success = await handleResultOfPosting(res);
    if (!success) rr.router.naviBack();
  }
  
  return {
    wrData,
    onTapNext,
  }
}