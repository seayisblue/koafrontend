import typeCheck from "../utils/basic/type-check";
import valTool from "../utils/basic/val-tool";
import liuApi from "../utils/liu-api";
import type { LiuReqOptions, LiuReqReturn } from "./tools/types";

function _handleError(err: any) {
  const errMsg: unknown = err.toString?.()
  const errName = err.name
  let errMsg2 = ""  // 转成小写的 errMsg

  if (typeCheck.isString(errMsg)) {
    errMsg2 = errMsg.toLowerCase()
  }

  if (errName === "TimeoutError") {
    return { code: "F0002" }
  }
  if (errName === "AbortError") {
    return { code: "F0003" }
  }
  if (errName === "TypeError") {
    if (errMsg2.includes("failed to fetch")) {
      return { code: "B0001" }
    }
  }

  return { code: "C0001" }
}

async function request<
  T extends Record<string, any>,  // 返回类型
  U extends Record<string, any> = Record<string, any>,  // 请求体类型
>(
  url: string,
  body?: U,
  opt?: LiuReqOptions,
): Promise<LiuReqReturn<T>> {

  const init: RequestInit = {
    method: opt?.method ?? "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: valTool.objToStr(body),
  }

  if(opt?.signal) {
    init.signal = opt.signal
  }
  else if(liuApi.canIUse.abortSignalTimeout()) {
    init.signal = AbortSignal.timeout(opt?.timeout ?? 10000)
  }

  let res: Response
  try {
    res = await fetch(url, init)
  }
  catch(err: any) {
    console.warn("fetch err...........")
    const errRes = _handleError(err)
    return errRes
  }

  if(!res) {
    console.warn("liu-req fail: ")
    console.log(res)
    console.log(" ")
    return { code: "C0001" }
  }

  const status = res.status

  // http 状态码: 后端框架或底层服务器异常
  if(status === 500) {
    return { code: "B0500" }
  }
  // 其他错误皆视为后端在维护中
  if(status > 500 && status < 600) {
    return { code: `B0001` }
  }

  const res2 = await res.json() as LiuReqReturn<T>
  return res2
}

export default {
  request,
}