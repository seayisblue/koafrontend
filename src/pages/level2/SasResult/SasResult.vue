<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useRouteAndLiuRouter } from '~/routes/liu-router';
import { useSasResult } from './tools/useSasResult';

const { t } = useI18n()
const rr = useRouteAndLiuRouter()
const { srData } = useSasResult()

const onTapNext = () => {
  rr.router.push({ 
    name: 'touch-collect',
  })
}


</script>
<template>

  <PageWrapper>

    <div class="hp-container">

      <div class="liu-no-select hp-top-text">
        <span>{{ t("sas-result.hd_1", { score: srData.score }) }}</span>
      </div>

      <div class="liu-no-select hp-result">
        <span v-if="srData.score < 50" class="hp-healthy">{{ t("sas-result.healthy") }}</span>
        <span v-else-if="srData.score < 60" class="hp-mild">{{ t("sas-result.mild") }}</span>
        <span v-else-if="srData.score < 70" class="hp-moderate">{{ t("sas-result.moderate") }}</span>
        <span v-else class="hp-severe">{{ t("sas-result.severe") }}</span>
      </div>

      <div class="hp-desc">
        <span>{{ t("sas-result.hd_2") }}</span>
      </div>

      <CustomButton @click="onTapNext">
        <span>{{ t("sas-result.next_step") }}</span>
      </CustomButton>

      <div class="hp-virtual"></div>

    </div>

  </PageWrapper>

</template>
<style scoped lang="scss">
@use "../../shared/result-shared.scss";

</style>