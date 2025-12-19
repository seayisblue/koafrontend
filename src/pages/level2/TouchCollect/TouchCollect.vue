<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useTouchCollect } from "./tools/useTouchCollect"

const { tcData, onTapNext, onTapBack, handleCheck } = useTouchCollect()
const { t } = useI18n()

</script>
<template>

  <PageWrapper>

    <div class="bi-sized-box"></div>
    <img class="bi-image" src="/see-your-knee.jpg"></img>

    <div class="tc-desc">
      <span>{{ t("touch-collect.intro") }}</span>
    </div>

    <div class="liu-no-select bi-title">
      <span>{{ t('touch-collect.hd_1') }}</span>
    </div>
    <div class="bi-content">
      <CustomCheckboxs
       v-model="tcData.painStatus"
        @change="(idx: number) => handleCheck('painStatus', idx)"
      ></CustomCheckboxs>
    </div>

    <div v-if="tcData.painStatus[0].selected">
      <div class="liu-no-select bi-title">
        <span>具体部位（可多选）</span>   
      </div>
      
      <div class="bi-content">
        <CustomCheckboxs
          v-model="tcData.painDetails"
        ></CustomCheckboxs>
      </div>
    </div>

    <div class="bi-sized-box_two"></div>

    <ButtonList
      @next="onTapNext"
      @back="onTapBack"
    ></ButtonList>

    <div class="bi-sized-box_three"></div>

  </PageWrapper>


</template>
<style scoped lang="scss">
@use "../../shared/everyone-shared.scss";

.bi-image {
  width: 100%;
  aspect-ratio: 876 / 738;
  margin-block-end: 16px;
  border-radius: 20px;
  overflow: hidden;
}

.tc-desc {
  width: 100%;
  font-size: var(--desc-font-size);
  color: var(--main-normal);
  margin-block-end: 32px;
}

</style>