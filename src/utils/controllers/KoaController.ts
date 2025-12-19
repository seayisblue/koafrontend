import type { SasItem } from "~/pages/level2/SasCollect/tools/types"
import liuApi from "../liu-api"
import type { AdlCacheItem } from "./tools/types"

export type Level1Key = "basic-info" | "chief-complaint" | "medical-history" | "lab-tests"
export type Level2Key = "touch-collect" | "tug-collect"
export type ScaleKey = "one" | "two" | "three"
export type ScaleType = "womac-data"

export class KoaController {

  static getLevel1Data<T>(
    key: Level1Key,
  ) {
    const res = liuApi.getStorageSync<Record<Level1Key, any>>("level1-data")
    if(!res) return
    return res[key] as T
  }

  static setLevel1Data<T>(
    key: Level1Key,
    data: T,
  ) {
    let res1 = liuApi.getStorageSync<Record<Level1Key, T>>("level1-data") as any
    if(!res1) {
      res1 = {}
    }
    res1[key] = data
    const res2 = liuApi.setStorageSync("level1-data", res1)
    if(!res2.isOk) {
      console.warn("fail to setLevel1Data", res2)
      return false
    }
    return true
  }

  static getLevel2Data<T>(
    key: Level2Key,
  ) {
    const res = liuApi.getStorageSync<Record<Level2Key, any>>("level2-data")
    if(!res) return
    return res[key] as T
  }

  static setLevel2Data<T>(
    key: Level2Key,
    data: T,
  ) {
    let res1 = liuApi.getStorageSync<Record<Level2Key, T>>("level2-data") as any
    if(!res1) {
      res1 = {}
    }
    res1[key] = data
    const res2 = liuApi.setStorageSync("level2-data", res1)
    if(!res2.isOk) {
      console.warn("fail to setLevel2Data", res2)
      return false
    }
    return true
  }

  private static _getScaleData(
    type: ScaleType,
    key: ScaleKey,
  ) {
    const res = liuApi.getStorageSync<Record<ScaleKey, any>>(type)
    if(!res) return
    return res[key] as number[]
  }

  private static _setScaleData(
    type: ScaleType,
    key: ScaleKey,
    data: number[],
  ) {
    let res1 = liuApi.getStorageSync<Record<ScaleKey, any>>(type) as any
    if(!res1) {
      res1 = {}
    }
    res1[key] = data
    const res2 = liuApi.setStorageSync(type, res1)
    if(!res2.isOk) {
      console.warn("fail to setScaleData", res2)
      return false
    }
    return true
  }

  static getWomacData(
    key: ScaleKey,
  ) {
    return this._getScaleData("womac-data", key)
  }

  static setWomacData(
    key: ScaleKey,
    data: number[],
  ) {
    return this._setScaleData("womac-data", key, data)
  }

  static setSAS(
    list: SasItem[],
  ) {
    const res = liuApi.setStorageSync("sas-atoms", list)
    if(!res.isOk) {
      console.warn("fail to setSAS", res)
      return false
    }
    return true
  }

  static getSAS() {
    const res = liuApi.getStorageSync<SasItem[]>("sas-atoms")
    if(!res) return
    return res
  }

  static setADL(
    atoms: AdlCacheItem[]
  ) {
    const res = liuApi.setStorageSync("adl-atoms", atoms)
    if(!res.isOk) {
      console.warn("fail to setADL", res)
      return false
    }
    return true
  }

  static getADL() {
    const res = liuApi.getStorageSync<AdlCacheItem[]>("adl-atoms")
    if(!res) return
    return res
  }
}