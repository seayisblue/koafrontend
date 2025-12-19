<script setup lang="ts">
import { ref, onActivated } from "vue";
import liuUtil from "~/utils/liu-util";
import { useRouteAndLiuRouter } from "~/routes/liu-router";
import { useI18n } from 'vue-i18n';
import { hasCorpusLiberum } from "../shared/scripts";

const topIllustration = "/figma/running.png";
const walkImg = "/figma/walking.png";
const bikeImg = "/figma/cycling.png";
const swimImg = "/figma/swimming.png";

const { t } = useI18n();
const rr = useRouteAndLiuRouter();

const activityList = [
  { key: "walking", label: "平地快走", icon: walkImg },
  { key: "bike", label: "功率自行车", icon: bikeImg },
  { key: "swimming", label: "游泳", icon: swimImg },
];

const selectedKey = ref("");

const onItemClick = (key: string) => {
  selectedKey.value = key;
  setTimeout(() => {
    selectedKey.value = "";
  }, 300);

  rr.router.push({
    name: "moderate-aerobic-check",
    query: { type: key },
  });
};

const onTapBack = () => {
  rr.router.naviBack();
};

onActivated(() => {
  liuUtil.setAppTitle({ val_key: "mild-aerobic.title" });
  selectedKey.value = "";
});
</script>

<template>
<div class="page-wrapper">
  <div class="page-container">
    <div class="header-card">
      <div class="header-content">
        <div class="illustration-col">
          <img :src="topIllustration" class="run-img" alt="Exercise" />
        </div>
        <div class="text-col">
          <h1 class="main-title">{{ t("mild-aerobic.checkin-title") }}</h1>
          <p class="sub-title">{{ t("mild-aerobic.checkin-subtitle") }}</p>
          <p v-if="hasCorpusLiberum()" class="sub-title">{{ t("mild-aerobic.notice") }}</p>
        </div>
      </div>
    </div>

    <div class="instruction-text">
      {{ t("mild-aerobic.checkin-instruction") }}
    </div>

    <div class="activity-list">
      <div
        v-for="item in activityList"
        :key="item.key"
        class="activity-card"
        :class="{ 'is-active': selectedKey === item.key }"
        @click="onItemClick(item.key)"
      >
        <div class="card-icon">
          <img :src="item.icon" class="item-icon-img" alt="" />
        </div>
        <div class="card-label">
          {{ item.label }}
        </div>
      </div>
    </div>

    <div class="footer-area">
      <button class="back-btn" @click="onTapBack">上一步</button>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
$dark-bg: rgba(28, 86, 113, 0.4);
$light-bg: rgba(255, 255, 255, 0.45);
$icon-size: 96px;
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
    background: transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px;
    box-sizing: border-box;
    color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.header-card {
    width: 100%;
    background-color: $dark-bg;
    border-radius: 16px;
    padding: 24px 20px;
    box-sizing: border-box;
    margin-top: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    .header-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}

.illustration-col {
    flex: 0 0 80px;
    display: flex;
    justify-content: center;
    align-items: center;

    .run-img {
        width: $icon-size;
        height: $icon-size;
        object-fit: contain;
    }
}

.text-col {
    flex: 1;
    padding-left: 20px;
    text-align: left;

    .main-title {
        margin: 0;
        font-size: 24px;
        font-weight: 800;
        line-height: 1.3;
        white-space: pre-wrap;
        letter-spacing: 1px;
    }

    .sub-title {
        margin: 8px 0 0 0;
        font-size: 12px;
        opacity: 0.8;
        font-weight: 400;
    }
}

.instruction-text {
    margin-top: 24px;
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: 600;
    opacity: 0.95;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.activity-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex: 1;
}

.activity-card {
    width: 100%;
    height: 100px;
    border-radius: 12px;
    background-color: $light-bg;
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    padding: 0 24px;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.2s ease;

    &.is-active,
    &:hover {
        background-color: $dark-bg;
        transform: scale(1.02);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    &:active {
        transform: scale(0.98);
        background-color: $dark-bg;
        opacity: 0.9;
    }
}

.card-icon {
    width: $icon-size;
    height: $icon-size;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;

    .item-icon-img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}

.card-label {
    font-size: 28px;
    font-weight: 700;
    letter-spacing: 1.5px;
    color: #fff;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    margin-left: 28px;
}

.footer-area {
    width: 100%;
    margin-top: 40px;
    display: flex;
    justify-content: center;
    padding-bottom: 30px;
}

.back-btn {
    width: 100%;
    max-width: 240px;
    height: 52px;
    background-color: #F7F9FC;
    color: #15455E;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
    transition: opacity 0.2s;

    &:active {
        opacity: 0.8;
    }
}
</style>