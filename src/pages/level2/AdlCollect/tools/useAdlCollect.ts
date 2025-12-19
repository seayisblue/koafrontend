import { reactive, watch } from "vue"
import type { AdlData, AdlItem } from "./types"
import type { AdlCacheItem } from "~/utils/controllers/tools/types"
import { KoaController } from "~/utils/controllers/KoaController"
import { usePageShared } from "~/pages/shared/usePageShared"
import valTool from "~/utils/basic/val-tool"

export const default_list1: AdlItem[] = [
  // 进食
  {
    title_key: "adl-collect.ha_1",
    selected_idx: -1,
    total: 10,
    item_i18n_key: "adl-items-a",
  },
  // 洗澡
  {
    title_key: "adl-collect.ha_2",
    selected_idx: -1,
    total: 10,
    item_i18n_key: "adl-items-a",
  },
  // 穿衣
  {
    title_key: "adl-collect.ha_3",
    desc_key: "adl-collect.da_3",
    selected_idx: -1,
    total: 10,
    item_i18n_key: "adl-items-a",
  },
  // 个人卫生（修饰）
  {
    title_key: "adl-collect.ha_4",
    desc_key: "adl-collect.da_4",
    selected_idx: -1,
    total: 5,
    item_i18n_key: "adl-items-a",
  },
]


export const default_list2: AdlItem[] = [
  // 进出卫生间
  {
    title_key: "adl-collect.hb_1",
    selected_idx: -1,
    total: 10,
    item_i18n_key: "adl-items-d",
  },
  // 大便
  {
    title_key: "adl-collect.hb_2",
    selected_idx: -1,
    total: 10,
    item_i18n_key: "adl-items-b",
  },
  // 小便
  {
    title_key: "adl-collect.hb_3",
    selected_idx: -1,
    total: 10,
    item_i18n_key: "adl-items-b",
  },
]

export const default_list3: AdlItem[] = [
  // 平地行走
  {
    title_key: "adl-collect.hc_1",
    selected_idx: -1,
    total: 15,
    item_i18n_key: "adl-items-c",
  },
  // 上下楼梯
  {
    title_key: "adl-collect.hc_2",
    selected_idx: -1,
    total: 10,
    item_i18n_key: "adl-items-d",
  },
  // 床椅转移
  {
    title_key: "adl-collect.hc_3",
    desc_key: "adl-collect.dc_3",
    selected_idx: -1,
    total: 15,
    item_i18n_key: "adl-items-d",
  },
]

export function useAdlLists() {
  const list1 = valTool.copyObject(default_list1)
  const list2 = valTool.copyObject(default_list2)
  const list3 = valTool.copyObject(default_list3)

  packageRadioTextKeys(list1)
  packageRadioTextKeys(list2)
  packageRadioTextKeys(list3)
  return { list1, list2, list3 }
}


export function useAdlCollect() {
  const { list1, list2, list3 } = useAdlLists()
  loadADL(list1)
  loadADL(list2)
  loadADL(list3)

  const acData = reactive<AdlData>({
    list1,
    list2,
    list3,
  })

  watch(acData, (newV) => {
    const list = [...newV.list1, ...newV.list2, ...newV.list3]
    saveADL(list)
  })

  const { onTapNext, onTapBack } = usePageShared({
    title_key: "adl-collect.title",
    prev_page_name: "womac-result",
    next_page_name: "adl-result",
  })

  return {
    acData,
    onTapNext,
    onTapBack,
  }
}


function saveADL(
  list: AdlItem[],
) {
  const tmpList: AdlCacheItem[] = list.map(v => {
    return {
      title_key: v.title_key,
      selected_idx: v.selected_idx,
    }
  })
  KoaController.setADL(tmpList)
}


function loadADL(
  list: AdlItem[],
) {
  const arr = KoaController.getADL()
  if(!arr) return
  for(let i=0; i<arr.length; i++) {
    const v1 = arr[i]
    const v3 = list.find(v2 => v2.title_key === v1.title_key)
    if(v3) {
      v3.selected_idx = v1.selected_idx
    }
  }
}

function packageRadioTextKeys(
  list: AdlItem[],
) {
  for(let i = 0; i < list.length; i++) {
    const v1 = list[i]
    const key1 = v1.item_i18n_key
    const radio_item_keys: string[] = []
    for(let j = 1; j < 5; j++) {
      let textKey = `${key1}.i${j}`
      radio_item_keys.push(textKey)
    }
    v1.radio_item_keys = radio_item_keys
  }
}
