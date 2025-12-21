import liuEnv from "~/utils/liu-env"

const _env = liuEnv.getEnv()
const baseUrl = _env.API_BASE_URL

export default {
  HELLO: `${baseUrl}/hello-world`,
  BASIC_INFO_POST: `${baseUrl}/v1/basic-info/post`,
  BASIC_INFO_READ: `${baseUrl}/v1/basic-info/read`,
  METRICS_POST: `${baseUrl}/v1/metrics/post`,
  METRICS_READ: `${baseUrl}/v1/metrics/read`,
  CHECK_IN_POST: `${baseUrl}/v1/check-in/post`,
  CHECK_IN_READ: `${baseUrl}/v1/check-in/read`,
  
  // 登录前，获取 state 和 wxGzhAppid
  PRE_LOGIN: `${baseUrl}/v1/user/login-permission`,
}