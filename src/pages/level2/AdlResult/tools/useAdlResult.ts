import { onActivated, reactive } from "vue";
import type { AdlData } from "./types";
import { usePageShared } from "~/pages/shared/usePageShared";
import {
  useAdlLists,
} from "../../AdlCollect/tools/useAdlCollect";
import type { AdlItem } from "../../AdlCollect/tools/types";
import valTool from "~/utils/basic/val-tool";
import { KoaController } from "~/utils/controllers/KoaController";


export function useAdlResult() {
  usePageShared({ title_key: "adl-result.title" })

  const adlData = reactive<AdlData>({
    score: 0,
  })

  // to calculate score
  onActivated(() => {
    const { list1, list2, list3 } = useAdlLists()
    let score = getScoreFromList(list1)
    score += getScoreFromList(list2)
    score += getScoreFromList(list3)

    adlData.score = valTool.numToFix(score, 2)
  })
  
  return {
    adlData,
  }
}

function getScoreFromList(
  list: AdlItem[],
) {
  let score = 0
  const arr = KoaController.getADL()
  if(!arr) return 0

  for(let i=0; i<list.length; i++) {
    const v1 = list[i]
    const v2 = arr.find(v => v.title_key === v1.title_key)
    if(!v2) continue

    const radioLength = v1.radio_item_keys?.length ?? 0
    const selected_idx = v2.selected_idx
    if(selected_idx < 0) continue

    const currentScore = v1.total / (radioLength - 1) * selected_idx
    score += currentScore
  }

  return score
}