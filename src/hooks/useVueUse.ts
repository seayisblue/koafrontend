import { 
  useWindowSize, 
  useThrottleFn,
  useDebounceFn,
  useWindowScroll,
} from "@vueuse/core"

export {
  // 【节流函数】在特定周期（毫秒内）只触发一次
  // 若该周期内没有触发过，则马上去触发
  // 否则直接忽略调用
  useThrottleFn,

  // 【防抖函数】短时间多次触发，只在最后一次等待若干 ms 后触发
  useDebounceFn,

  useWindowScroll,

  useWindowSize,
}