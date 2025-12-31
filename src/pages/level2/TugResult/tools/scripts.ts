import { ScoreController } from "~/utils/controllers/ScoreController";
import { KoaController } from "~/utils/controllers/KoaController";
import type { BiData } from "~/pages/level1/BasicInfo/tools/types";
import type { CcData } from "~/pages/level1/ChiefComplaint/tools/types";
import type { LtData } from "~/pages/level1/LabTests/tools/types";
import type { MhData } from "~/pages/level1/MedicalHistory/tools/types";
import type { TcData } from "../../TouchCollect/tools/types";
import type { TugData } from "../../TugCollect/tools/types";

export function readBMI(): number {
  const biData = KoaController.getLevel1Data<BiData>("basic-info");
  if (biData)
    return biData.BMI;
  else
    return -1;
}

export function categoryOnBMI(bmi: number) {
  if (bmi > 28) {
    return "obesity";
  } else /* if (bmi > 24) */ {
    return "pre-obesity";
  }
}

export function noLabTest(ltData: LtData | undefined): boolean {
  if (ltData === undefined)
    return true;
  const noXRay = ltData.ifXRay?.[1]?.selected;
  const noMRI = ltData.ifMRI?.[1]?.selected;
  const noUltra = ltData.ifUltraSound?.[1].selected;
  if (noXRay && noMRI && noUltra)
    return true;
  return false;
}

function badTestResult(ltData: LtData | undefined): boolean {
  if (ltData === undefined)
    return false;

  /**
   * MRI
   * 骨折、半月板损伤III度、韧带撕裂、肌腱撕裂
   */
  const hasMRI = ltData.ifMRI?.[0]?.selected;
  const abnormalMRI = ltData.MRIStatus?.[1]?.selected;
  if (hasMRI && abnormalMRI) {
    const hasBoneIssue = ltData.bone?.[4]?.selected;
    const hasMeniscusIssue = ltData.meniscus?.[3]?.selected;
    const hasLigamentIssue = ltData.muscle?.[1]?.selected;
    const hasMuscleIssue = ltData.muscle?.[3]?.selected;

    if (hasBoneIssue || hasMeniscusIssue || hasLigamentIssue || hasMuscleIssue) {
      return true;
    }
  }

  /**
   * Ultrasound
   * 隐匿性骨折、半月板撕裂、韧带撕裂、肌腱撕裂、神经节囊肿
   */
  const hasUltra = ltData.ifUltraSound?.[0]?.selected;
  const abnormalUltra = ltData.UltraSoundStatus?.[1]?.selected;
  if (hasUltra && abnormalUltra) {
    const result = ltData.UltraSoundResult;
    if (result[3].selected || result[4].selected || result[5].selected || result[6].selected || result[7].selected)
      return true;
  }

  return false;
}

export function medicalPlan(): string {
  const ccData = KoaController.getLevel1Data<CcData>("chief-complaint");
  const ltData = KoaController.getLevel1Data<LtData>("lab-tests");
  const mhData = KoaController.getLevel1Data<MhData>("medical-history");
  const tcData = KoaController.getLevel2Data<TcData>("touch-collect");
  const tugData = KoaController.getLevel2Data<TugData>("tug-collect");
  const score = ScoreController.getOverallScore();

  /**
   * 未做过检查
   * -红/肿
   * -运动（球类等）时关节扭伤
   * -近半年膝关节有意外伤害（膝关节骨折和/或韧带损伤）
   */
  if (noLabTest(ltData) && ccData != undefined && mhData != undefined) {
    const hasJointStiff = (ccData.joint_stiffness === 1);
    const hasKneeObs = ccData.knee_observations?.[2]?.selected;
    const hasHistory1 = mhData.list1?.[2]?.selected;
    const hasHistory2 = mhData.list1?.[3]?.selected;

    if (hasJointStiff || hasKneeObs || hasHistory1 || hasHistory2) {
      return "serious";
    }
  }

  if (badTestResult(ltData))
    return "serious";

  /**
   * womac-one 夜间休息时选择 严重/极严重
   */
  const womacOne = KoaController.getWomacData("one");
  if (womacOne != undefined) {
    if (womacOne[2] === 3 || womacOne[2] === 4) {
      return "serious";
    }
  }

  /**
   * TUG time
   */
  if (tugData != undefined && tugData.time >= 20) {
    return "serious"
  }

  /**
   * 髌骨压痛
   * KL等级四
   */
  if (ScoreController.getKL() === 4) {
    if (tcData != undefined && tcData.painDetails[1].selected)
      return "severe";
  }

  /**
   * use overall score
   */
  if (score >= 3) {
    return "severe";
  } else if (score === 2) {
    return "moderate";
  }
  return "mild";
}