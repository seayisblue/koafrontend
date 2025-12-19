import { onActivated, reactive } from "vue";
import type { SrData } from "./types";
import { ScoreController } from "~/utils/controllers/ScoreController";
import { usePageShared } from "~/pages/shared/usePageShared";


export function useSasResult() {

  usePageShared({ 
    title_key: "sas-result.title",
  })

  const srData = reactive<SrData>({
    score: 0,
  })
  onActivated(() => {
    srData.score = ScoreController.getSas()
  })
  
  return {
    srData,
  }
}