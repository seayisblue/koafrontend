import type { LtData } from "~/pages/level1/LabTests/tools/types";
import { KoaController } from "./KoaController";

export class ScoreController {

  static getWomac() {
    const lists: Array<number[]> = []
    const data1 = KoaController.getWomacData("one") ?? []
    const data2 = KoaController.getWomacData("two") ?? []
    const data3 = KoaController.getWomacData("three") ?? []
    lists.push(data1)
    lists.push(data2)
    lists.push(data3)

    let myScore = 0
    for(let i=0; i<lists.length; i++) {
      const list = lists[i]
      for(let j=0; j<list.length; j++) {
        const score = list[j]
        if(score >= 0) {
          myScore += score
        }
      }
    }
    return myScore
  }

  static getSas() {
    const list = KoaController.getSAS()
    if(!list) return 0

    let myScore = 0
    const inverseIdxs = [5, 9, 13, 17, 19]

    for(let i=1; i<=list.length; i++) {
      const v = list[i - 1]
      if(!v) continue
      if(v.selected_idx < 0) continue
      let score = v.selected_idx + 1
      if(inverseIdxs.includes(i)) {
        score = 5 - score
      }
      myScore += score
    }
    myScore = Math.round(myScore * 1.25)
    return myScore
  }

  static getKL(): number {
    let klScore = 0;
    const ltData = KoaController.getLevel1Data<LtData>("lab-tests");
    if (ltData == undefined)
      return 0;
    /* X Ray */
    if (ltData.ifXRay?.[0]?.selected && ltData.XRayStatus?.[1]?.selected) {
        const xrayResults = ltData.XRayResult;
        /**
         * 膝关节退行性病变->KL至少为一级
         * 骨赘->KL至少为二级
         * 关节间隙变窄->KL三级
         * 骨硬化->KL四级
         */
        if (xrayResults?.[0]?.selected)
            klScore = Math.max(klScore, 1);
        if (xrayResults?.[1]?.selected)
            klScore = Math.max(klScore, 2);
        if (xrayResults?.[2]?.selected)
            klScore = Math.max(klScore, 3);
        if (xrayResults?.[3]?.selected)
            klScore = Math.max(klScore, 4);
    }
    /* MRI */
    if (ltData.ifMRI?.[0]?.selected && ltData.MRIStatus?.[1]?.selected) {
        /* 骨赘形成->至少为二级 */
        if (ltData.bone?.[6]?.selected)
            klScore = Math.max(klScore, 2);
    }
    return klScore;
  }

  static womacToSeverity(womacScore: number): number {
    if (womacScore < 30) return 1;
    if (womacScore <= 60) return 2;
    return 3;
  }

  static getOverallScore(womacScore: number, klScore: number): number {
    const womac = this.womacToSeverity(womacScore);
    const kl = klScore - 1;
    /**
     * TO DO
     * VAS calculation
     */
    const vas = 1;
    const score = Math.max(womac, kl, vas);
    return score;
  }

  static getScore(): number {
    const womacScore = this.getWomac();
    const klScore = this.getKL();
    return this.getOverallScore(womacScore, klScore);
  }
}