

export interface BiData {

  // 基本信息
  name: string
  gender: number     // 0: 男; 1: 女;  -1: unknown
  age: string
  height: string
  weight: string
  BMI: string
  occupation: string
  phone: string
  onset_date: string

  // 生活习惯
  workout: number    // 是否经常运动： 0: 是; 1: 否; -1: unknown
}