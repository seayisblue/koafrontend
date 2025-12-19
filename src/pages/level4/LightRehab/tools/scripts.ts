import { KoaController } from "~/utils/controllers/KoaController";
import { rehabOptions } from "./types";
import type { BiData } from "~/pages/level1/BasicInfo/tools/types";
import type { CcData } from "~/pages/level1/ChiefComplaint/tools/types";
import type { LtData } from "~/pages/level1/LabTests/tools/types";
import type { TcData } from "~/pages/level2/TouchCollect/tools/types";
import type { MhData } from "~/pages/level1/MedicalHistory/tools/types";
import { noLabTest } from "~/pages/level2/TugResult/tools/scripts";

export function filter(): Array<{key: string, icon: string}> {
    const ccData = KoaController.getLevel1Data<CcData>("chief-complaint");
    /**
     * 皮温升高
     */
    if (ccData != undefined && ccData.temperature === 0) {
        return rehabOptions.filter(op => op.key !== "aerobic");
    } else {
        return rehabOptions;
    }
}

export function needLoseWeightPlan(): boolean {
    const biData = KoaController.getLevel1Data<BiData>("basic-info");
    if (biData != undefined && Number(biData.BMI) > 24) {
        return true;
    }
    return false;
}

export function needXRayPlan(): boolean {
    const ltData = KoaController.getLevel1Data<LtData>("lab-tests");
    const tcData = KoaController.getLevel2Data<TcData>("touch-collect");
    /**
     * 未做XRay检查
     * 髌骨压痛
     */
    if (ltData != undefined && ltData.ifXRay?.[1]?.selected) {
        if (tcData != undefined && tcData.painDetails?.[1]?.selected) {
            return true;
        }
    }
    return false;
}

export function needMRIPlan(): boolean {
    const ltData = KoaController.getLevel1Data<LtData>("lab-tests");
    const ccData = KoaController.getLevel1Data<CcData>("chief-complaint");
    const mhData = KoaController.getLevel1Data<MhData>("medical-history");
    /**
     * MRI/X射线/超声检查均无
     * -刺痛
     * -运动（球类等）时关节扭伤
     * -近半年膝关节有意外伤害（膝关节骨折和/或韧带损伤）
     */
    if (noLabTest(ltData) && ccData != undefined && mhData != undefined) {
        if (ccData.pain_nature_idx === 0 || mhData.list1?.[0]?.selected || mhData.list1?.[1]?.selected) {
            return true;
        }
    }
    /**
     * 未做MRI检查
     * -髌上滑囊压痛、膝关节内侧和外侧压痛、髌腱压痛
     */
    if (ltData != undefined && ltData.ifMRI?.[1]?.selected) {

    }
    return false;
}