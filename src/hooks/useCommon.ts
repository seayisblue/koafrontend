import type { SimpleFunc } from "~/utils/basic/type-tool"
import { onActivated, onDeactivated, onMounted, onBeforeUnmount } from "vue"
import type { CheckboxItem } from "~/components/CustomCheckboxs/tools/types"

export function onLiuActivated(fn: SimpleFunc) {
  
  let mounted = false

  onActivated(() => {
    if(!mounted) return
    fn()
  })

  onMounted(() => {
    fn()
    mounted = true
  })

}

export function onLiuDeactivated(fn: SimpleFunc) {
  onDeactivated(() => fn())
  onBeforeUnmount(() => fn())
}


export function initCheckbox(options: string[]) {
  const list: CheckboxItem[] = []
  for (let i = 0; i < options.length; i++) {
    const v = options[i]
    list.push({ text: v, selected: false })
  }
  return list
} 

