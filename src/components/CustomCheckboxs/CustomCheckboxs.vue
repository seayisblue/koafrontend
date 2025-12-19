<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { CheckboxItem } from "./tools/types";

const { t } = useI18n()
const list = defineModel<CheckboxItem[]>({ required: true })

const emit = defineEmits<{
  (e: 'change', index: number): void
}>()
const onTapItem = (data: CheckboxItem, index: number) => {
  data.selected = !Boolean(data.selected)
  emit('change', index)
}

</script>
<template>

  <div class="cr-container">
    <template v-for="(item, index) in list">
      <div class="cr-item" 
        @click.stop="onTapItem(item, index)"
      >
        
        <div class="cr-item_inner">

          <!-- circle -->
          <div class="cri-radio">
            <div class="cri-circle" 
              :class="{ 'cri-circle_show': item.selected }"
            ></div>
          </div>

          <!-- text -->
          <div class="liu-no-select cri-text">
            <span v-if="item.text">{{ item.text }}</span>
            <span v-else-if="item.textKey">{{ t(item.textKey) }}</span>
          </div>

        </div>
        
      </div>

    </template>

  </div>


</template>
<style scoped lang="scss">

.cr-container {
  display: flex;
  width: 100%;
  gap: 10px;
  flex-direction: column;
}

.cr-item {
  flex: 1;
  cursor: pointer;
}

.cr-item_inner {
  display: flex;
  justify-content: center;
  transition: .12s;
  justify-content: flex-start;
}

.cri-radio {
  width: 17px;
  height: 17px;
  border-radius: 4px;
  border: 3px solid var(--main-text);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-inline-end: 10px;
  position: relative;
  background-color: var(--card-bg);
  flex: none;
  margin-block-start: 2px;
}

.cri-circle {
  width: 75%;
  height: 75%;
  border-radius: 3px;
  overflow: hidden;
  background: var(--checkbox-bg);
  opacity: 0;
  transition: .09s;

  /** 抗锯齿 */
  transform: translateZ(0);
  will-change: transform;
}

.cri-circle_show {
  opacity: 1;
}

.cri-text {
  font-size: var(--desc-font-size);
  color: var(--main-normal);
}

@media(hover: hover) {
  .cr-item_inner:hover {
    opacity: .75;
  }
}

.cr-item_inner:active {
  transform: scale(0.96);
}


</style>