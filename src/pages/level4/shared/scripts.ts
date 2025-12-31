import { KoaController } from "~/utils/controllers/KoaController";
import { type ExerciseItem } from "./types";
import type { LtData } from "~/pages/level1/LabTests/tools/types";
import type { MhData } from "~/pages/level1/MedicalHistory/tools/types";

/**
 * Corpus liberum
 * 膝关节X射线检查若选择“游离体”
 * 运动界面提示语“如果在下蹲过程中出现关节绞锁、弹响，则停止该动作”
 * 打卡界面额外选项“我有不适”
 */
export function hasCorpusLiberum(): boolean {
    const ltData = KoaController.getLevel1Data<LtData>("lab-tests");
    if (ltData === undefined) {
        return false;
    }
    return ltData.XRayResult?.[5]?.selected;
}

export function neuroPlan(normal: ExerciseItem[], special: ExerciseItem[]): ExerciseItem[] {
    const ltData = KoaController.getLevel1Data<LtData>("lab-tests");
    const womacOne = KoaController.getWomacData("one");
    let list = normal;

    /* MRI */
    if (ltData != undefined) {
        /**
         * 选择骨髓病变/骨挫伤
         * 神经肌肉训练特殊推荐
         */
        if (ltData.bone?.[2]?.selected || ltData.bone?.[5]?.selected) {
            return special;
        }
        /**
         * 半月板损伤I/半月板损伤II度
         * 不推荐单腿站立平衡（平衡垫）、单腿站立平衡（髋外展推墙）
         */
        if (ltData.meniscus?.[1]?.selected || ltData.meniscus?.[2]?.selected) {
            list.filter((c) => { return !c.id.includes("balance"); });
        }
    }

    /**
     * womac-one
     * 走平路时、上下楼梯、坐或躺时、站立时中任意一题选择严重及以上
     * 不推荐该题对应的这些训练
     */
    if (womacOne != undefined) {
        /* 上下楼梯 */
        if (womacOne?.[1] === 3 || womacOne?.[1] === 4) {
            list.filter((c) => { return !c.id.includes("stairs"); });
        }
        /* 坐或躺 */
        if (womacOne?.[3] === 3 || womacOne?.[3] === 3) {
            list.filter((c) => { return !c.id.includes("sit"); });
        }
        /* 立 */
        if (womacOne?.[4] === 3 || womacOne?.[4] === 4) {
            list.filter((c) => { return !c.id.includes("stand"); });
        }
    }

    // 处理【优先推荐】
    // 见“流程图”最右侧的“优先推荐”: 
    // https://oiwhwwqc5ft.feishu.cn/wiki/ZsXAw63e4iAfNlk2SVQcp88GnEd
    handlePriorityRecommanded(list);
    
    return list;
}



/***************************************** 处理【优先推荐】的逻辑 *****************************************/

/**
 * 散步/快走优先推荐的运动 ID 列表
 */
const WALKING_PRIORITY_IDS = [
    'walk-up-and-down-the-stairs',
    'walk-up-and-down-the-block',
    'stairs-single',
    'stand-to-sit',
    'advanced-stand-to-sit',
    'stand-on-one-leg',
    'stand-on-one-leg-against-wall',
    'walk-straight',
];

/**
 * 爬楼梯优先推荐的运动 ID 列表
 */
const CLIMBING_STAIRS_PRIORITY_IDS = [
    'knee-stretch-when-sitting',
    'knee-stretch-sitting',
    'walk-up-and-down-the-stairs',
    'walk-up-and-down-the-block',
    'stairs-single',
    'stand-to-sit',
    'advanced-stand-to-sit',
    'stand-on-one-leg',
    'stand-on-one-leg-against-wall',
];

/**
 * 跑步优先推荐的运动 ID 列表
 * 坐位伸膝、迷你蹲、单腿站立平衡、单腿站立平衡（髋外展推墙）、股四头肌牵伸、小腿三头肌拉伸、腘绳肌牵伸
 */
