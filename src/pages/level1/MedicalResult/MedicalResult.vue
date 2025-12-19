<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { getImageConfig } from '~/config/images';

const { doctors } = getImageConfig()
const src = doctors.hechengqi.src

const { t } = useI18n()

</script>
<template>

  <PageWrapper>
    <div class="hp-container">

      <div class="hp-img-box">
        <liu-img :src="src" class="hp-img"></liu-img>
      </div>

      <div class="liu-no-select hp-title">
        <span>{{ t('medical-result.title') }}</span>
      </div>

      <div class="liu-no-select hp-desc">
        <span>{{ t('medical-result.desc') }}</span>
      </div>


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

.hp-img-box {
  width: 100%;
  padding-block-end: 61%;
  position: relative;
  box-sizing: border-box;
  border-radius: 16px;
  overflow: hidden;
}

.hp-img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.hp-title {
  margin-block-start: 50px;
  font-size: var(--sub-title-font-size);
  color: var(--main-text);
  font-weight: 700;
  text-align: center;
}

.hp-desc {
  margin-block-start: 8px;
  font-size: var(--mini-font-size);
  color: var(--main-text);
  text-align: center;
  text-wrap: balance;
  padding-block-end: 50px;
  line-height: 1.75;
}

</style>