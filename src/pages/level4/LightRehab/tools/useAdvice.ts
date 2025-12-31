import { useRouteAndLiuRouter } from "~/routes/liu-router";
import { medicalPlan } from "../../../level2/TugResult/tools/scripts";
import { readPeriod } from "./scripts";

export function useAdvice() {
  const rr = useRouteAndLiuRouter();

  const onTapBack = () => {
    rr.router.push({name: "tug-result"});
  };

  const onTapNext = () => {
    const plan = medicalPlan();
    rr.router.push({
      name: "light-rehab",
      query: { plan }
    });
  };

  const category = rr.route.query?.category;
  const period = readPeriod();

  return {
    onTapBack,
    onTapNext,
    category,
    period
  };
}