const RUNNING_PRIORITY_IDS = [
    'knee-stretch-when-sitting',           // 坐位伸膝
    'knee-stretch-sitting',                // 坐位伸膝 --> 重度版本
    'mini-squat',                          // 迷你蹲
    'stand-on-one-leg',                    // 单腿站立平衡
    'stand-on-one-leg-with-balancing-pad', // 单腿站立平衡（平衡垫）
    'stand-on-one-leg-against-wall',       // 单腿站立平衡（髋外展推墙）
    'quadriceps-stretching',               // 股四头肌牵伸 --> 轻度版本
    'quadriceps-stretch',                  // 股四头肌牵伸 --> 重度版本
    'quad-stretch',                        // 股四头肌牵伸（另一版本）
    'calf-triceps-stretch',                // 小腿三头肌拉伸
    'hamstring-stretch',                   // 腘绳肌牵伸
];

/**
 * 球拍运动（羽毛球/网球/乒乓球）优先推荐的运动ID列表
 * 站立位髋外展推墙、单腿站立平衡（髋外展推墙）、迷你蹲、单腿站立平衡、腘绳肌牵伸
 */
const RACKET_SPORTS_PRIORITY_IDS = [
    'stand-on-one-leg-against-wall',       // 单腿站立平衡（髋外展推墙）/ 站立位髋外展推墙
    'mini-squat',                          // 迷你蹲
    'stand-on-one-leg',                    // 单腿站立平衡
    'stand-on-one-leg-with-balancing-pad', // 单腿站立平衡（平衡垫）
    'hamstring-stretch',                   // 腘绳肌牵伸
];

/**
 * 游泳优先推荐的运动 ID 列表
 * 小腿三头肌拉伸、腘绳肌牵伸、腘绳肌/股四头肌等长收缩
 */
const SWIMMING_PRIORITY_IDS = [
    'calf-triceps-stretch',                // 小腿三头肌拉伸
    'hamstring-stretch',                   // 腘绳肌牵伸
    'hamstring-contraction',               // 腘绳肌/股四头肌等长收缩
];


/**
 * 骑行优先推荐的运动 ID 列表
 * 坐位伸膝、小腿三头肌拉伸、股四头肌牵伸
 */
const BIKING_PRIORITY_IDS = [
    'knee-stretch-when-sitting',           // 坐位伸膝
    'knee-stretch-sitting',                // 坐位伸膝 --> 重度版本
    'calf-triceps-stretch',                // 小腿三头肌拉伸
    'quadriceps-stretching',               // 股四头肌牵伸 --> 轻度版本
    'quadriceps-stretch',                  // 股四头肌牵伸 --> 重度版本
    'quad-stretch',                        // 股四头肌牵伸（另一版本）
]

/**
 * 登山远足优先推荐的运动 ID 列表
 * 上下台阶训练、上下台阶训练（单个）、前后滑动（平衡垫）、单腿站立平衡、单腿站立平衡（髋外展推墙）、小腿三头肌拉伸、股四头肌牵伸、腘绳肌牵伸
 */
const HIKING_PRIORITY_IDS = [
    'walk-up-and-down-the-stairs',                 // 上下台阶训练
    'walk-up-and-down-the-block',                  // 上下台阶训练（单个）
    'slide-forward-and-back-with-balancing-pad',   // 前后滑动（平衡垫）
    'stand-on-one-leg',                    // 单腿站立平衡
    'stand-on-one-leg-against-wall',       // 单腿站立平衡（髋外展推墙）
    'calf-triceps-stretch',                // 小腿三头肌拉伸
    'quadriceps-stretching',               // 股四头肌牵伸 --> 轻度版本
    'quadriceps-stretch',                  // 股四头肌牵伸 --> 重度版本
    'quad-stretch',                        // 股四头肌牵伸（另一版本）
    'hamstring-stretch',                   // 腘绳肌牵伸
];

/**
 * 太极、瑜伽优先推荐的运动 ID 列表
 * 单腿站立平衡、单腿站立平衡（髋外展推墙）、坐站转移训练、坐站转移训练（进阶版）、小腿三头肌拉伸、股四头肌牵伸、腘绳肌牵伸
 */
