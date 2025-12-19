import { onActivated, reactive } from "vue";
import type { WrData } from "./types";
import { ScoreController } from "~/utils/controllers/ScoreController";
import { usePageShared } from "~/pages/shared/usePageShared";

export function useWomacResult() {

  usePageShared({ 
    title_key: "womac-result.title",
  })

  const wrData = reactive<WrData>({
    womacScore: 0,
    klScore: 0,
    score: 0,
  })
  onActivated(() => {
    wrData.womacScore = ScoreController.getWomac()
    wrData.klScore = ScoreController.getKL();
    wrData.score = ScoreController.getOverallScore(wrData.womacScore, wrData.klScore);
  })
  
  return {
    wrData,
  }
}