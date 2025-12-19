import { reactive } from "vue"
import type { TcData } from "./types"
import { initCheckbox } from "~/hooks/useCommon"
import { usePageShared } from "~/pages/shared/usePageShared"
import { useKoaLevel2 } from "~/pages/shared/useKoaSaved";
import { checkRules, type LogicRules } from "~/utils/tools/checkbox-logic"

const StatusOps = [
  "存在",
  "不存在"
]

const PainDetailOps = [
  "髌上滑囊压痛",
  "髌骨压痛",
  "膝关节内侧压痛",
  "膝关节外侧压痛",
  "髌下脂肪垫压痛",
  "髌腱压痛",
  "胫骨结节压痛",
]

export function useTouchCollect() {

  const tcData = reactive<TcData>({
    painStatus: initCheckbox(StatusOps),
    painDetails: initCheckbox(PainDetailOps),
  })
  useKoaLevel2(tcData, "touch-collect")

  const { onTapBack, onTapNext } = usePageShared({
    title_key: "touch-collect.title",
    prev_page_name: "sas-result",
    next_page_name: "tug-collect",
  })

  const rulesMap: Record<string, LogicRules> = {

    'painStatus': { conflictGroups: [[0, 1]] },
  };

  const handleCheck = (key: keyof TcData, index: number) => {
    const rule = rulesMap[key];
    if (rule) {
      const list = tcData[key] as any[]; 
      checkRules(list, index, rule);
    }
  }

  return {
    tcData,
    onTapNext,
    onTapBack,
    handleCheck
  }
}