<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useAdvice } from "./tools/useAdvice";

const { t } = useI18n();
const doctorImg = "/figma/doctor.png";
const QRcodeImg = "/doctor01.png";

const { onTapBack, onTapNext, category, period } = useAdvice();
</script>

<template>
<div class="page-wrapper">
  <div class="page-container">
    <div class="header-title liu-no-select">{{ t("lose-weight-advice.title") }}</div>

    <div class="illustration-box">
      <img :src="doctorImg" class="illustration-img" alt="Doctor" />
    </div>

    <div class="info-card">
      <div class="info-row">
        <span class="info-label">{{ t("lose-weight-advice.advice") }}</span>
      </div>
      <div class="info-row" v-if="category === 'preobesity'">
        <span class="info-label">{{ t("lose-weight-advice.additional-advice-for-preobesity") }}</span>
      </div>
    </div>

    <div class="tips-area" v-if="category === 'obesity'">
      <div class="tips-title">{{ t("lose-weight-advice.tip-for-obesity-title") }}</div>
      <div class="tips-content">{{ t("lose-weight-advice.tip-for-obesity-content-1") }}</div>
      <div class="tips-content">{{ t("lose-weight-advice.tip-for-obesity-content-2") }}</div>
    </div>

    <div class="tips-area" v-if="category === 'preobesity' && period > 90">
      <div class="tips-title">{{ t("lose-weight-advice.tip-for-obesity-title") }}</div>
      <div class="tips-content">{{ t("lose-weight-advice.tip-for-preobesity-content-1") }}</div>
      <div class="tips-content">{{ t("lose-weight-advice.tip-for-preobesity-content-2") }}</div>
      <img :src="QRcodeImg" alt="QR code" width="400" />
    </div>

    <div class="footer-btns">
      <div class="action-btn btn-white" @click="onTapBack">上一步</div>
      <div class="action-btn btn-primary" @click="onTapNext">下一步</div>
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
  font-size: 32px;
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
  max-width: 400px; 
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
  margin-top: 200px;
  margin-bottom: 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  max-width: 400px;
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
