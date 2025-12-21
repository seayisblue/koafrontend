import { reactive } from "vue";
import { usePageShared } from "~/pages/shared/usePageShared";
import cui from "~/components/custom-ui";
import type { BiData } from "./types";
import { useKoaLevel1 } from "~/pages/shared/useKoaSaved";
import { isMissingValue, postBasicInfo } from "./scripts";

export function useBasicInfo() {

  const {
    onTapNext: sharedOnTapNext,
    onTapBack,
  } = usePageShared({
    title_key: "basic-info.title",
    next_page_name: "chief-complaint",
    prev_page_name: "home",
  });

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
  });
  useKoaLevel1(biData, "basic-info");

  const onTapNext = async () => {
    const entries = Object.entries(biData) as [keyof BiData, unknown][];
    const missingFields = entries
      .filter(([_, v]) => isMissingValue(v))
      .map(([k]) => k as string);

    if (missingFields.length > 0) {
      cui.showModal({
        title: "温馨提示",
        content: "请完整填写所有信息后再继续",
        confirmText: "知道了",
        showCancel: false,
      });
      return;
    } else {
      const res = await postBasicInfo(biData);
      console.log(res);
      if (res?.code === "0000") {
        cui.showSnackBar({ text: "成功上传" });
        sharedOnTapNext();
      } else {
        cui.showModal({
          title: "保存失败",
          content: `保存基本信息失败: ${res?.code ?? "未知错误"}`,
          confirmText: "知道了",
          showCancel: false,
        });
      }
    }
  }

  return {
    biData,
    onTapNext,
    onTapBack,
  };
}