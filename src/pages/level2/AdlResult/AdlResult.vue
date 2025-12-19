<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useAdlResult } from './tools/useAdlResult';
import { useRouteAndLiuRouter } from '~/routes/liu-router';

const { t } = useI18n()
const { adlData } = useAdlResult()
const rr = useRouteAndLiuRouter()

const onTapNext = () => {
  rr.router.push({ 
    name: 'ae-video-start', 
    params: {
      aeType: "visual-check"
    },
  })
}

</script>
<template>

  <PageWrapper>

    <div class="hp-container">

      <div class="liu-no-select hp-top-text">
        <span>{{ t("adl-result.hd_1", { score: adlData.score }) }}</span>
      </div>

      <div class="liu-no-select hp-result">
        <span v-if="adlData.score > 60">{{ t("shared.mild") }}</span>
        <span v-else-if="adlData.score > 40" class="hp-moderate">{{ t("shared.moderate") }}</span>
        <span v-else class="hp-severe">{{ t("shared.severe") }}</span>
      </div>

      <div class="hp-desc">
        <span>{{ t("adl-result.hd_2") }}</span>
      </div>

      <CustomButton @click="onTapNext">
        <span>{{ t("adl-result.next_step") }}</span>
      </CustomButton>

      <div class="hp-virtual"></div>

    </div>

  </PageWrapper>


</template>
<style scoped lang="scss">

.hp-container {
  width: 100%;
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.hp-top-text {
  font-size: var(--desc-font-size);
  color: var(--main-normal);
  font-weight: 700;
  margin-block-end: 30px;
  text-align: center;
}

.hp-result {
  font-size: var(--big-word-size);
  color: var(--main-text);
  font-weight: 700;
  margin-block-end: 70px;
  text-align: center;
}

.hp-desc {
  font-size: var(--mini-font-size);
  color: var(--main-note);
  text-align: center;
  white-space: pre;
  margin-block-end: 60px;
}

.hp-moderate {
  color: var(--moderate-color);
}

.hp-severe {
  color: var(--severe-color);
}

.hp-virtual {
  width: 100%;
  height: 30px;
}

</style>