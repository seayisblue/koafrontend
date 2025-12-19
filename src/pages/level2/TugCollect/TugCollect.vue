<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useTugCollect } from "./tools/useTugCollect"
import { feedback } from "./tools/scripts"

const { tugData, onTapBack, onTapNext } = useTugCollect()
const { t } = useI18n()

</script>
<template>

  <PageWrapper>

    <div class="bi-sized-box"></div>
    
    <video autoplay controls class="vb-video" :src="tugData.videoSrc" playsinline webkit-playsinline></video>

    <div class="tc-instruction-box">
      
      <div class="tc-section">
        <div class="tc-section-title">{{ t('tug-collect.prep_title') }}</div>
        
        <div class="tc-list-item">
          <span v-html="t('tug-collect.prep_1')"></span>
        </div>
        <div class="tc-list-item">
          <span v-html="t('tug-collect.prep_2')"></span>
        </div>
        <div class="tc-list-item">
          <span v-html="t('tug-collect.prep_3')"></span>
        </div>
        <div class="tc-list-item">
          <span v-html="t('tug-collect.prep_4')"></span>
        </div>
      </div>

      <div class="tc-section">
        <div class="tc-section-title">{{ t('tug-collect.action_title') }}</div>
        <div class="tc-text-content">
          <span v-html="t('tug-collect.action_desc')"></span>
        </div>
      </div>

      <div class="tc-note-item">
        <span>{{ t('tug-collect.step_note') }}</span>
      </div>

    </div>

    <div class="liu-no-select bi-title">
      <span>{{ t('tug-collect.hd_1') }}</span>
    </div>
    <div class="liu-no-select bi-desc">
      <span>{{ t('tug-collect.bd_1') }}</span>
    </div>
    <div class="bi-content">
      <CustomInput v-model="tugData.time" type="number"></CustomInput>
    </div>
    <div class="liu-no-select bi-desc">
      <span>{{feedback(tugData.time)}}</span>
    </div>

    <div class="bi-sized-box_two"></div>

    <ButtonList
      @next="onTapNext"
      @back="onTapBack"
    ></ButtonList>

    <div class="bi-sized-box_three"></div>

  </PageWrapper>


</template>
<style scoped lang="scss">
@use "../../shared/everyone-shared.scss";

.vb-video {
  width: 100%;
  height: 86vh;
  margin-block-end: 16px;
  object-fit: contain;
  border-radius: 20px;
  background-color: #000;
}

/* 容器：清爽的卡片风格 */
.tc-instruction-box {
  width: 100%;
  background-color: #F9FAFB; /* 很淡的灰色背景 */
  padding: 20px;
  border-radius: 16px;
  margin-block-end: 24px;
  box-sizing: border-box;
  border: 1px solid #eee; /* 淡淡的边框 */
}

/* 板块容器 */
.tc-section {
  margin-bottom: 24px;
}

/* 小标题 (1.测试前准备) */
.tc-section-title {
  font-size: var(--sub-title-font-size); /* 用稍微大一点的字号 */
  font-weight: 700;
  color: var(--main-text);
  margin-bottom: 8px;
}

/* 列表项 (设备、环境等) */
.tc-list-item {
  font-size: var(--desc-font-size);
  color: var(--main-normal);
  line-height: 1.6;
  margin-bottom: 8px; /* 每条之间的间距 */
  padding-left: 10px; /* 稍微缩进一点 */
  white-space: pre-line;
}

/* 测试动作描述 */
.tc-text-content {
  font-size: var(--desc-font-size);
  color: var(--main-normal);
  line-height: 1.5;
  padding-left: 10px;
}

.tc-note-item {
  width: 100%;
  box-sizing: border-box; 
  background-color: rgba(230, 162, 60, 0.12);
  border-left: 4px solid #E6A23C;       
  border-radius: 12px; 
  padding: 16px;       
  font-size: var(--mini-font); 
  margin-bottom: 16px;       
  line-height: 1.5;
}


</style>