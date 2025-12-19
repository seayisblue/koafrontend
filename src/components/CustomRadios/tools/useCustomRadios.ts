import { ref, toRef, watch } from "vue";
import type { CrItem, CrProps } from "./types";


export function useCustomRadios(
  props: CrProps,
) {
  const list = ref<CrItem[]>([])
  const textKeys = toRef(props, "textKeys")
  const texts = toRef(props, "texts")

  watch([textKeys, texts], ([newTextKeys, newTexts]) => {
    const len1 = newTextKeys?.length ?? 0
    const len2 = newTexts?.length ?? 0
    const len = Math.max(len1, len2)

    const tmpList: CrItem[] = []
    for(let i=0; i<len; i++) {
      const v1 = newTextKeys?.[i]
      const v2 = newTexts?.[i]
      const obj: CrItem = {
        textKey: v1,
        text: v2
      }
      tmpList.push(obj)
    }
    list.value = tmpList
  }, { immediate: true })

  return {
    list,
  }
}