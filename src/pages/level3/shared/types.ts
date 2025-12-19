import type { CheckboxItem } from "~/components/CustomCheckboxs/tools/types"
import type { FileKey } from "../../../config/files"


export interface QaItem {
  question: string
  type: "radio" | "checkbox"
  checkboxItems?: CheckboxItem[]
  radioTexts?: string[]
  radioIdx?: number
  desc?: string
}

export interface VideoItem {
  id: FileKey
  link: string
  qaItems?: QaItem[]
}

export type AutoExamType = "visual-check"  // 视诊
  | "touch"                 // 触诊
  | "lying-range"           // 卧位活动度
  | "muscle-intensity"      // 肌力活动度
  | "lying-leg-rise"        // 直腿抬高
  | "standing-endurance"    // 站立耐力
  | "wall-sit"              // 靠墙蹲起
  | "dynamic-standing"      // 动态站立
  | "tug"

export interface AutoExam {
  type: AutoExamType
  videos: VideoItem[]
}