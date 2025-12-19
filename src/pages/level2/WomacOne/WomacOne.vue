<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useWomacData } from '../shared/useWomacData';
import { usePageShared } from '~/pages/shared/usePageShared';
import { watch } from 'vue';
import cui from '~/components/custom-ui';

const { t } = useI18n()
const textKeys = [
  "womac-one.none",
  "womac-one.mild",
  "womac-one.moderate",
  "womac-one.severe",
  "womac-one.extreme"
]

const { womacData } = useWomacData(5, "one")
const { onTapBack, onTapNext } = usePageShared({ 
  prev_page_name: "womac-home", 
  title_key: "womac-one.title", 
  next_page_name: "womac-two",
})

watch(() => womacData.questions[0], (newVal, oldVal) => {

  if (oldVal === -1 && newVal !== -1) {
    
    cui.showModal({
      title: "温馨提示",
      content: "以下题目若不选择\n则默认选择 \"无\"",
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
      <span>{{ t("womac-one.title_1") }}</span>
    </div>

    <template v-for="(_, index) in womacData.questions" :key="index">
      <div class="liu-no-select bi-title">
        <span>{{ t('womac-one.hd_' + (index + 1)) }}</span>
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