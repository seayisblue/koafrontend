

export interface AdlItem {
  title_key: string
  desc_key?: string
  selected_idx: number
  total: number
  item_i18n_key: string
  radio_item_keys?: string[]
}

export interface AdlData {
  list1: AdlItem[]
  list2: AdlItem[]
  list3: AdlItem[]
}