<script setup lang="ts">
import { ref, onActivated } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouteAndLiuRouter } from '~/routes/liu-router';
import liuUtil from '~/utils/liu-util';
import { exerciseList } from './tools/scripts';
import cui from '~/components/custom-ui';

const balanceImg = "/figma/balance.png";

const { t } = useI18n()
const rr = useRouteAndLiuRouter()
const selectedExercises = ref<string[]>([])

onActivated(() => {
  liuUtil.setAppTitle({ val_key: "mild-neuro.select-title" })
})

const exercises = exerciseList()

/**
 * TO DO
 * 第二天打开神经肌肉训练时页面默认之前的选项，但患者也可自己改
 */
const toggleExercise = (exerciseId: string) => {
  const index = selectedExercises.value.indexOf(exerciseId)
  if (index > -1) {
    selectedExercises.value.splice(index, 1)
  } else if (selectedExercises.value.length == 3) {
    cui.showModal({
      title: "温馨提示",
      content: "单日选择的种类不超过三项，如需选择，请先需要取消一项",
      confirmText: "知道了",
      showCancel: false,
    })
  } else {
    selectedExercises.value.push(exerciseId)
  }
}

const onTapNext = () => {
  if (selectedExercises.value.length === 0) {
    return
  }
  
  const firstExercise = selectedExercises.value[0]
  const plan = selectedExercises.value.join(',')

  rr.router.push({ 
    name: 'mild-neuro-detail', 
    params: { exerciseId: firstExercise },
    query: { plan } 
  })
}
const onTapBack = () => {
  rr.router.naviBack()
}

</script>

<template>
<div class="page-wrapper">
  <div class="page-container">
    <div class="header-card">
      <div class="header-content">
        <div class="illustration-col">
          <img :src="balanceImg" class="header-img" alt="Exercise" />
        </div>
        <div class="text-col">
          <h1 class="main-title">任选一个训练<br>去做吧！</h1>
        </div>
      </div>
    </div>

    <div class="list-container">
      <div 
        v-for="exercise in exercises" 
        :key="exercise.id"
        class="select-item"
        :class="{ 'is-active': selectedExercises.includes(exercise.id) }"
        @click="toggleExercise(exercise.id)"
      >
        <span>{{ t(`mild-neuro.exercise-${exercise.key}`) }}</span>
      </div>
    </div>

    <div class="spacer"></div>

    <div class="footer-btns">
      <div class="action-btn btn-white" @click="onTapBack">
        上一步
      </div>
      <div class="action-btn btn-primary" @click="onTapNext">
        下一步
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.page-wrapper {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #2E637C 0%, #CDDAE0 100%);
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
}

.header-card {
  width: 100%;
  height: 140px;
  padding: 0 24px;
  box-sizing: border-box;
  margin-top: 20px;
  margin-bottom: 30px;
  padding-left: 55px;
  display: flex;
  align-items: center;
  
  .header-content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
  }
}

.illustration-col {
  flex: 0 0 80px;
  display: flex;
  justify-content: center;
  
  .header-img {
    width: 120px;
    height: 120px;
    object-fit: contain;
  }
}

.text-col {
  flex: 1;
  text-align: left;

  .main-title {
    margin: 0;
    font-size: 24px;
    font-weight: 800;
    line-height: 1.4;
    letter-spacing: 1px;
  }
}

.list-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
}

.select-item-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}

.select-item {
  width: 90%;
  height: 56px;
  border-radius: 8px;
  margin: 0 auto;

  background: rgba(241, 243, 246, 0.3);
  backdrop-filter: blur(4px);

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 18px;
  font-weight: 600;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0,0,0,0.1);

  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

  &.is-active {
    width: 95%;
    background-color: #15455E80;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    transform: scale(1.02);
  }
  @media (hover: hover) {
    &:hover:not(.is-active) { 
      background-color: rgba(241, 243, 246, 0.4);
      transform: scale(1.01);
    }
  }

  &:active {
    transform: scale(0.96); /* 按下时稍微缩小，松开即恢复 */
    opacity: 0.8;
  }
}


.spacer {
  height: 30px;
}

.footer-btns {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
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
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  transition: opacity 0.2s;

  @media (hover: hover) {
    &:hover {
      filter: brightness(1.1); /* 悬停时稍微变亮 */
    }
  }

  &:active {
    opacity: 0.9;
    transform: scale(0.98);
  }
}

.btn-white {
  background-color: #F7F9FC;
  color: #4A5568;
}

.btn-primary {
  background-color: #2D5D72;
  color: #FFFFFF;
}
</style>