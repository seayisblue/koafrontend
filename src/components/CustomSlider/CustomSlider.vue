<script setup lang="ts">
import { NSlider } from "naive-ui"
import type { SliderProps } from "naive-ui"
import { ref } from "vue"
import { onLiuActivated, onLiuDeactivated } from "~/hooks/useCommon"

type SliderThemeOverrides = NonNullable<SliderProps['themeOverrides']>

const themeOverrides: SliderThemeOverrides = {
  fillColor: "var(--primary-color)",
  fillColorHover: "var(--inverse-primary)",
}
const rate = defineModel<number>()

const isShowing = ref(false)
onLiuActivated(() => {
  isShowing.value = true
})
onLiuDeactivated(() => {
  isShowing.value = false
})

</script>
<template>

  <div class="cs-container">
    <NSlider v-model:value="rate" :theme-overrides="themeOverrides" 
      :step="1" :min="0" :max="10" :show-tooltip="isShowing" />
  </div>


</template>
<style scoped lang="scss">

.cs-container {
  width: 100%;
  padding-top: 40px;
  position: relative;
}

</style>
<style>

.n-slider-handle-indicator {
  user-select: none;
  -webkit-user-select: none;
}

</style>