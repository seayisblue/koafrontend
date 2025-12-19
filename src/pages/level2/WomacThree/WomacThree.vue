<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useWomacData } from '../shared/useWomacData';
import { usePageShared } from '~/pages/shared/usePageShared';
import { watch } from 'vue';
import cui from '~/components/custom-ui';

const { t } = useI18n()
const textKeys = [
  "womac-three.none",
  "womac-three.mild",
  "womac-three.moderate",
  "womac-three.severe",
  "womac-three.extreme"
]

const { womacData } = useWomacData(16, "three")
const { onTapBack, onTapNext } = usePageShared({ 
  prev_page_name: "womac-two", 
  next_page_name: "womac-result",
  title_key: "womac-three.title",
})

watch(() => womacData.questions[0], (newVal, oldVal) => {
  if (oldVal === -1 && newVal !== -1) {
    
    cui.showModal({
      title: "温馨提示",
      content: "以下题目若不选择\n则默认选择 \"没觉得困难\"",
      confirmText: "知道了",
      showCancel: false,
    })
  }
})

</script>
<template>

  <PageWrapper>

    <div class="bi-sized-box"></div>

    <div class="liu-no-select bi-head">
      <span>{{ t("womac-three.title_1") }}</span>
    </div>

    <template v-for="(_, index) in womacData.questions" :key="index">
      <div class="liu-no-select bi-title">
        <span>{{ t('womac-three.hd_' + (index + 1)) }}</span>
      </div>
      <div class="bi-content">
        <CustomRadios
          :text-keys="textKeys"
          v-model:index="womacData.questions[index]"
        ></CustomRadios>
      </div>
    </template>

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