const TAI_CHI_PRIORITY_IDS = [
    'stand-on-one-leg',                    // 单腿站立平衡
    'stand-on-one-leg-against-wall',       // 单腿站立平衡（髋外展推墙）
    'stand-to-sit',                        // 坐站转移训练
    'advanced-stand-to-sit',               // 坐站转移训练（进阶版）
    'calf-triceps-stretch',                // 小腿三头肌拉伸
    'quadriceps-stretching',               // 股四头肌牵伸 --> 轻度版本
    'quadriceps-stretch',                  // 股四头肌牵伸 --> 重度版本
    'quad-stretch',                        // 股四头肌牵伸（另一版本）
    'hamstring-stretch',                   // 腘绳肌牵伸
]



/**
 * 是否有特定运动，idx 为特定运动的索引
 * @param idx 特定运动的索引
 * @param mhData 病史采集数据
 * @returns 是否有特定运动
 * 
 * 运动列表：
 *  "散步/快走",
    "爬楼梯",
    "跑步",
    "羽毛球/网球/乒乓球",
    "游泳（特别是蛙泳）",
    "骑自行车",
    "登山/远足",
    "太极拳/瑜伽",
 * 
 */
function _hasSpecificExercise(
    idx: number,
    mhData?: MhData,
) {
    const list5 = mhData?.list5;
    return list5?.[idx]?.selected === true;
}



function handlePriorityRecommanded(list: ExerciseItem[]) {
    const mhData = KoaController.getLevel1Data<MhData>("medical-history")

    const hasWalking = _hasSpecificExercise(0, mhData)
    if (hasWalking) {
        console.log("有选择散步/快走！")
        list.forEach(v => {
            const isPriority = WALKING_PRIORITY_IDS.includes(v.id);
            if (isPriority) {
                v.recommanded = true
            }
        })
    }

    const hasClimbing = _hasSpecificExercise(1, mhData)
    if (hasClimbing) {
        console.log("有选择爬楼梯！")
        list.forEach(v => {
            const isPriority = CLIMBING_STAIRS_PRIORITY_IDS.includes(v.id);
            if (isPriority) {
                v.recommanded = true
            }
        })
    }

    const hasRunning = _hasSpecificExercise(2, mhData)
    if (hasRunning) {
        console.log("有选择跑步！")
        list.forEach(v => {
            const isPriority = RUNNING_PRIORITY_IDS.includes(v.id);
            if (isPriority) {
                v.recommanded = true
            }
        })
    }

    const hasRacketSports = _hasSpecificExercise(3, mhData)
    if (hasRacketSports) {
        console.log("有选择羽毛球/网球/乒乓球！")
        list.forEach(v => {
            const isPriority = RACKET_SPORTS_PRIORITY_IDS.includes(v.id);
            if (isPriority) {
                v.recommanded = true
            }
        })
    }

    const hasSwimming = _hasSpecificExercise(4, mhData)
    if (hasSwimming) {
        console.log("有选择游泳！")
        list.forEach(v => {
            const isPriority = SWIMMING_PRIORITY_IDS.includes(v.id);
            if (isPriority) {
                v.recommanded = true
            }
        })
    }

    const hasBiking = _hasSpecificExercise(5, mhData)
    if (hasBiking) {
        console.log("有选择骑行!")
        list.forEach(v => {
            const isPriority = BIKING_PRIORITY_IDS.includes(v.id);
            if (isPriority) {
                v.recommanded = true
            }
        })
    }

    const hasHiking = _hasSpecificExercise(6, mhData)
    if (hasHiking) {
        console.log("有选择远足！")
        list.forEach(v => {
            const isPriority = HIKING_PRIORITY_IDS.includes(v.id);
            if (isPriority) {
                v.recommanded = true
            }
        })
    }


    const hasTaiChi = _hasSpecificExercise(7, mhData)
    if (hasTaiChi) {
        console.log("有选择太极！")
        list.forEach(v => {
            const isPriority = TAI_CHI_PRIORITY_IDS.includes(v.id);
            if (isPriority) {
                v.recommanded = true
            }
        })
    }

}