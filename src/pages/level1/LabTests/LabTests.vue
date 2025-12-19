<!-- Step 4: 辅助检查 -->
<script setup lang="ts">
import { useI18n } from "vue-i18n"
import { useLabTests } from "./tools/useLabTests"

const { t } = useI18n()
const { ltData, onTapNext, onTapBack, handleCheck } = useLabTests()
</script>

<template>
  <PageWrapper>
    <div class="bi-sized-box"></div>

    <div class="liu-no-select bi-head">
      <span>{{ t("lab-tests.XRay") }}</span>
    </div>
    
    <div class="liu-no-select bi-title">
      <span>{{ t('lab-tests.ifXRay') }}</span>
    </div>
    <div class="bi-content">
      <CustomCheckboxs 
        v-model="ltData.ifXRay"
        @change="(idx: number) => handleCheck('ifXRay', idx)"
      ></CustomCheckboxs>
    </div>

    <div v-if="ltData.ifXRay[0].selected">
      
      <div class="liu-no-select bi-title">
        <span>{{ t('lab-tests.XRayResult') }}</span>
      </div>
      <div class="bi-content">
        <CustomCheckboxs 
          v-model="ltData.XRayStatus"
          @change="(idx: number) => handleCheck('XRayStatus', idx)"
        ></CustomCheckboxs>
      </div>

      <div v-if="ltData.XRayStatus[1].selected">
        <div class="bi-content">
          <CustomCheckboxs v-model="ltData.XRayResult"></CustomCheckboxs>
        </div>
      </div>

    </div>
    

    <div class="bi-sized-box_two"></div>

    <div class="liu-no-select bi-head">
      <span>{{ t("lab-tests.MRI") }}</span>
    </div>

    <div class="liu-no-select bi-title">
      <span>{{ t('lab-tests.ifMRI') }}</span>
    </div>
    <div class="bi-content">
      <CustomCheckboxs 
        v-model="ltData.ifMRI" 
        @change="(idx: number) => handleCheck('ifMRI', idx)"
      ></CustomCheckboxs>
    </div>

    <div v-if="ltData.ifMRI[0].selected">
      
      <div class="liu-no-select bi-title">
        <span>{{ t('lab-tests.MRIStatus') }}</span>
      </div>
      <div class="bi-content">
        <CustomCheckboxs 
          v-model="ltData.MRIStatus"
          @change="(idx: number) => handleCheck('MRIStatus', idx)"
        ></CustomCheckboxs>
      </div>

      <div v-if="ltData.MRIStatus[1].selected">
        
        <div class="liu-no-select bi-title">
          <span>{{ t('lab-tests.bone') }}</span>
        </div>
        <div class="bi-content">
          <CustomCheckboxs v-model="ltData.bone"></CustomCheckboxs>
        </div>

        <div class="liu-no-select bi-title">
          <span>{{ t('lab-tests.meniscus') }}</span>
        </div>
        <div class="bi-content">
          <CustomCheckboxs v-model="ltData.meniscus"></CustomCheckboxs>
        </div>

        <div class="liu-no-select bi-title">
          <span>{{ t('lab-tests.joint') }}</span>
        </div>
        <div class="bi-content">
          <CustomCheckboxs v-model="ltData.joint"></CustomCheckboxs>
        </div>

        <div class="liu-no-select bi-title">
          <span>{{ t('lab-tests.muscle') }}</span>
        </div>
        <div class="bi-content">
          <CustomCheckboxs v-model="ltData.muscle"></CustomCheckboxs>
        </div>
      </div>

    </div>

    <div class="liu-no-select bi-head">
      <span>{{ t("lab-tests.UltraSound") }}</span>
    </div>

    <div class="liu-no-select bi-title">
      <span>{{ t('lab-tests.ifUltraSound') }}</span>
    </div>
    <div class="bi-content">
      <CustomCheckboxs 
        v-model="ltData.ifUltraSound"
        @change="(idx: number) => handleCheck('ifUltraSound', idx)"
      ></CustomCheckboxs>
    </div>

    <div v-if="ltData.ifUltraSound[0].selected">
      
      <div class="liu-no-select bi-title">
        <span>{{ t('lab-tests.UltraSoundResult') }}</span>
      </div>
      <div class="bi-content">
        <CustomCheckboxs 
          v-model="ltData.UltraSoundStatus"
          @change="(idx: number) => handleCheck('UltraSoundStatus', idx)"
        ></CustomCheckboxs>
      </div>

      <div v-if="ltData.UltraSoundStatus[1].selected">
        <div class="bi-content">
          <CustomCheckboxs v-model="ltData.UltraSoundResult"></CustomCheckboxs>
        </div>
      </div>

    </div>

    <div class="bi-sized-box_two"></div>

    <ButtonList
      main-text-key="lab-tests.finish"
      @next="onTapNext"
      @back="onTapBack"
    ></ButtonList>

    <div class="bi-sized-box_three"></div>

  </PageWrapper>
</template>

<style scoped lang="scss">
@use "../../shared/everyone-shared.scss";
</style>