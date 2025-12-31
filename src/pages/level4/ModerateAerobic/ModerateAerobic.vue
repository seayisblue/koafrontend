<script setup lang="ts">
import { useRouter } from "vue-router";
import { useI18n } from 'vue-i18n';
import { KneeRestTip } from "./tools/scripts";

const runImg = "/figma/running.png";

const { t } = useI18n();
const router = useRouter();
const kneeRestTip = KneeRestTip();

const onTapBack = () => {
  router.back();
};

const onTapStart = () => {
  router.push({ name: "moderate-aerobic-select" });
};
</script>

<template>
<div class="page-wrapper">
  <div class="page-container">
    <div class="header-title liu-no-select">{{ t("mild-aerobic.title")}}</div>

    <div class="illustration-box">
      <img :src="runImg" class="illustration-img" alt="Run" />
    </div>

    <div class="info-card">
      <div class="info-row">
          <span class="info-label">{{ t("mild-aerobic.frequency") }}</span>
          <span class="info-value">{{ t("mild-aerobic.frequency-value") }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">{{ t("mild-aerobic.intensity") }}</span>
          <span class="info-value">{{ t("mild-aerobic.intensity-value") }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">{{ t("mild-aerobic.duration") }}</span>
          <span class="info-value">{{ t("moderate-aerobic.duration-value") }}</span>
        </div>
    </div>

    <div class="tips-area">
      <div class="tips-title">{{ t("mild-aerobic.tip-title") }}</div>
      <div v-if="kneeRestTip" class="tips-content">
        {{ t("moderate-aerobic.knee-rest-tip") }}
      </div>
       <div class="tips-content">{{ t("moderate-aerobic.tip-content") }}</div>
    </div>

    <div class="footer-btns">
      <div class="action-btn btn-white" @click="onTapBack">
        上一步
      </div>
      <div class="action-btn btn-primary" @click="onTapStart">
        开始吧
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
  .page-wrapper {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #4D7A8F 0%, #CDDAE0 100%);
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

.header-title {
  margin-top: 30px;
  font-size: 28px;
  font-weight: 700;
}

.illustration-box {
  margin-top: 30px;
  width: 240px;
  height: 240px;
  display: flex;
  justify-content: center;
  align-items: center;

  .illustration-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.info-card {
  width: 90%;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  box-sizing: border-box;
  margin-top: 10px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;

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
  font-weight: 600;
  margin-bottom: 8px;
}

.tips-content {
  font-size: 14px;
  line-height: 2;
  white-space: pre-line;
}

.footer-btns {
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.action-btn {
  flex: 1;
  height: 50px;
  border-radius: 8px;
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
