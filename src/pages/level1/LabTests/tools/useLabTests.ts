import { reactive } from "vue";
import type { LtData } from "./types";
import { usePageShared } from "~/pages/shared/usePageShared";
import { useKoaLevel1 } from "~/pages/shared/useKoaSaved";
import { initCheckbox } from "~/hooks/useCommon";
import { checkRules, type LogicRules } from "~/utils/tools/checkbox-logic";

const ifOps = [
  "是",
  "否"
]

const XRayResult = [
  "膝关节退行性病变",
  "骨刺（骨赘）",
  "关节间隙变窄",
  "骨硬化",
  "软骨下囊性变",
  "关节游离体（关节鼠）"
]

const StatusOps = [
  "正常",
  "不正常（以下问题可多选）"
]

const bone = [
  "关节软骨局灶性缺损",
  "软骨下骨硬化",
  "骨髓病变（骨髓水肿、早期骨坏死、骨肿瘤等）",
  "囊肿",
  "骨折",
  "骨挫伤",
  "骨赘形成"
]

const meniscus = [
  "半月板变性",
  "半月板损伤（I度）",
  "半月板损伤（II度）",
  "半月板损伤（III度）"
]

const joint = [
  "滑膜炎",
  "关节积液",
  "腘窝囊肿（Baker囊肿）",
  "滑囊炎症"
]

const muscle = [
  "韧带退变",
  "韧带撕裂",
  "肌腱炎",
  "肌腱撕裂",
  "肌肉炎症",
  "肌肉萎缩"
]

const UltraSoundResult = [
  "骨赘",
  "滑膜炎",
  "滑囊积液",
  "隐匿性骨折",
  "半月板撕裂",
  "韧带撕裂",
  "肌腱撕裂",
  "神经节囊肿"
]

export function useLabTests() {
  const ltData = reactive<LtData>({
    ifXRay: initCheckbox(ifOps),
    XRayStatus: initCheckbox(StatusOps),
    XRayResult: initCheckbox(XRayResult),

    ifMRI: initCheckbox(ifOps),
    MRIStatus: initCheckbox(StatusOps),
    bone: initCheckbox(bone),
    meniscus: initCheckbox(meniscus),
    joint: initCheckbox(joint),
    muscle: initCheckbox(muscle),

    ifUltraSound: initCheckbox(ifOps),
    UltraSoundStatus: initCheckbox(StatusOps),
    UltraSoundResult: initCheckbox(UltraSoundResult)
  })
  useKoaLevel1(ltData, "lab-tests")

  const { onTapBack, onTapNext } = usePageShared({
    title_key: "lab-tests.title",
    prev_page_name: "medical-history",
    next_page_name: "womac-home"
  })

  const rulesMap: Record<string, LogicRules> = {

    'ifXRay':       { conflictGroups: [[0, 1]] },
    'ifMRI':        { conflictGroups: [[0, 1]] },
    'ifUltraSound': { conflictGroups: [[0, 1]] },

    'XRayStatus':       { conflictGroups: [[0, 1]] },
    'MRIStatus':        { conflictGroups: [[0, 1]] }, 
    'UltraSoundStatus': { conflictGroups: [[0, 1]] },
  };

  const handleCheck = (key: keyof LtData, index: number) => {
    const rule = rulesMap[key];
    
    if (rule) {
      checkRules(ltData[key], index, rule);
    }
  }

  return {
    ltData,
    onTapNext,
    onTapBack,
    handleCheck
  }
}