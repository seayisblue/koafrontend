<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRouteAndLiuRouter } from '~/routes/liu-router';
import { getVideoLinks2, type FileKey2 } from '~/config/files2';
import liuUtil from '~/utils/liu-util';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const rr = useRouteAndLiuRouter()
const videoSrc = ref("")

const exerciseVideoMap: Record<string, FileKey2> = {
  'hamstring-stretch': 'hamstrings_stretch',
  'hamstring-contraction': 'hamstrings_contraction',
  'calf-triceps-stretch': 'calf_triceps_stretch',
  'knee-stretch-sitting': 'knee_stretch_when_sitting',
  'stand-on-one-leg': 'stand_on_one_leg',
  'stand-to-sit': 'stand_to_sit',
  'quadriceps-stretch': 'quadriceps_stretching',
}

const exerciseId = computed(() => (rr.route.params.exerciseId as string) || '')
const planStr = computed(() => (rr.route.query?.plan as string) || exerciseId.value || '')
const planList = computed(() => {
  if (!planStr.value) return []
  return planStr.value.split(',')
})
const currentIndex = computed(() => planList.value.indexOf(exerciseId.value))

const stepsData = computed(() => {
  const nodes = planList.value.map((id, index) => {
    const isPast = index < currentIndex.value
    const isCurrent = index === currentIndex.value
    
    return {
      label: t(`severe-neuro.exercise-${id}`),
      done: isPast || isCurrent,
      lineDone: isPast,
      startLineDone: isPast || isCurrent
    }
  })
  return [{ title: '', nodes }]
})

watch(() => exerciseId.value, (newId) => {
  if(!newId) return
  
  const videoKey = exerciseVideoMap[newId]
  if(!videoKey) return
  
  const vLinks = getVideoLinks2()
  const src = vLinks[videoKey]
  if(!src) return
  
  videoSrc.value = src
  
  const titleKey = `severe-neuro.exercise-${newId}`
  liuUtil.setAppTitle({ val_key: titleKey })
}, { immediate: true })

const onTapNext = () => {
  if (currentIndex.value < planList.value.length - 1) {
    const nextId = planList.value[currentIndex.value + 1]
    rr.router.push({
      name: 'severe-neuro-detail', 
      params: { exerciseId: nextId },
      query: { plan: planStr.value } 
    })
  } else {
    rr.router.push({ 
      name: 'severe-neuro-complete', 
      query: { 
        plan: planStr.value, 
        type: 'severe'         
      } 
    }) 
  }
}

const onTapBack = () => {
  const stacks = rr.router.getStack()
  if(stacks.length < 2) {
    rr.router.goHome()
    return
  }
  rr.router.naviBack()
}
</script>
<template>
  <div class="page-wrapper">
    <div class="page-container">

      <PageWrapper v-if="videoSrc" class="page-core">

        <div class="progress-line-wrapper">
        <ProgressLine :steps="stepsData" />
        </div>


        <video
          autoplay
          controls
          class="snv-video"
          :src="videoSrc"
          playsinline
          webkit-playsinline
        ></video>

        <div class="footer-btns">
          <button class="action-btn btn-white" @click="onTapBack">上一步</button>
          <button class="action-btn btn-white" @click="onTapNext">下一步</button>
        </div>

      </PageWrapper>

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

.page-container {
  width: 100%;
  max-width: 480px;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.page-core {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  background: transparent !important;
  box-shadow: none !important;
  padding: 0 !important;
}

.snv-video {
  width: 100%;
  height: 70vh;
  object-fit: contain;
  border-radius: 8px;
  background-color: #000;
  margin-bottom: 20px;
}

.footer-btns {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 10px;
}

.action-btn {
  flex: 1;
  height: 52px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  transition: opacity 0.2s, transform 0.2s;

  &:hover {
    opacity: 0.9;
    transform: scale(0.98);
  }
  &:active {
    opacity: 0.9;
    transform: scale(0.98);
  }
}

.btn-white {
  background-color: #F7F9FC;
  color: #000;
}

.progress-line-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
}

</style>


