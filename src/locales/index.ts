import { createI18n } from 'vue-i18n'
import zhHans from "./messages/zh-Hans.json"

export const i18n = createI18n({
  locale: "zh-Hans",
  fallbackLocale: "zh-Hans",
  messages: {
    "zh-Hans": zhHans,
  },
  legacy: false,
})

export type LiuI18n = typeof i18n
export type T_i18n = typeof i18n.global.t