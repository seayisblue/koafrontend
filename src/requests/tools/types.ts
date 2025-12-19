

export interface LiuReqOptions {
  method?: "POST" | "GET" | "PUT" | "DELETE"
  signal?: AbortSignal     // 信号对象，用于中止 fetch() 请求
  timeout?: number         // 超时的毫秒数，默认为 10000; 当 signal 属性存在时，此值无意义
  headers?: Record<string, string>
}

export interface LiuReqReturn<T> {
  code: string
  message?: string
  data?: T
}