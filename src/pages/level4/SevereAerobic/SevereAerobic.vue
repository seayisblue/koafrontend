<script setup lang="ts">
import { onActivated } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouteAndLiuRouter } from '~/routes/liu-router';
import liuUtil from '~/utils/liu-util';

const walkImg = "/figma/walking.png";

const { t } = useI18n();
const rr = useRouteAndLiuRouter();

onActivated(() => {
  liuUtil.setAppTitle({ val_key: "severe-aerobic.title" });
});

const onTapStart = () => {
  rr.router.push({
    name: "severe-aerobic-check",
  });
};

const onTapBack = () => {
  rr.router.naviBack();
};

</script>

<template>
<div class="page-wrapper">
  <div class="page-container">
    <div class="content-section">
      <div class="header-title liu-no-select">
        {{ t("severe-aerobic.intro-title") }}
      </div>

      <div class="illustration-box">
        <img :src="walkImg" class="illustration-img" alt="Run" />
      </div>

      <div class="info-card">
        <div class="info-row">
          <span class="info-label">{{ t("severe-aerobic.frequency") }}</span>
          <span class="info-value">{{ t("severe-aerobic.frequency-value") }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">{{ t("severe-aerobic.intensity") }}</span>
          <span class="info-value">{{ t("severe-aerobic.intensity-value") }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">{{ t("severe-aerobic.duration") }}</span>
          <span class="info-value">{{ t("severe-aerobic.duration-value") }}</span>
        </div>
      </div>

      <div class="tips-area">
        <div class="tips-title">{{ t("severe-aerobic.tip-title") }}</div>
        <div class="tips-content">{{ t("severe-aerobic.tip-content") }}</div>
      </div>

      <div class="footer-btns">
        <div class="action-btn btn-white" @click="onTapBack">
          {{ t('shared.back') }}
        </div>
        <div class="action-btn btn-primary" @click="onTapStart">
          {{ t('shared.confirm') }}
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.page-wrapper {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #376A82 0%, #FFFFFF 100%);
  display: flex;
  justify-content: center; 
}

.page-container {
  min-height: 100vh;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  position: relative;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  color: #fff;
}

.content-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-title {
  margin-top: 30px;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
}

.illustration-box {
  margin-top: 20px;
  width: 200px;
  height: 200px;
}

.illustration-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.info-card {
  width: 90%;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  padding: 24px;
  margin-top: 15px;
  backdrop-filter: blur(8px);
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  &:last-child {
    margin-bottom: 0;
  }
}

.info-label {
  font-size: 16px;
  font-weight: 600;
}

.info-value {
  font-size: 16px;
  font-weight: 700;
}

.tips-area {
  margin-top: 30px;
  text-align: center;
}

.tips-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
}

.tips-content {
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-line;
  }


.footer-btns {
  margin-top: 200px;
  margin-bottom: 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.action-btn {
  flex: 1;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  &:active {
    transform: scale(0.98);
  }
}

.btn-white {
  background-color: #ffffff;
  color: #4a5568;
}

.btn-primary {
  background-color: #2d5d72;
  color: #ffffff;
}
</style>
