import { useRouteAndLiuRouter } from "~/routes/liu-router";
import type { AutoExamType } from "./types";
import { ref, watch } from "vue";
import typeCheck from "~/utils/basic/type-check";

export function useAeType() {
  const aeType = ref<AutoExamType>()
  const rr = useRouteAndLiuRouter()

  watch(rr.route, async (newV) => {
    const _aeType = newV.params.aeType
    if(!typeCheck.isString(_aeType)) return
    aeType.value = _aeType as AutoExamType
  }, { immediate: true })

  return {
    aeType,
    rr,
  }
}
