import { KoaController } from "~/utils/controllers/KoaController";
import { type ExerciseItem } from "./types";
import type { LtData } from "~/pages/level1/LabTests/tools/types";

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
    return list;
}