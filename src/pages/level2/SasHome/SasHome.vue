<script setup lang="ts">
import { onActivated } from 'vue';
import { useI18n } from 'vue-i18n';
import CustomButton from '~/components/custom-ui/custom-button/custom-button.vue';
import { useRouteAndLiuRouter } from '~/routes/liu-router';
import liuUtil from '~/utils/liu-util';

const { t } = useI18n()
const rr = useRouteAndLiuRouter()

onActivated(() => {
  liuUtil.setAppTitle({ val_key: "sas-home.title_0" })
})

</script>
<template>

  <PageWrapper>

    <div class="hp-container">

      <div class="hp-virtual"></div>

      <div class="hp-box">
        <div class="liu-bg-img hp-box-icon"></div>
      </div>

      <div class="liu-no-select hp-title">
        <span>{{ t("sas-home.title") }}</span>
      </div>

      <div class="liu-no-select hp-desc">
        <span>{{ t("sas-home.desc") }}</span>
      </div>

      <CustomButton @click="rr.router.push({ name: 'sas-collect' })">
        <span>{{ t("sas-home.btn") }}</span>
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

.hp-virtual {
  width: 100%;
  height: 60px;
}

.hp-box {
  width: 120px;
  height: 120px;
  position: relative;
  margin-block-end: 60px;
}

.hp-box-icon {
  width: 100%;
  height: 100%;
  background-image: url("/emojis/people_hugging.png");
}

.hp-title {
  font-size: var(--title-font-size);
  color: var(--main-normal);
  font-weight: 700;
  margin-block-end: 20px;
}

.hp-desc {
  font-size: var(--desc-font-size);
  color: var(--main-text);
  text-align: center;
  margin-block-end: 60px;
  line-height: 1.75;
}


</style>