import { i18n } from "~/locales"
import type { SetAppTitleOpt } from "./tools/types"
import * as file from "./about-file"

function setAppTitle(opt: SetAppTitleOpt = {}) {
  let title = ""
  const { val, val_key, val_opt } = opt

  const t = i18n.global.t
  if(val) {
    title = val
  }
  else if(val_key) {
    if(val_opt) title = t(val_key, val_opt)
    else title = t(val_key)
  }
  else {
    title = t("hello.appName")
  }

  document.title = title
}


export default {
  setAppTitle,
  file,
}