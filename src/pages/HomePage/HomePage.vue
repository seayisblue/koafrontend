<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useRouteAndLiuRouter } from '~/routes/liu-router';
import { usePageShared } from '~/pages/shared/usePageShared';

usePageShared({ title_key: "hello.world" })

const { t } = useI18n()
const rr = useRouteAndLiuRouter()

const onTapStart = () => {
  rr.router.push({ name: "basic-info" })
}

const version = LIU_ENV.version

</script>
<template>

  <PageWrapper>

    <div class="hp-container">

      <div class="hp-virtual-one"></div>

      <div class="hp-title">
        <span class="liu-no-select">{{ t("hello.title") }}</span>
      </div>

      <div class="hp-desc">
        <span class="liu-no-select">{{ t("hello.desc") }}</span>
      </div>

      <div class="hp-virtual-two"></div>

      <CustomButton @click.stop="onTapStart">
        <span>{{ t("hello.start") }}</span>
      </CustomButton>

    </div>

    <div class="liu-no-select hp-footer-area">
      <span>{{ t("hello.copyright", { version }) }}</span>
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

.hp-virtual-one {
  width: 100%;
  height: 50px;
}

.hp-title {
  text-align: center;
  font-size: var(--title-font-size);
  color: var(--main-normal);
  font-weight: 700;
  margin-block-end: 20px;
  letter-spacing: 3px;
}

.hp-desc {
  font-size: var(--btn-font-size);
  color: var(--main-text);
  text-align: center;
  white-space: pre;
}

.hp-desc_span {
  user-select: text;
}

.hp-virtual-two {
  width: 100%;
  height: 20%;
}

.hp-footer-area {
  font-size: var(--mini-font-size);
  color: var(--copyright-color);
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;
  text-align: center;
}



</style>