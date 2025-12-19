<script setup lang="ts">
import { computed, onActivated } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouteAndLiuRouter } from '~/routes/liu-router';
import liuUtil from '~/utils/liu-util';

const { t } = useI18n()
const rr = useRouteAndLiuRouter()

const exerciseId = computed(() => (rr.route.params.exerciseId as string) || '')

const planStr = computed(() => (rr.route.query?.plan as string) || exerciseId.value)
//待确定准备页是否需要进度条
/* 
const planList = computed(() => planStr.value.split(','))
const currentIndex = computed(() => planList.value.indexOf(exerciseId.value))

const stepsData = computed(() => {
  const nodes = planList.value.map((id, index) => {
    const isPast = index < currentIndex.value
    const isCurrent = index === currentIndex.value

    return {
      label: t(`mild-neuro.exercise-${id}`),    
      done: isPast,   
      lineDone: isPast, 
      startLineDone: isPast || isCurrent 
    }
  })
  return [{ title: '', nodes }]
}) */

onActivated(() => {
  const titleKey = `mild-neuro.exercise-${exerciseId.value}`
  liuUtil.setAppTitle({ val_key: titleKey })
})

const onTapStart = () => {
  rr.router.push({ 
    name: 'mild-neuro-video', 
    params: { exerciseId: exerciseId.value },
    query: { plan: planStr.value }
  })
}

const onTapBack = () => {
  rr.router.naviBack()
}

const exerciseConfig = computed(() => {
  const configs: Record<string, any> = {
    // 1. 坐位伸膝
    'knee-stretch-when-sitting': {
      hasPrepare: true,
      hasFrequency: true,
      hasSteps: true,
      hasTip: false, 
      hasIntensity: true,
    },
    // 2. 上下台阶
    'walk-up-and-down-the-stairs': {
      hasPrepare: true,
      hasFrequency: true,
      hasSteps: true,
      hasTip: true,
      hasIntensity: true,
    },
    // 3. 上下台阶训练（单个）
    'walk-up-and-down-the-block': {
      hasPrepare: true,
      hasFrequency: true,
      hasSteps: true,
      hasTip: true,
      hasIntensity: true,
    },
    // 4. 前后滑动（平衡垫）
    'slide-forward-and-back-with-balancing-pad': {
      hasPrepare: true,
      hasFrequency: true,
      hasSteps: true,
      hasTip: true,
      hasPadTip: true,
      hasIntensity: true,
    },
    // 5. 坐站转移训练（进阶版）
    'advanced-stand-to-sit': {
      hasPrepare: true,
      hasFrequency: true,
      hasSteps: true,
      hasTip: false, 
      hasIntensity: true,
    },
    // 6. 单腿站立平衡（平衡垫）
    'stand-on-one-leg-with-balancing-pad': {
      hasPrepare: true,
      hasFrequency: true,
      hasSteps: true,
      hasTip: false, 
      hasPadTip: true,
      hasIntensity: true,
    },
    // 7. 单腿站立平衡（髋外展推墙）
    'stand-on-one-leg-against-wall': {
      hasPrepare: false, 
      hasFrequency: true,
      hasSteps: true,
      hasTip: false,
      hasIntensity: true,
    },
    // 8. 股四头肌牵伸
    'quadriceps-stretching': {
      hasPrepare: false, 
      hasFrequency: true,
      hasSteps: true,
      hasTip: false,
      hasIntensity: true,
    },
  }
  return configs[exerciseId.value] || {}
})



</script>
<template>
  <div class="page-wrapper">
    <div class="snd-container">

      <!-- <div class="progress-line-wrapper">
         <ProgressLine :steps="stepsData" />
      </div> -->

      <div class="snd-title">
        {{ t(`mild-neuro.detail-title-${exerciseId}`) }}
      </div>

      <div class="snd-sections">

        <div v-if="exerciseConfig.hasPrepare" class="snd-card">
          <div class="snd-card-title">
            {{ t("mild-neuro.prepare-title") }}
          </div>
          <div class="snd-card-content">
            {{ t(`mild-neuro.prepare-${exerciseId}`) }}
          </div>
        </div>

        <div class="info-row" v-if="exerciseConfig.hasFrequency || exerciseConfig.hasDuration">
          
          <div v-if="exerciseConfig.hasFrequency" class="snd-card half-card">
            <div class="snd-card-title">
              {{ t("mild-neuro.frequency-title") }}
            </div>
            <div class="snd-card-content center-content">
              {{ t(`mild-neuro.frequency-${exerciseId}`) }}
            </div>
          </div>

          <div v-if="exerciseConfig.hasIntensity" class="snd-card half-card">
            <div class="snd-card-title">
              {{ t("mild-neuro.intensity-title") }}
            </div>
            <div class="snd-card-content center-content">
               {{ t(`mild-neuro.intensity-${exerciseId}`) }}
            </div>
          </div>
        </div>

        <div v-if="exerciseConfig.hasSteps" class="snd-card">
          <div class="snd-card-title">
            {{ t("mild-neuro.steps-title") }}
          </div>
          <div class="snd-card-content">
            {{ t(`mild-neuro.steps-${exerciseId}`) }}
          </div>
        </div>

      </div>

      <div class="bottom-tips-area">
        <div class="tips-group">
          可以分组进行<br>每组间休息1-2分钟
        </div>
        <div v-if="exerciseConfig.hasTip" class="tips-content">
           <div class="tips-title">{{ t("mild-neuro.detail-tip-title") || "小提示" }}</div>
           <div class="tips-text">{{ t(`mild-neuro.detail-tip-${exerciseId}`) }}</div>
        </div>
      </div>

      <div class="footer-btns">
        <button class="action-btn btn-white " @click="onTapBack">
           上一步
        </button>
        <button class="action-btn btn-primary" @click="onTapStart">
           开始吧
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
.page-wrapper {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #4E7B90 0%, #B1C5CE 66%);
  display: flex;
  justify-content: center; 
}

.snd-container {
  width: 100%;
  min-height: 100vh;
  max-width: 480px;
  padding: 26px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent;
  box-sizing: border-box;
}

.snd-title {
  font-size: 24px;
  color: white;
  font-weight: 700;
  text-align: center;
  line-height: 1.5;
  margin-bottom: 40px;
  margin-top: 24px;
}

.snd-sections {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.snd-card {
  background: rgba(255, 255, 255, 0.25);
  padding: 18px;
  border-radius: 8px;
  backdrop-filter: blur(4px);
}

.info-row {
  display: flex;       
  gap: 16px;          
  width: 100%;
  align-items: stretch; 
}

.half-card {
  flex: 1;            
  display: flex;      
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;     
  min-width: 0;    
}

.snd-card-title {
  font-size: 20px;
  font-weight: 790;
  color: #285E78;
  margin-bottom: 5px;
  text-align: center;
}


.snd-card-content {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.8;
  color: white;
  white-space: pre-wrap;
}

.center-content {
  text-align: center;
}

.bottom-tips-area {
  margin-top: 24px;
  text-align: center;
  color: rgba(255,255,255, 0.9);
  font-size: 18px;
  line-height: 1.8;
  font-weight: 500;
}

.tips-group {
  margin-bottom: 12px;
  font-weight: 600;
}

.tips-title {
  color: #285E78; 
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 4px;
}

.tips-text {
  font-size: 15px;
  margin-bottom: 20px;
  font-weight: 540;
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

/* .progress-line-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  margin-top: 60px;
} */
</style>