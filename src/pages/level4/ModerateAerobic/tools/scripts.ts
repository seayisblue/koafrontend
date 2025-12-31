import { KoaController } from "~/utils/controllers/KoaController";
import type { BiData } from "~/pages/level1/BasicInfo/tools/types";

export function KneeRestTip(): boolean {
  const biData = KoaController.getLevel1Data<BiData>("basic-info");
  const bmi = Number(biData?.BMI);
  return Number.isFinite(bmi) && bmi > 28;
}