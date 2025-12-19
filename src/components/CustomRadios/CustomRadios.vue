<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { CrProps } from "./tools/types"
import { useCustomRadios } from "./tools/useCustomRadios";

const currentIndex = defineModel<number | undefined>("index", { required: true })
const props = defineProps<CrProps>()

const { list } = useCustomRadios(props)
const { t } = useI18n()
const onTapItem = (index: number) => {
  console.log("I am clicking: ", index)
  currentIndex.value = index
}

</script>
<template>

  <div class="cr-container" 
    :class="{ 'cr-container_more': list.length > 2 }"
  >
    <template v-for="(item, index) in list">
      <div class="cr-item"
        @click.stop="onTapItem(index)"
      >
        <div class="cr-item-inner"
          :class="{ 'cr-item-inner_more': list.length > 2 }"
        >

          <!-- circle -->
          <div class="cri-radio">
            <div class="cri-circle" 
              :class="{ 'cri-circle_show': index === currentIndex }"
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
}

.cr-container_more {
  flex-direction: column;
}

.cr-item {
  flex: 1;
  cursor: pointer;
}

.cr-item-inner {
  display: flex;
  justify-content: center;
  transition: .14s;
}

.cr-item-inner_more {
  justify-content: flex-start;
}

.cri-radio {
  width: 17px;
  height: 17px;
  border-radius: 50%;
  border: 3px solid var(--main-text);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-inline-end: 10px;
  position: relative;
  background-color: var(--card-bg);
  overflow: hidden;
  flex: none;
  margin-block-start: 2px;
}

.cri-circle {
  width: 75%;
  height: 75%;
  border-radius: 50%;
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
  .cr-item-inner:hover {
    opacity: .75;
  }
}

.cr-item-inner:active {
  transform: scale(0.95);
}


</style>