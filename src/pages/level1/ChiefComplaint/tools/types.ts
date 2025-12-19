import type { CheckboxItem } from "~/components/CustomCheckboxs/tools/types"

export interface CcData {

  pain_locations: CheckboxItem[]

  pain_level?: number              // 疼痛程度 (0~10)
  pain_nature_idx?: number         // 疼痛性质 的索引
  pain_duration_idx?: number       // 疼痛持续 的索引

  stiffness_duration_idx?: number   // 僵硬情况 的索引

  knee_limit?: number         // 膝关节屈伸是否受限 的索引
  joint_stiffness?: number    // 关节卡顿 的索引
  knee_observations: CheckboxItem[]         // 观察膝盖
  temperature?: number         // 皮温升高 的索引
}