<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { ButtonListProps, ButtonListEmits } from "./tools/types"

defineProps<ButtonListProps>()
defineEmits<ButtonListEmits>()

const { t } = useI18n()

</script>
<template>

  <div class="bt-container">
    <CustomButton @click.stop="$emit('next')" class="bt-next">
      <span v-if="mainTextKey">{{ t(mainTextKey) }}</span>
      <span v-else>{{ t("shared.next_step") }}</span>
    </CustomButton>

    <CustomButton type="transparent" @click.stop="$emit('back')">
      <span v-if="subTextKey">{{ t(subTextKey) }}</span>
      <span v-else>{{ t("shared.back") }}</span>
    </CustomButton>

  </div>


</template>
<style scoped lang="scss">

.bt-container {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bt-next {
  margin-block-end: 8px;
}


</style>