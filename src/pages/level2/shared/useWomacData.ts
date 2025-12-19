import { reactive, watch } from "vue"
import { useDebounceFn } from "~/hooks/useVueUse";
import valTool from "~/utils/basic/val-tool";
import { KoaController, type ScaleKey } from "~/utils/controllers/KoaController"

interface WomacData {
  questions: number[]
}

export function useWomacData(
  num: number,
  key: ScaleKey,
) {
  const questions: number[] = []
  for(let i=0; i<num; i++) {
    questions.push(-1)
  }
  const womacData = reactive<WomacData>({
    questions,
  })


  const _init = () => {
    const cacheData = KoaController.getWomacData(key)
    if(cacheData?.length) {
      womacData.questions = cacheData
    }
  }
  _init()

  const _save = useDebounceFn(() => {
    const copiedQuestions = valTool.copyObject(womacData.questions)
    KoaController.setWomacData(key, copiedQuestions)
  }, 500)
  watch(womacData.questions, () => {
    _save()
  }, { deep: true })

  return {
    womacData,
  }
}