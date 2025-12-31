<script setup lang="ts">
import { onActivated } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouteAndLiuRouter } from '~/routes/liu-router';
import liuUtil from '~/utils/liu-util';
import { hasCorpusLiberum } from "../shared/scripts";

const balanceImg = "/figma/balance.png";

const { t } = useI18n();
const rr = useRouteAndLiuRouter()

onActivated(() => {
  liuUtil.setAppTitle({ val_key: "moderate-neuro.title" })
})

const onTapStart = () => {
  rr.router.push({ name: 'moderate-neuro-select' })
}

const onTapBack = () => {
  rr.router.naviBack()
}

const pageData = {
  title: t("moderate-neuro.title"),
  infoList: [
    { label: t("moderate-neuro.frequency"), value: t("moderate-neuro.frequency-value") },
    { label: t("moderate-neuro.intensity"), value: t("moderate-neuro.intensity-value") },
    { label: t("moderate-neuro.duration"), value: t("moderate-neuro.duration-value") },
  ],
  tipTitle: t("moderate-neuro.tip-title"),
  tipContent: t("moderate-neuro.tip-content"),
  warningText: "如果在下蹲过程中出现关节绞锁、弹响\n则停止该动作"
}

</script>

<template>
<div class="page-wrapper">
  <div class="page-container">
    <div class="header-title liu-no-select">{{ pageData.title }}</div>

    <div class="illustration-box">
      <img :src="balanceImg" class="illustration-img" alt="Neuro Training" />
    </div>

    <div class="info-card">
      <div 
        v-for="(item, index) in pageData.infoList" 
        :key="index" 
        class="info-row"
      >
        <span class="info-label">{{ item.label }}</span>
        <span class="info-value">{{ item.value }}</span>
      </div>
    </div>

    <div class="tip-card">
      <div class="tip-title">{{ pageData.tipTitle }}</div>
      <div class="tip-content">
        {{ pageData.tipContent }}
      </div>
    </div>

    <div class="warning-text", v-if="hasCorpusLiberum()">
      {{ pageData.warningText }}
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
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.header-title {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 1px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px;
  margin-top: 40px;
}

.illustration-box {
  width: 180px;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  .illustration-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.info-card, .tip-card {
  width: 80%;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: 20px 24px;
  box-sizing: border-box;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 16px;
}

.info-row {
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 12px;
&:last-child { margin-bottom: 0; }
}

.info-label {
  font-size: 16px;
  font-weight: 600;
  opacity: 0.95;
  min-width: 50px; 
  white-space: nowrap; 
  margin-right: 12px;
  flex-shrink: 0;
}

.info-value {
  font-size: 16px;
  font-weight: 600;
}
.tip-card { text-align: center; }
.tip-title { font-size: 18px; font-weight: 700; margin-bottom: 8px; }
.tip-content { 
   font-size: 14px;
   line-height: 1.6; 
   opacity: 0.9; 
   font-weight: 500; 
   white-space: pre-line; }

.warning-text {
  text-align: center;
  font-size: 13px;
  opacity: 0.85;
  white-space: pre-wrap;
  line-height: 1.5;
  margin-bottom: 30px;
  width: 100%;
}

.footer-btns {
  margin-top: auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding-bottom: 20px;
}
.action-btn {
  flex: 1;
  height: 52px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  transition: transform 0.1s;
  &.is-active,
    &:hover {
        opacity: 0.9;
        transform: scale(0.98);
    }

  &:active {
    opacity: 0.9;
    transform: scale(0.98);
  }
}
.btn-white { background-color: #FFFFFF; color: #4A5568; }
.btn-primary { background-color: #2D5D72; color: #FFFFFF; }
</style>