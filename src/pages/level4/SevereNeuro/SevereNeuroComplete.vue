<script setup lang="ts">
import { onActivated, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouteAndLiuRouter } from '~/routes/liu-router';
import liuUtil from '~/utils/liu-util';

const CompleteImg = "/figma/complete.png";

const { t } = useI18n();
const rr = useRouteAndLiuRouter();

onActivated(() => {
  liuUtil.setAppTitle({ val_key: "已完成所有运动" });
});

const planStr = computed(() => rr.route.query?.plan as string || "");

const stepsData = computed(() => {
  if (!planStr.value) return []; 

  const list = planStr.value.split(',');
  
  const nodes = list.map((id, index) => {
    let label = t(`mild-neuro.exercise-${id}`);
    if (label.includes('exercise-')) label = t(`moderate-neuro.exercise-${id}`);
    if (label.includes('exercise-')) label = t(`severe-neuro.exercise-${id}`);
    if (label.includes('exercise-')) label = id;

    return {
      label: label,
      done: true,
      startLineDone: true,
      lineDone: true
    };
  });

  return [{ title: '', nodes }];
});

const onTapCheckin = () => {
  rr.router.push({ name: `severe-neuro-check` });
};


</script>

<template>
<div class="page-wrapper">
  <div class="page-container">

    <div class="content-area">
      <div class="title-section">
        <h1 class="main-title">恭喜您</h1>
        <h2 class="sub-title">已完成所有运动！</h2>
      </div>

      <div class="icon-area">
        <img :src="CompleteImg" class="completion-icon" alt="完成" />
      </div>

      <div class="progress-box">
        <ProgressLine v-if="stepsData.length > 0" :steps="stepsData" />
      </div>
    </div>


    <div class="button-area">
      <button class="action-btn btn-primary" @click="onTapCheckin">
        打卡
      </button>
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
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  color: #333;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.content-area {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; 
  padding: 40px 0 20px 0; 
}

.title-section {
  text-align: center;
}

.icon-area {
  margin-bottom: 30px; 
}

.completion-icon {
  width: 300px;
  height: 300px;
  object-fit: contain;
}

.main-title {
  font-size: 36px;
  font-weight: 700;
  color: #FFFFFF;
  text-align: center;
  margin-bottom: 5px; 
  letter-spacing: 1px;
  margin-top: 0; 
}

.sub-title {
  font-size: 32px;
  font-weight: 600;
  color: #FFFFFF;
  text-align: center;
  opacity: 0.9;
  margin-top: 0; 
}

.completed-list {
  width: 100%;
  max-width: 320px;
}

.exercise-item {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  
  &:last-child {
    margin-bottom: 0;
  }
}

.item-check {
  width: 24px;
  height: 24px;
  background-color: #4CAF50;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  font-size: 14px;
  font-weight: bold;
}

.item-text {
  flex: 1;
  font-size: 18px;
  font-weight: 600;
  color: #2D3748;
}

.button-area {
  margin-top: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 120px;
}

.action-btn {
  width: 80%; 
  max-width: 170px; 
  height: 52px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  transition: transform 0.1s;
  border: none; 
  
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

.btn-primary { 
  background-color: #2D5D72; 
  color: #FFFFFF; 
}

.progress-box {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 10px; 
  margin-top: 70px;
}
</style>