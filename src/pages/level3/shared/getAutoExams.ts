import { getVideoLinks } from "~/config/files";
import type { AutoExam } from "./types";


export function getAutoExams() {
  const v = getVideoLinks()
  
  const autoExams: AutoExam[] = [
    // 视诊
    // {
    //   type: "visual-check",
    //   videos: [
    //     {
    //       id: "lying_visual_check",
    //       link: v.lying_visual_check,
    //     },
    //     {
    //       id: "sit_visual_check",
    //       link: v.sit_visual_check,
    //     },
    //     {
    //       id: "stand_front_visual_check",
    //       link: v.stand_front_visual_check,
    //     },
    //     {
    //       id: "stand_side_visual_check",
    //       link: v.stand_side_visual_check,
    //       qaItems: [
    //         {
    //           question: "症状出现位置？",
    //           type: "radio",
    //           radioIdx: -1,
    //           radioTexts: [
    //             "单侧", "双侧"
    //           ]
    //         },
    //         {
    //           question: "症状表现？",
    //           type: "checkbox",
    //           checkboxItems: [
    //             {
    //               text: "患侧膝盖肤色呈红色",
    //               selected: false,
    //             },
    //             {
    //               text: "患侧膝盖肤色呈暗红色",
    //               selected: false,
    //             },
    //             {
    //               text: "患侧膝盖肤色发黑",
    //               selected: false,
    //             },
    //             {
    //               text: "患侧膝盖皮肤存在瘀斑",
    //               selected: false,
    //             },
    //             {
    //               text: "患侧膝盖有肿胀迹象",
    //               selected: false,
    //             },
    //             {
    //               text: "患侧肌肉有萎缩迹象",
    //               selected: false,
    //             },
    //             {
    //               text: "X型腿（站立时双膝靠得很近，但脚踝之间留有明显空隙）",
    //               selected: false,
    //             },
    //             {
    //               text: "O型腿（站立时脚踝可以靠得很近，但双膝不能靠拢）",
    //               selected: false,
    //             }
    //           ]
    //         }
    //       ]
    //     },
    //     {
    //       id: "lying_temperature",
    //       link: v.lying_temperature,
    //     },
    //     {
    //       id: "sitting_temperature",
    //       link: v.sitting_temperature,
    //       qaItems: [
    //         {
    //           question: "患病膝关节皮肤温度？",
    //           type: "radio",
    //           radioIdx: -1,
    //           radioTexts: ["升高", "正常"]
    //         }
    //       ]
    //     }
    //   ]
    // },

    // 触诊
    {
      type: "touch",
      videos: [
        {
          id: "lying_touch",
          link: v.lying_touch,
          qaItems: [
            {
              question: "膝关节压痛",
              type: "checkbox",
              checkboxItems: [
                {
                  text: "无压痛",
                  selected: false,
                },
                {
                  text: "髌骨周围压痛",
                  selected: false,
                },
                {
                  text: "膝盖内外侧压痛",
                  selected: false,
                },
                {
                  text: "髌腱压痛",
                  selected: false,
                },
              ]
            },
            {
              question: "膝关节肿胀",
              type: "radio",
              radioIdx: -1,
              radioTexts: ["有", "无"],
            },
            {
              question: "膝关节积液",
              type: "radio",
              radioIdx: -1,
              radioTexts: ["有", "无"],
            },
            {
              question: "膝关节存在哪些情况",
              type: "checkbox",
              checkboxItems: [
                {
                  text: "存在骨赘",
                  selected: false,
                },
                {
                  text: "存在骨刺",
                  selected: false,
                },
                {
                  text: "触摸时有硬性隆起",
                  selected: false,
                },
                {
                  text: "无以上情况",
                  selected: false,
                },
              ]
            },
            {
              question: "髌骨下有无压痛",
              type: "radio",
              radioIdx: -1,
              radioTexts: ["有", "无"],
            },
            {
              question: "膝关节后方（腘窝区域）有无肿块",
              type: "radio",
              radioIdx: -1,
              radioTexts: ["有", "无"],
            }
          ]
        },
        {
          id: "sitting_back_touch",
          link: v.sitting_back_touch,
          qaItems: [
            {
              question: "腘窝有无压痛",
              type: "radio",
              radioIdx: -1,
              radioTexts: ["有", "无"],
            },
            {
              question: "腘窝有无肿块",
              type: "radio",
              radioIdx: -1,
              radioTexts: ["有", "无"],
            },
            {
              question: "腘绳肌肌腱（其一）处有无压痛",
              type: "radio",
              radioIdx: -1,
              radioTexts: ["有", "无"],
            },
            {
              question: "腘绳肌肌腱（其二）及鹅足肌腱处有无压痛",
              type: "radio",
              radioIdx: -1,
              radioTexts: ["有", "无"],
            },
          ]
        },
        {
          id: "sitting_front_touch",
          link: v.sitting_front_touch,
          qaItems: [
            {
              question: "膝关节压痛？",
              type: "checkbox",
              checkboxItems: [
                {
                  text: "无压痛",
                  selected: false,
                },
                {
                  text: "髌骨周围压痛",
                  selected: false,
                },
                {
                  text: "膝盖内外侧压痛",
                  selected: false,
                },
                {
                  text: "髌腱压痛",
                  selected: false,
                }
              ]
            },
            {
              question: "膝关节肿胀？",
              type: "radio",
              radioIdx: -1,
              radioTexts: ["有", "无"]
            },
            {
              question: "膝关节积液？",
              desc: "压迫关节时有皮肤波动感，感觉到液体移动",
              type: "radio",
              radioIdx: -1,
              radioTexts: ["有", "无"]
            },
            {
              question: "髌骨下有无压痛",
              type: "radio",
              radioIdx: -1,
              radioTexts: ["有", "无"]
            },
            {
              question: "膝关节后方有无肿块",
              desc: "腘窝区域",
              type: "radio",
              radioIdx: -1,
              radioTexts: ["有", "无"]
            }
          ]
        }
      ]
    },

    // 卧位活动度
    // {
    //   type: "lying-range",
    //   videos: [
    //     {
    //       id: "lying_range_both_legs",
    //       link: v.lying_range_both_legs,
    //       qaItems: [
    //         {
    //           question: "🥗 健侧膝关节弯曲",
    //           type: "radio",
    //           radioIdx: -1,
    //           radioTexts: [
    //             "我能轻松让脚跟几乎碰到臀部",
    //             "我能弯曲膝盖，但脚跟距离臀部还差一点（约一拳距离）",
    //             "我能弯曲膝盖，但只能到一半位置（明显受限）",
    //             "我能弯曲膝盖，但只能到一半位置（明显受限）",
    //             "几乎无法弯曲/疼痛明显无法进行",
    //           ]
    //         },
    //         {
    //           question: "🥗 健侧膝关节伸直",
    //           type: "radio",
    //           radioIdx: -1,
    //           radioTexts: [
    //             "膝盖能完全伸平，能贴床面",
    //             "伸直时膝盖有轻微悬空（离床约1-2cm）",
    //             "伸直时膝盖明显抬起（离床约3-5cm）",
    //             "无法完全伸直，离床超过一拳",
    //             "无法伸直，伴明显疼痛或卡住感"
    //           ]
    //         },
    //         {
    //           question: "🤕 患侧膝关节弯曲",
    //           type: "radio",
    //           radioIdx: -1,
    //           radioTexts: [
    //             "我能轻松让脚跟几乎碰到臀部",
    //             "我能弯曲膝盖，但脚跟距离臀部还差一点（约一拳距离）",
    //             "我能弯曲膝盖，但只能到一半位置（明显受限）",
    //             "我能弯曲膝盖，但只能到一半位置（明显受限）",
    //             "几乎无法弯曲/疼痛明显无法进行",
    //           ]
    //         },
    //         {
    //           question: "🤕 患侧膝关节伸直",
    //           type: "radio",
    //           radioIdx: -1,
    //           radioTexts: [
    //             "膝盖能完全伸平，能贴床面",
    //             "伸直时膝盖有轻微悬空（离床约1-2cm）",
    //             "伸直时膝盖明显抬起（离床约3-5cm）",
    //             "无法完全伸直，离床超过一拳",
    //             "无法伸直，伴明显疼痛或卡住感"
    //           ]
    //         },
    //       ]
    //     },
    //     {
    //       id: "lying_range_single_leg",
    //       link: v.lying_range_single_leg,
    //       qaItems: [
    //         {
    //           question: "膝关节弯曲",
    //           type: "radio",
    //           radioIdx: -1,
    //           radioTexts: [
    //             "我能轻松让脚跟几乎碰到臀部",
    //             "我能弯曲膝盖，但脚跟距离臀部还差一点（约一拳距离）",
    //             "我能弯曲膝盖，但只能到一半位置（明显受限）",
    //             "我能弯曲膝盖，但只能到一半位置（明显受限）",
    //             "几乎无法弯曲/疼痛明显无法进行",
    //           ]
    //         },
    //         {
    //           question: "膝关节伸直",
    //           type: "radio",
    //           radioIdx: -1,
    //           radioTexts: [
    //             "膝盖能完全伸平，能贴床面",
    //             "伸直时膝盖有轻微悬空（离床约1-2cm）",
    //             "伸直时膝盖明显抬起（离床约3-5cm）",
    //             "无法完全伸直，离床超过一拳",
    //             "无法伸直，伴明显疼痛或卡住感"
    //           ]
    //         }
    //       ]
    //     }
    //   ]
    // },

    // 肌力活动度测试
    // {
    //   type: "muscle-intensity",
    //   videos: [
    //     {
    //       id: "muscle_intensity_range_test_frontview",
    //       link: v.muscle_intensity_range_test_frontview,
    //     },
    //     {
    //       id: "muscle_intensity_range_test_sideview",
    //       link: v.muscle_intensity_range_test_sideview,
    //       qaItems: [
    //         {
    //           question: "患侧膝盖活动情况：",
    //           type: "radio",
    //           radioIdx: -1,
    //           radioTexts: [
    //             "活动度小于健侧",
    //             "和健侧活动度差不多"
    //           ]
    //         },
    //         {
    //           question: "患侧膝盖活动坚持时间：",
    //           type: "radio",
    //           radioIdx: -1,
    //           radioTexts: [
    //             "坚持时间低于健侧",
    //             "和健侧坚持时间差不多"
    //           ]
    //         },
    //         {
    //           question: "双侧膝盖活动情况：",
    //           type: "radio",
    //           radioIdx: -1,
    //           radioTexts: [
    //             "只有一侧能到达 90°",
    //             "两侧都能到达 90°",
    //             "两侧都无法到达 90°"
    //           ]
    //         },
    //         {
    //           question: "双侧膝盖活动坚持时间：",
    //           type: "radio",
    //           radioIdx: -1,
    //           radioTexts: [
    //             "只有一侧能坚持10秒",
    //             "两侧都能坚持10秒",
    //             "两侧都无法坚持10秒"
    //           ]
    //         }
    //       ]
    //     }
    //   ]
    // },

    // 直腿抬高测试
    // {
    //   type: "lying-leg-rise",
    //   videos: [
    //     {
    //       id: "lying_leg_rise",
    //       link: v.lying_leg_rise,
    //       qaItems: [
    //         {
    //           question: "👈 左侧膝盖疼痛相关:",
    //           type: "checkbox",
    //           checkboxItems: [
    //             {
    //               text: "疼痛出现在膝盖周围",
    //               selected: false,
    //             },
    //             {
    //               text: "疼痛出现在大腿",
    //               selected: false,
    //             },
    //             {
    //               text: "疼痛出现在小腿",
    //               selected: false,
    //             },
    //             {
    //               text: "没有疼痛",
    //               selected: false,
    //             }
    //           ]
    //         },
    //         {
    //           question: "👈 左侧膝盖抬高高度：",
    //           type: "radio",
    //           radioIdx: -1,
    //           radioTexts: [
    //             "抬高小于 45°",
    //             "抬高小于 90°",
    //             "抬高接近 90°"
    //           ],
    //         },
    //         {
    //           question: "👉 右侧膝盖疼痛相关:",
    //           type: "checkbox",
    //           checkboxItems: [
    //             {
    //               text: "疼痛出现在膝盖周围",
    //               selected: false,
    //             },
    //             {
    //               text: "疼痛出现在大腿",
    //               selected: false,
    //             },
    //             {
    //               text: "疼痛出现在小腿",
    //               selected: false,
    //             },
    //             {
    //               text: "没有疼痛",
    //               selected: false,
    //             }
    //           ]
    //         },
    //         {
    //           question: "👉 右侧膝盖抬高高度：",
    //           type: "radio",
    //           radioIdx: -1,
    //           radioTexts: [
    //             "抬高小于 45°",
    //             "抬高小于 90°",
    //             "抬高接近 90°"
    //           ],
    //         },
    //       ]
    //     }
    //   ]
    // },

    // 站立耐力测试
    // {
    //   type: "standing-endurance",
    //   videos: [
    //     {
    //       id: "standing_endurance_frontview",
    //       link: v.standing_endurance_frontview,
    //       qaItems: [
    //         {
    //           question: "保持时间:",
    //           type: "radio",
    //           radioIdx: -1,
    //           radioTexts: [
    //             "可以坚持 4-5 分钟",
    //             "可以坚持 3-4 分钟",
    //             "可以坚持 2-3 分钟",
    //             "可以坚持 1-2 分钟",
    //             "可以坚持 30 秒 - 1分钟",
    //             "坚持不到 30 秒",
    //           ]
    //         }
    //       ]
    //     }
    //   ]
    // },
    
    // 靠墙蹲起测试
    // {
    //   type: "wall-sit",
    //   videos: [
    //     {
    //       id: "stand_up_before_wall",
    //       link: v.stand_up_before_wall,
    //       qaItems: [
    //         {
    //           question: "坚持时间:",
    //           type: "radio",
    //           radioIdx: -1,
    //           radioTexts: [
    //             "可以坚持 45 秒以上",
    //             "可以坚持 20-45 秒",
    //             "可以坚持不到 20 秒",
    //           ]
    //         }
    //       ]
    //     }
    //   ]
    // },

    // 单腿站立测试
    // {
    //   type: "dynamic-standing",
    //   videos: [
    //     {
    //       id: "dynamic_standing_test_frontview",
    //       link: v.dynamic_standing_test_frontview,
    //     },
    //     {
    //       id: "dynamic_standing_test_sideview",
    //       link: v.dynamic_standing_test_sideview,
    //       qaItems: [
    //         {
    //           question: "睁眼单腿站立情况：",
    //           type: "radio",
    //           radioIdx: -1,
    //           radioTexts: [
    //             "能坚持 20-30 秒",
    //             "能坚持 10-20 秒",
    //             "坚持不到 10 秒"
    //           ]
    //         },
    //         {
    //           question: "闭眼单腿站立情况：",
    //           type: "radio",
    //           radioIdx: -1,
    //           radioTexts: [
    //             "能坚持 20-30 秒",
    //             "能坚持 10-20 秒",
    //             "坚持不到 10 秒"
    //           ]
    //         }
    //       ]
    //     }
    //   ]
    // },

    // TUG 测试
    {
      type: "tug",
      videos: [
        {
          id: "timed_up_and_go_test",
          link: v.timed_up_and_go_test,
          qaItems: [
            {
              question: "完成测试用时：",
              type: "radio",
              radioIdx: -1,
              radioTexts: [
                "超过 30 秒",
                "20-30 秒",
                "10-20 秒",
                "不到 10 秒",
              ]
            }
          ]
        }
      ]
    }
  ]


  return autoExams
}