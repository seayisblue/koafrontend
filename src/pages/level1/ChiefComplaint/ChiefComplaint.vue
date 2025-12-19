<!-- 症状描述 -->
<script setup lang="ts">
import { useI18n } from "vue-i18n"
import { useChiefComplaint } from "./tools/useChiefComplaint";
import CustomSlider from "~/components/CustomSlider/CustomSlider.vue";

const { t } = useI18n()
const { 
  ccData,
  pain_natures,
  pain_durations,
  stiffness_durations,
  knee_limit,
  joint_stiffness,
  temperature,
  onTapNext,
  onTapBack,
  handleCheck
} = useChiefComplaint()

</script>
<template>

  <PageWrapper>
    <div class="bi-sized-box"></div>

    <div class="liu-no-select bi-head">
      <span>{{ t("chief-complaint.title_1") }}</span>
    </div>

    <!-- 疼痛部位 -->
    <div class="liu-no-select bi-title">
      <span>{{ t('chief-complaint.hd_1') }}</span>
    </div>
    <div class="liu-no-select bi-desc">
      <span>{{ t('chief-complaint.bd_1') }}</span>
    </div>
    <div class="bi-content">
      <CustomCheckboxs
        v-model="ccData.pain_locations"
        @change="(idx: number) => handleCheck('knee_observations', idx)"
      ></CustomCheckboxs>
    </div>

    <!-- 疼痛程度 -->
    <div class="liu-no-select bi-title">
      <span>{{ t('chief-complaint.hd_2') }}</span>
    </div>
    <div class="liu-no-select bi-desc">
      <span>{{ t('chief-complaint.bd_2') }}</span>
    </div>
    <div class="bi-content">
      <CustomSlider v-model="ccData.pain_level"></CustomSlider>
    </div>

    <!-- 疼痛性质 -->
    <div class="liu-no-select bi-title">
      <span>{{ t('chief-complaint.hd_3') }}</span>
    </div>
    <div class="bi-content">
      <CustomRadios
        :texts="pain_natures"
        v-model:index="ccData.pain_nature_idx"
      ></CustomRadios>
    </div>

    <!-- 疼痛时间 -->
    <div class="liu-no-select bi-title">
      <span>{{ t('chief-complaint.hd_4') }}</span>
    </div>
    <div class="bi-content">
      <CustomRadios
        :texts="pain_durations"
        v-model:index="ccData.pain_duration_idx"
      ></CustomRadios>
    </div>

    <!-- 【僵硬】 -->
    <!-- 僵硬持续时间 -->
    <div class="liu-no-select bi-head">
      <span>{{ t("chief-complaint.title_2") }}</span>
    </div>
    <div class="liu-no-select bi-title">
      <span>{{ t('chief-complaint.hd_5') }}</span>
    </div>
    <div class="liu-no-select bi-desc">
      <span>{{ t('chief-complaint.bd_5') }}</span>
    </div>
    <div class="bi-content">
      <CustomRadios
        :texts="stiffness_durations"
        v-model:index="ccData.stiffness_duration_idx"
      ></CustomRadios>
    </div>
 
    <!-- 膝关节屈伸是否受限？ -->
    <div class="liu-no-select bi-title">
      <span>{{ t('chief-complaint.knee_limit') }}</span>
    </div>
    <div class="liu-no-select bi-desc">
      <span>{{ t('chief-complaint.bd_11') }}</span>
    </div>
    <div class="bi-content">
      <CustomRadios
        :texts="knee_limit"
        v-model:index="ccData.knee_limit"
      ></CustomRadios>
    </div>

    <!-- 在步行以及其他运动过程中是否有关节卡顿的情况？ -->
    <div class="liu-no-select bi-title">
      <span>{{ t('chief-complaint.joint_stiffness') }}</span>
    </div>
    <div class="bi-content">
      <CustomRadios
        :texts="joint_stiffness"
        v-model:index="ccData.joint_stiffness"
      ></CustomRadios>
    </div>

    <!-- 观察膝盖 -->
    <div class="liu-no-select bi-title">
      <span>{{ t('chief-complaint.kneeAppearance') }}</span>
    </div>
    <div class="liu-no-select bi-desc">
      <span>{{ t('chief-complaint.bd_12') }}</span>
    </div>
    <div class="bi-content">
      <CustomCheckboxs 
    v-model="ccData.knee_observations"
    @change="(idx: number) => handleCheck('knee_observations', idx)"
  ></CustomCheckboxs>
    </div>

    <!-- 皮温是否升高 -->
    <div class="liu-no-select bi-title">
      <span>{{ t('chief-complaint.hd_13') }}</span>
    </div>
    <div class="liu-no-select bi-desc">
      <span>{{ t('chief-complaint.bd_13') }}</span>
    </div>
    <div class="bi-content">
      <CustomRadios
        :texts="temperature"
        v-model:index="ccData.temperature"
      ></CustomRadios>
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