import { reactive } from "vue";
import type { TugData } from "../../TugCollect/tools/types";
import { usePageShared } from "~/pages/shared/usePageShared";
import { useKoaLevel2 } from "~/pages/shared/useKoaSaved";


export function useTugResult() {

  usePageShared({ 
    title_key: "tug-result.title",
  });
  
  const tugData = reactive<TugData>({
    videoSrc: "",
    time: 0,
  });
  useKoaLevel2(tugData, "tug-collect");
  
  return tugData;
}