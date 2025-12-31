import { reactive, watch } from "vue";
import type { SasData, SasItem } from "./types";
import { KoaController } from "~/utils/controllers/KoaController";
import valTool from "~/utils/basic/val-tool";
import { usePageShared } from "~/pages/shared/usePageShared";
import cui from "~/components/custom-ui";
import { texts } from "./questions";
import { postSAS } from "./scripts";
import { handleResultOfPosting } from "~/pages/shared/ui-tip";

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
  const { onTapNext: sharedOnTapNext, onTapBack, rr } = usePageShared({
    title_key: "sas-collect.title",
    prev_page_name: "womac-result",
    next_page_name: "sas-result",
  })
  
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

  const onTapNext = async () => {
    sharedOnTapNext()
    const res = await postSAS(sasData);
    const success = await handleResultOfPosting(res);
    if (!success) rr.router.naviBack();
  }

  return { sasData, onTapNext, onTapBack }
}
