import { reactive, watch } from "vue"
import type { SasData, SasItem } from "./types"
import { KoaController } from "~/utils/controllers/KoaController"
import valTool from "~/utils/basic/val-tool"
import { usePageShared } from "~/pages/shared/usePageShared"
import cui from "~/components/custom-ui"

const texts = [
  "我觉得比平时容易紧张或着急",
  "我无缘无故在感到害怕",
  "我容易心里烦乱或感到惊恐",
  "我觉得我可能将要发疯",
  "我觉得一切都很好，也不会发生什么不幸",
  "我手脚发抖打颤",
  "我因为头疼、颈痛和背痛而苦恼",
  "我觉得容易衰弱和疲乏",
  "我觉得心平气和，并且容易安静坐着",
  "我觉得心跳得很快",
  "我因为一阵阵头晕而苦恼",
  "我有晕倒发作，或觉得要晕倒似的",
  "我吸气呼气都感到很容易",
  "我的手脚麻木和刺痛",
  "我因为胃痛和消化不良而苦恼",
  "我常常要小便",
  "我的手脚常常是干燥温暖的",
  "我脸红发热",
  "我容易入睡并且一夜睡得很好",
  "我做恶梦"
]


function initList() {
  const list: SasItem[] = []
  const oldList = KoaController.getSAS() ?? []

  for(let i = 0; i < texts.length; i++) {
    const v = texts[i]
    const oldItem = oldList.find(v2 => v2.question === v)
    const obj: SasItem = {
      question: v,
      selected_idx: oldItem?.selected_idx ?? -1,
    }
    list.push(obj)
  }

  return list
}


export function useSasCollect() {
  //KoaController.setSAS([])      // 清空缓存，用于测试弹窗
  const list = initList()

  const sasData = reactive<SasData>({
    list,
  })
  watch(() => sasData.list, (newV) => {
    const newList = valTool.copyObject(newV)
    KoaController.setSAS(newList)
  }, { deep: true })

 watch(() => sasData.list[0].selected_idx, (newVal, oldVal) => {
  if (oldVal === -1 && newVal !== -1) {
 
    cui.showModal({
      title: "温馨提示",
      content: "以下题目若不选择\n则默认选择 \"没有或很少\"",
      confirmText: "知道了",
      showCancel: false,
    })
  }
})

  const { onTapNext, onTapBack } = usePageShared({
    title_key: "sas-collect.title",
    prev_page_name: "womac-result",
    next_page_name: "sas-result",
  })

  return { sasData, onTapNext, onTapBack }
}
