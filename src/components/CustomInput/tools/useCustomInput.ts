import type { Ref } from "vue";
import type { CustomInputProps } from "./types";
import typeCheck from "~/utils/basic/type-check";

export function useCustomInput(
  valRef: Ref<string | undefined>,
  props: CustomInputProps,
) {

  const handleDate = (newV: string) => {
    newV = newV.replace(/\//g, "-")
    valRef.value = newV
  }

  const whenChange = (e: any) => {
    let newV = e.target.value
    if(!typeCheck.isString(newV)) return
    if(props.type === "date") {
      handleDate(newV)
      return
    }
    valRef.value = newV
  }

  const whenBlur = (e: any) => {
    let newV = e.target.value
    if(!typeCheck.isString(newV)) return
    if(props.type === "date") {
      handleDate(newV)
      return
    }
  }

  return {
    whenChange,
    whenBlur,
  }

}