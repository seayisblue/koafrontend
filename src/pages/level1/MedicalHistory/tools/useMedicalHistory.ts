import { reactive } from "vue";
import { usePageShared } from "~/pages/shared/usePageShared";
import type { MhData } from "./types";
import { useKoaLevel1 } from "~/pages/shared/useKoaSaved";
import { useRouteAndLiuRouter } from "~/routes/liu-router";
import { initCheckbox } from "~/hooks/useCommon";


const text1 = [
  "运动（球类等）时关节扭伤",
  "近半年膝关节有意外伤害（膝关节骨折和/或韧带损伤）",
  "爬楼梯",
  "爬山",
]

const text2 = [
  "类风湿性关节炎",
  "化脓性关节炎",
  "结核性关节炎",
  "血友病性关节炎",
  "前叉韧带手术",
  "后叉韧带手术",
  "侧副韧带手术",
  "关节镜手术",
  "疼痛侧膝关节置换",
  "非疼痛侧膝关节置换",
  "高血压",
  "高血压（急性期）",
  "冠心病",
  "冠心病（急性期）",
  "慢阻肺",
  "慢阻肺（急性期）",
  "慢支炎",
  "骨质疏松"
]

const text3 = [
  "盐酸氨基葡萄糖",
  "妙纳",
  "凯莱通",
  "芬必得、美林、摩美得、艾德儿VN（布洛芬）",
  "扶他林、英太青、戴芬、奥贝（双氯芬酸钠）",
  "西乐葆（塞来昔布）",
  "莫比可、宏强、则立（美洛昔康）",
  "乐松（洛索洛芬钠）",
  "适洛特、帕诺丁（萘普生）",
  "力美松、瑞普乐（尼美舒利）",
  "安康信（依托考昔）",
  "喜力特、贝速清（醋氯芬酸）",
  "对乙酰氨基酚",
  "阿司匹林肠溶片",
  "安必丁（双醋瑞因）",
  "奇曼丁、舒敏（曲马多）",
  "欣百达、奥思平、欣贝达（度洛西汀）",
  "金乌骨通胶囊",
  "金天格胶囊",
  "仙灵骨葆胶囊",
  "尪痹片/胶囊",
  "虎力散胶囊",
  "壮骨关节胶囊",
  "独活寄生合剂 / 丸",
  "藤黄健骨片",
]

const text4 = [
  "氟比洛芬凝胶贴膏",
  "洛索洛芬钠凝胶贴膏",
  "利多卡因凝胶贴膏",
  "骨痛宁酊",
  "辣椒素",
  "复方南星止痛膏",
]

const text5 = [
  "散步/快走",
  "爬楼梯",
  "跑步",
  "羽毛球/网球/乒乓球",
  "游泳（特别是蛙泳）",
  "骑自行车",
  "登山/远足",
  "太极拳/瑜伽"
]


export function useMedicalHistory() {
  const { onTapBack } = usePageShared({ 
    title_key: "medical-history.title",
    next_page_name: "lab-tests",
    prev_page_name: "chief-complaint",
  })

  const mhData = reactive<MhData>({
    knee_history: "",
    list1: initCheckbox(text1),
    list2: initCheckbox(text2),
    list3: initCheckbox(text3),
    list4: initCheckbox(text4),
    list5: initCheckbox(text5),
  })
  useKoaLevel1(mhData, "medical-history")

  const rr = useRouteAndLiuRouter()
  const onTapNext = () => {
    const txt1 = mhData.knee_history
    const res1 = hasPotentialSurgeries(txt1)
    if(res1) {
      rr.router.push({ name: "medical-result" })
    }
    else {
      rr.router.push({ name: "lab-tests" })
    }
  }


  return {
    onTapNext,
    onTapBack,
    mhData,
  }
  
}


function hasPotentialSurgeries(text: string) {
  text = text.trim()
  if(!text) return false
  if(text === "有") return true
  if(text === "无") return false
  if(text === "否") return false
  if(text === "没有") return false
  //if(text.startsWith("不清楚")) return false
  //if(text.startsWith("不记得")) return false
  if(text.length < 2) return false
  return true
}