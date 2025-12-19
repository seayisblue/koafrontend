import type { CheckboxItem } from "~/components/CustomCheckboxs/tools/types";


export interface LogicRules {
  // 全局排他项
  exclusiveIndex?: number;

  // 互斥列表
  conflictGroups?: number[][];
}

/**
 * * @param list 
 * @param activeIndex 
 * @param rules 
 */
export function checkRules(
  list: CheckboxItem[], 
  activeIndex: number, 
  rules: LogicRules
) {
  const currentItem = list[activeIndex];
  
  if (!currentItem.selected) return;

  // --- 处理全局排他项 ---
  if (rules.exclusiveIndex !== undefined) {
    const exclusiveIdx = rules.exclusiveIndex;
    
    if (activeIndex === exclusiveIdx) {
      // 点击了排他项（比如“正常”）：清空所有其他选项
      list.forEach((item, index) => {
        if (index !== exclusiveIdx) item.selected = false;
      });
    } else {
      // 点击了其他项 -> 自动取消"正常"
      if (list[exclusiveIdx] && list[exclusiveIdx].selected) {
        list[exclusiveIdx].selected = false;
      }
    }
  }

  // --- 处理互斥组 ---
  if (rules.conflictGroups) {
    rules.conflictGroups.forEach(group => {
      if (group.indexOf(activeIndex) !== -1) {
        group.forEach(conflictIndex => {
          if (conflictIndex !== activeIndex) {
            if (list[conflictIndex]) list[conflictIndex].selected = false;
          }
        });
      }
    });
  }
}