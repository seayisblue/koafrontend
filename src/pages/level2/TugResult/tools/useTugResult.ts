import { reactive } from "vue";
import type { TugData } from "../../TugCollect/tools/types";
import { usePageShared } from "~/pages/shared/usePageShared";
import { useKoaLevel2 } from "~/pages/shared/useKoaSaved";
import { useRouteAndLiuRouter } from '~/routes/liu-router';
import { readBMI, categoryOnBMI, medicalPlan } from './scripts';

export function useTugResult() {

  const rr = useRouteAndLiuRouter()
  const onTapNext = () => {
    /**
     * if BMI > 24
     * provide lose weight advice
     */
    const bmi = readBMI();
    if (bmi > 24) {
      const category = categoryOnBMI(bmi);
      rr.router.push({
        name: "lose-weight-advice",
        query: { category }
      })
    }

    /**
     * otherwise, skip the advice
     */
    else {
      const plan = medicalPlan()
      rr.router.push({
        name: "light-rehab",
        query: { plan }
      })
    }
  }

  usePageShared({
    title_key: "tug-result.title",
  });
  
  const tugData = reactive<TugData>({
    videoSrc: "",
    time: 0,
  });
  useKoaLevel2(tugData, "tug-collect");
  
  return {
    tugData,
    onTapNext
  };
}