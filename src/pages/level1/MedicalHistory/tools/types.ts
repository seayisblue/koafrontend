import type { CheckboxItem } from "~/components/CustomCheckboxs/tools/types"

export interface MhData {
  knee_history: string            // 膝关节相关病史
  family_history_idx?: number     // 家族史

  list1: CheckboxItem[]
  list2: CheckboxItem[]
  list3: CheckboxItem[]
  list4: CheckboxItem[]
  list5: CheckboxItem[]
  

}