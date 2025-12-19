

// 将 "秒" / "分" / "时" / "天" 转为 毫秒数
const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const WEEK = 7 * DAY

// 返回未经过标定的时间
const getLocalTime = () => {
  return Date.now()
}

const getTimezone = () => {
  const d = new Date()
  const t = d.getTimezoneOffset()
  const t2 = -t / 60
  return t2
}

/**
 * check whether the stamp is within a range of milliseconds
 * @param stamp some last stamp
 * @param range 
 */
const isWithinMillis = (
  stamp: number,
  ms: number,
) => {
  const now = getLocalTime()
  const diff = now - stamp
  if(diff < ms) return true
  return false
}


export default {
  getLocalTime,
  getTime: getLocalTime,
  getTimezone,
  isWithinMillis,
  SECOND,
  MINUTE,
  HOUR,
  DAY,
  WEEK,
}