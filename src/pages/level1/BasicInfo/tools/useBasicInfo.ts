import { reactive } from "vue";
import { usePageShared } from "~/pages/shared/usePageShared";
import type { BiData } from "./types";
import { useKoaLevel1 } from "~/pages/shared/useKoaSaved";


export function useBasicInfo() {

  const { 
    onTapNext, 
    onTapBack,
  } = usePageShared({ 
    title_key: "basic-info.title", 
    next_page_name: "chief-complaint",
    prev_page_name: "home",
  })

  const biData = reactive<BiData>({
    name: "",
    gender: -1,
    age: "",
    height: "",
    weight: "",
    BMI: "",
    occupation: "",
    phone: "",
    onset_date: "",
    workout: -1,
  })
  useKoaLevel1(biData, "basic-info")

  return {
    biData,
    onTapNext,
    onTapBack,
  }
}