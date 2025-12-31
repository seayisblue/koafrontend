<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useWomacResult } from './tools/useWomacResult';

const { t } = useI18n()
const { wrData, onTapNext } = useWomacResult()

</script>
<template>

  <PageWrapper>

    <div class="hp-container">

      <div class="liu-no-select hp-top-text">
        <span>{{ t("womac-result.womacScore", { score: wrData.womacScore }) }}</span>
      </div>
      <div class="liu-no-select hp-top-text">
        <span>{{ t("womac-result.klScore", { level: wrData.klScore }) }}</span>
      </div>

      <div class="liu-no-select hp-result">
        <span>{{ t("womac-result.overall") }}</span>
        <span v-if="wrData.score === 1">{{ t("shared.mild") }}</span>
        <span v-else-if="wrData.score === 2" class="hp-moderate">{{ t("shared.moderate") }}</span>
        <span v-else class="hp-severe">{{ t("shared.severe") }}</span>
      </div>

      <div class="hp-desc">
        <span>{{ t("womac-result.womacMetric") }}</span>
      </div>
      <div class="hp-desc">
        <span>{{ t("womac-result.klMetric") }}</span>
      </div>

      <CustomButton @click="onTapNext">
        <span>{{ t("womac-result.next_step") }}</span>
      </CustomButton>

      <div class="hp-virtual"></div>

    </div>

  </PageWrapper>


</template>
<style scoped lang="scss">

@use "../../shared/result-shared.scss";


</style>