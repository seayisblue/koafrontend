import { type BiData } from "./types";
import liuReq from "~/requests/liu-req";
import APIS from "~/requests/APIs";

/**
 * @param weight (kg)
 * @param height (cm)
 * @returns BMI value
 */
export function BMI(weight: string, height: string): string {
  const w = Number(weight);
  const h = Number(height);

  if (10 <= w && w <= 150 && 90 <= h && h <= 220) {
    const bmi = w / ((h / 100) ** 2);
    return bmi.toFixed(2);
  } else {
    return "";
  }
}

export function isMissingValue(val: unknown): boolean {
  if (val === null || val === undefined) return true;
  if (typeof val === "string") return val.trim() === "";
  if (typeof val === "number") return val === -1;
  return false;
}

export function postBasicInfo(biData: BiData) {
  const userID = "6933eee369d82d30dbabf9b0";
  const url = APIS.BASIC_INFO_POST + `?userID=${userID}`;

  const body = {
    name: biData.name,
    gender: biData.gender,
    age: Number(biData.age),
    height: Number(biData.height),
    weight: Number(biData.weight),
    BMI: Number(biData.BMI === "" ? NaN : biData.BMI),
    job: biData.occupation,
    phoneNumber: biData.phone,
    date: biData.onset_date,
    habit: biData.workout,
  };

  return liuReq.request(url, body);
}