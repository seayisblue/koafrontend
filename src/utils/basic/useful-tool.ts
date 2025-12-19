// 一些实用的小函数，不知道存放在哪，姑且都收集在这
import type { ValueType, SimpleObject } from "./type-tool"

export interface FdBase {
  _id: string
  [otherKey: string]: any
}

/** 过滤掉 originals 里已有的 item 
 * 注意，该方法会直接返回原 newList 的引用
 * 所有修改都直接发生在 newList 上
*/
function filterDuplicated(
  originals: FdBase[],
  newList: FdBase[],
) {
  if(originals.length < 1 || newList.length < 1) return newList
  for(let i=0; i<newList.length; i++) {
    const v1 = newList[i]
    const v2 = originals.find(v => v._id === v1._id)
    if(v2) {
      console.log("发现一个重复项............")
      newList.splice(i, 1)
      i--
    }
  }
  return newList
}



function isSameSimpleList(
  list1: Array<ValueType>, 
  list2: Array<ValueType>
) {
  if(list1.length !== list2.length) return false
  
  for(let i=0; i<list1.length; i++) {
    const v1 = list1[i]
    const v2 = list2[i]
    if(v1 !== v2) return false
  }

  return true
}

// level has to be less than or equal to 3
function isSameSimpleObject(
  obj1?: SimpleObject,
  obj2?: SimpleObject,
  level?: number,
) {
  if(!obj1 && !obj2) return true
  if(obj1 && !obj2) return false
  if(!obj1 && obj2) return false

  if(!level) level = 1

  obj1 = obj1 ?? {}
  obj2 = obj2 ?? {}

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)
  const len1 = keys1.length
  const len2 = keys2.length
  if(len1 !== len2) return false

  for(let i=0; i<len1; i++) {
    const k1 = keys1[i]
    const v1 = obj1[k1]
    const v2 = obj2[k1]
    const t1 = typeof v1
    const t2 = typeof v2
    if(t1 !== t2) return false

    if(t1 === "object") {
      const isArr1 = Array.isArray(v1)
      const isArr2 = Array.isArray(v2)
      if(isArr1 && !isArr2) return false
      if(!isArr1 && isArr2) return false
      if(isArr1 && isArr2) {
        const resArr = isSameSimpleList(v1, v2)
        if(!resArr) return false
      }
      else {
        if(level > 3) return false
        const resObj = isSameSimpleObject(v1 as SimpleObject, v2 as SimpleObject, level + 1)
        if(!resObj) return false
      }
    }
    else if(v1 !== v2) return false
  }

  return true
}

export default {
  filterDuplicated,
  isSameSimpleList,
  isSameSimpleObject,
}