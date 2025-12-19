
import { useDebounceFn } from "~/hooks/useVueUse";
import { KoaController, type Level1Key, type Level2Key } from "~/utils/controllers/KoaController";
import { watch } from "vue";
import valTool from "~/utils/basic/val-tool";
import typeCheck from "~/utils/basic/type-check";


export function useKoaLevel1(
  data: Record<string, any>,
  key: Level1Key,
) {

  const _init = () => {
    const obj = KoaController.getLevel1Data<typeof data>(key)
    if(obj === undefined) return
    for(const k in obj) {
      const val = obj[k]
      if(typeCheck.isUndefined(val)) continue
      data[k] = val
    }
  }
  _init()

  const _save = useDebounceFn(() => {
    const obj = valTool.copyObject(data)
    KoaController.setLevel1Data<typeof data>(key, obj)
  }, 1000)

  watch(data, (newV) => {
    _save()
  })
}

export function useKoaLevel2(
  data: Record<string, any>,
  key: Level2Key,
) {

  const _init = () => {
    const obj = KoaController.getLevel2Data<typeof data>(key)
    if(obj === undefined) return
    for(const k in obj) {
      const val = obj[k]
      if(typeCheck.isUndefined(val)) continue
      data[k] = val
    }
  }
  _init()

  const _save = useDebounceFn(() => {
    const obj = valTool.copyObject(data)
    KoaController.setLevel2Data<typeof data>(key, obj)
  }, 1000)

  watch(data, (newV) => {
    _save()
  })
}