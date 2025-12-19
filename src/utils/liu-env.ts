import type { LiuSystemEnv } from "./tools/types"

let _env: LiuSystemEnv | undefined

function getEnv() {
  if(_env) return _env

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  const OSS_CDN = import.meta.env.VITE_OSS_CDN

  _env = {
    API_BASE_URL: API_BASE_URL || "/api",
    OSS_CDN,
  }
  return _env
}

export default {
  getEnv,
}