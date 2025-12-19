<!-- Step 3: 病史采集 -->
<script setup lang="ts">
import { useI18n } from "vue-i18n"
import { useMedicalHistory } from "./tools/useMedicalHistory";

const { mhData, onTapNext, onTapBack } = useMedicalHistory()
const { t } = useI18n()

</script>
<template>

  <PageWrapper>
    <div class="bi-sized-box"></div>

    <div class="liu-no-select bi-head">
      <span>{{ t("medical-history.title_1") }}</span>
    </div>

    <!-- 发病详情 -->
    <div class="liu-no-select bi-title">
      <span>{{ t('medical-history.hd_1') }}</span>
    </div>
    <div class="liu-no-select bi-desc">
      <span>{{ t('medical-history.bd_1') }}</span>
    </div>
    <div class="bi-content">
      <CustomCheckboxs v-model="mhData.list1"></CustomCheckboxs>
    </div>

    <!-- 既往病史 -->
    <div class="liu-no-select bi-title">
      <span>{{ t('medical-history.hd_2') }}</span>
    </div>
    <div class="liu-no-select bi-desc">
      <span>{{ t('medical-history.bd_2') }}</span>
    </div>
    <div class="bi-content">
      <CustomCheckboxs v-model="mhData.list2"></CustomCheckboxs>
    </div>

    <!-- 药物使用情况: 口服药 -->
    <div class="liu-no-select bi-title">
      <span>{{ t('medical-history.hd_3_1') }}</span>
    </div>
    <div class="liu-no-select bi-desc">
      <span>{{ t('medical-history.bd_3_1') }}</span>
    </div>
    <div class="bi-content">
      <CustomCheckboxs v-model="mhData.list3"></CustomCheckboxs>
    </div>

    <!-- 药物使用情况: 外用药 -->
    <div class="liu-no-select bi-title">
      <span>{{ t('medical-history.hd_3_2') }}</span>
    </div>
    <div class="liu-no-select bi-desc">
      <span>{{ t('medical-history.bd_3_2') }}</span>
    </div>
    <div class="bi-content">
      <CustomCheckboxs v-model="mhData.list4"></CustomCheckboxs>
    </div>


    <!-- 家族史 -->
    <div class="liu-no-select bi-title">
      <span>{{ t('medical-history.hd_4') }}</span>
    </div>
    <div class="liu-no-select bi-desc">
      <span>{{ t('medical-history.bd_4') }}</span>
    </div>
    <div class="bi-content">
      <CustomRadios
        :text-keys="['shared.yes', 'shared.no', 'shared.unclear']"
        v-model:index="mhData.family_history_idx"
      ></CustomRadios>
    </div>

    <!-- 运动锻炼 -->
    <div class="liu-no-select bi-title">
      <span>{{ t('medical-history.hd_5') }}</span>
    </div>
    <div class="liu-no-select bi-desc">
      <span>{{ t('medical-history.bd_5') }}</span>
    </div>
    <div class="bi-content">
      <CustomCheckboxs v-model="mhData.list5"></CustomCheckboxs>
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


</style>