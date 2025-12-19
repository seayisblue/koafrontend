import type { CheckboxItem } from "~/components/CustomCheckboxs/tools/types";
import type { BaseIsOn } from "~/types/types-basic";


export interface LabTestAtom {
  isOn: BaseIsOn
  result?: string
  stamp?: number
}

export interface LtData {
  ifXRay: CheckboxItem[]
  XRayStatus: CheckboxItem[]
  XRayResult: CheckboxItem[]

  ifMRI: CheckboxItem[]
  MRIStatus: CheckboxItem[]
  bone: CheckboxItem[]
  meniscus: CheckboxItem[]
  joint: CheckboxItem[]
  muscle: CheckboxItem[]

  ifUltraSound: CheckboxItem[]
  UltraSoundStatus: CheckboxItem[]
  UltraSoundResult: CheckboxItem[]
}