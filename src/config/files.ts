import liuEnv from "~/utils/liu-env"

const filePaths = {
  // 视诊
  "lying_visual_check": "lying_visual_check.mp4",
  "sit_visual_check": "sit_visual_check.mp4",
  "stand_front_visual_check": "stand_front_visual_check.mp4",
  "stand_side_visual_check": "stand_side_visual_check.mp4",
  "lying_temperature": "lying_temperature.mp4",
  "sitting_temperature": "sitting_temperature.mp4",

  // 触诊
  "lying_touch": "lying_touch.mp4",
  "sitting_back_touch": "sitting_back_touch.mp4",
  "sitting_front_touch": "sitting_front_touch.mp4",

  // 卧位活动度
  "lying_range_both_legs": "lying_range_both_legs.mp4",
  "lying_range_single_leg": "lying_range_single_leg.mp4",

  // 肌力活动度测试
  "muscle_intensity_range_test_frontview": "muscle_intensity_range_test_frontview.mp4",
  "muscle_intensity_range_test_sideview": "muscle_intensity_range_test_sideview.mp4",

  // 直腿抬高
  "lying_leg_rise": "lying_leg_rise.mp4",

  // 站立耐力
  "standing_endurance_frontview": "standing_endurance_frontview.mp4",
  "standing_endurance_sideview": "standing_endurance_sideview.mp4",

  // 靠墙蹲起
  "stand_up_before_wall": "stand_up_before_wall.mp4",

  // 单腿站立
  "dynamic_standing_test_frontview": "dynamic_standing_test_frontview.mp4",
  "dynamic_standing_test_sideview": "dynamic_standing_test_sideview.mp4",

  // TUG 测试
  "timed_up_and_go_test": "timed_up_and_go_test_v2.mp4",

}

export type FileKey = keyof typeof filePaths
export type VideoLinks = Record<FileKey, string>
let videoLinks: VideoLinks | undefined

export function getVideoLinks() {
  if(videoLinks) return videoLinks
  videoLinks = {} as VideoLinks

  const _env = liuEnv.getEnv()
  const domain = _env.OSS_CDN ?? ""
  const prefix = `${domain}/koa-release/visual_check/`

  const keys = Object.keys(filePaths)
  for(let i=0; i<keys.length; i++) {
    const key = keys[i] as FileKey
    videoLinks[key] = `${prefix}${filePaths[key]}`
  }

  return videoLinks
}


