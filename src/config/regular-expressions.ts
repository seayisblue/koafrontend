

export function reg_exp() {
  const obj = {
    // client device versions
    chrome_version: /chrome\/([\d\.]+)/,
    edge_version: /edg\/([\d\.]+)/,
    firefox_version: /firefox\/([\d\.]+)/,
    safari_version: /version\/([\d\.]+)/,
    arkweb_version: /arkweb\/([\d\.]+)/,
    ios_version: /iphone os ([\d_]+)/,
    line_version: /line\/([\d\.]+)/,
    quark_pc_version: /quarkpc\/([\d\.]+)/,
    quark_mobile_version: /quark\/([\d\.]+)/,
    dingtalk_version: /dingtalk\/([\d\.]+)/,

    name_valid: /[\u4e00-\u9fa5a-zA-Z·.\s]+/,
    phone_valid: /^1[3-9]\d{9}$/,

    email_valid: /^[\w\.-]{1,32}@[\w-]{1,32}\.\w{2,32}[\w\.-]*$/g,
  }

  return obj
}
