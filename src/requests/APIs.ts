import liuEnv from "~/utils/liu-env"

const _env = liuEnv.getEnv()
const baseUrl = _env.API_BASE_URL

export default {
  HELLO: `${baseUrl}/hello-world`,
}