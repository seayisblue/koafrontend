import { reactive } from "vue";
import { usePageShared } from "~/pages/shared/usePageShared";
import type { CcData } from "./types";
import { useKoaLevel1 } from "~/pages/shared/useKoaSaved";
import { initCheckbox } from "~/hooks/useCommon";
import { checkRules, type LogicRules } from "~/utils/tools/checkbox-logic";

// 多选
const pain_locations = [
  "左膝外侧", "左膝内侧",
  "右膝外侧", "右膝内侧",
  "双膝内侧", "双膝外侧",
]

// 单选
const pain_natures = ["刺痛", "钝痛", "胀痛", "灼痛", "酸痛", "其他"]
const pain_durations = ["不到 1 个月", "1～3 个月", "3～6 个月", "6～12 个月", "超过一年"]
const stiffness_durations = ["小于 30 分钟", "超过 30 分钟"]
const knee_limit = ['有受限', '无']
const joint_stiffness = ["是", "否"]
const knee_observations = [
  "患侧膝盖肿胀",
  "患侧膝盖发红",
  "X型腿（站立时双膝靠得很近，但脚踝之间留有明显空隙）",
  "O型腿（站立时脚踝可以靠得很近，但双膝不能靠拢）",
  "无以上情况"
]
const temperature = ["升高", "正常"]

export function useChiefComplaint() {
  const { onTapNext, onTapBack } = usePageShared({ 
    title_key: "chief-complaint.title",
    next_page_name: "medical-history",
    prev_page_name: "basic-info"
  })

  const ccData = reactive<CcData>({
    pain_level: 0,
    pain_locations: initCheckbox(pain_locations),
    knee_observations: initCheckbox(knee_observations),
  })
  useKoaLevel1(ccData, "chief-complaint")

  const rulesMap: Record<string, LogicRules> = {
    'knee_observations': { conflictGroups: [[2, 3]], 
                           exclusiveIndex: 4 },
  };
  
  const handleCheck = (key: keyof CcData, index: number) => {
    const rule = rulesMap[key];
   
    if (rule) {
      const list = ccData[key];
      if (Array.isArray(list)) {
        checkRules(list, index, rule);
      }
    }
  }

  return {
    pain_natures,
    pain_durations,
    stiffness_durations,
    knee_limit,
    joint_stiffness,
    temperature,
    ccData,
    onTapNext,
    onTapBack,
    handleCheck
  }
}