import type { Ref } from "vue";
import typeCheck from "~/utils/basic/type-check";

export function useCustomTextarea(
  valRef: Ref<string | undefined>,
) {

  const whenChange = (e: any) => {
    let newV = e.target.value
    if(!typeCheck.isString(newV)) return
    valRef.value = newV
  }

  const whenBlur = (e: any) => {
    whenChange(e)
  }

  return {
    whenChange,
    whenBlur,
  }

}