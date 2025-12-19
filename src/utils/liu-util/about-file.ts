import { getCharacteristic } from "../liu-api/characteristic"

export function listToFiles(
  fileList: FileList
): File[] {
  const arr: File[] = []
  for(let i=0; i<fileList.length; i++) {
    const v = fileList[i]
    arr.push(v)
  }
  return arr
}

export function getAcceptImgTypesString() {
  const cha = getCharacteristic()

  // reference: https://blog.csdn.net/soslsboy/article/details/85229226
  if(cha.isAndroid) {
    return "image/*"
  }

  return "image/png,image/jpg,image/jpeg"
}

export function constraintWidthHeight(
  w: number,
  h: number,
  maxW: number,
  maxH: number,
) {
  if (w > maxW && w > h) {
    return {
      width: maxW,
      height: Math.round(h * (maxW / w))
    }
  }
  if (h > maxH) {
    return {
      width: Math.round( w * (maxH / h)),
      height: maxH
    }
  }
  return { width: w, height: h }
}