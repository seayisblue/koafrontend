<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useTugResult } from './tools/useTugResult';

const { t } = useI18n()
const { tugData, onTapNext } = useTugResult()

</script>
<template>

  <PageWrapper>

    <div class="hp-container">

      <div class="liu-no-select hp-top-text">
        <span>{{ t("tug-result.time", { value: tugData.time }) }}</span>
      </div>

      <div class="liu-no-select hp-result">
        <span v-if="tugData.time < 10" class="hp-healthy">{{ t("tug-result.normal") }}</span>
        <span v-else-if="tugData.time < 15" class="hp-mild">{{ t("tug-result.low-risk") }}</span>
        <span v-else-if="tugData.time <= 20" class="hp-moderate">{{ t("tug-result.mid-risk") }}</span>
        <span v-else class="hp-severe">{{ t("tug-result.high-risk") }}</span>
      </div>

      <CustomButton @click="onTapNext">
        <span>{{ t("tug-result.next_step") }}</span>
      </CustomButton>

      <div class="hp-virtual"></div>

    </div>

  </PageWrapper>

</template>
<style scoped lang="scss">
@use "../../shared/result-shared.scss";

</style>