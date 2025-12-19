import liuEnv from "~/utils/liu-env"

const filePaths = {
  // 轻度康复 - 神经肌肉训练
  "knee_stretch_when_sitting": "mild/knee_stretch_when_sitting.mp4",
  "slide_forward_and_back_with_balancing_pad": "mild/slide_forward_and_back_with_balancing_pad.mp4",
  "walk_up_and_down_the_stairs": "mild/walk_up_and_down_the_stairs.mp4",
  "walk_up_and_down_the_block": "mild/walk_up_and_down_the_block.mp4",
  "advanced_stand_to_sit": "mild/advanced_stand_to_sit.mp4",
  "stand_on_one_leg_with_balancing_pad": "mild/stand_on_one_leg_with_balancing_pad.mp4",
  "stand_on_one_leg_against_wall": "mild/stand_on_one_leg_against_wall.mp4",
  "quadriceps_stretching": "mild/quadriceps_stretching.mp4",

  // 中度康复 - 神经肌肉训练
  "walk_straight": "moderate/walk_straight.mp4",
  "mini_squat": "moderate/mini_squat.mp4",
  "stand_on_one_leg": "moderate/stand_on_one_leg.mp4",
  "stand_to_sit": "moderate/stand_to_sit.mp4",

  // 重度康复 - 神经肌肉训练
  "calf_triceps_stretch": "severe/calf_triceps_stretch.mp4",
  "hamstrings_stretch": "severe/hamstrings_stretch.mp4",
  "hamstrings_contraction": "severe/hamstrings_contraction.mp4",
}

export type FileKey2 = keyof typeof filePaths
export type VideoLinks2 = Record<FileKey2, string>
let videoLinks2: VideoLinks2 | undefined

export function getVideoLinks2(
) {
  if(videoLinks2) return videoLinks2
  videoLinks2 = {} as VideoLinks2

  const _env = liuEnv.getEnv()
  const domain = _env.OSS_CDN ?? ""
  const prefix = `${domain}/koa-release/exercise/`

  const keys = Object.keys(filePaths)
  for(let i=0; i<keys.length; i++) {
    const key = keys[i] as FileKey2
    videoLinks2[key] = `${prefix}${filePaths[key]}`
  }

  return videoLinks2
}


