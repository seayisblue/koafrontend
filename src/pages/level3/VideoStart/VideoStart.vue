<script lang="ts" setup>
import { useI18n } from "vue-i18n"
import { useAeType } from "../shared/useAutoExam";
import { getAutoExams } from "../shared/getAutoExams";

const { aeType, rr } = useAeType()
const { t } = useI18n()
const autoExams = getAutoExams()

const onTapStart = () => {
  const atom = autoExams.find(v => v.type === aeType.value)
  if(!atom) return
  const vid = atom.videos?.[0]?.id
  if(!vid) return
  rr.router.push({ 
    name: "ae-video-box",
    params: { aeType: aeType.value },
    query: { vid }
  })
}

</script>
<template>
  <PageWrapper>
    <div v-if="aeType" class="hp-container">

      <div class="hp-virtual"></div>

      <div class="liu-no-select hp-title">
        <span>{{ t(`auto-exam.title-${aeType}`) }}</span>
      </div>

      <CustomButton @click="onTapStart">
        <span>{{ t('auto-exam.start') }}</span>
      </CustomButton>

      <div class="hp-virtual"></div>

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

.hp-virtual {
  width: 100%;
  height: 60px;
}

.hp-title {
  font-size: 50px;
  color: var(--main-normal);
  font-weight: 700;
  margin-block-end: 60px;
}

</style>