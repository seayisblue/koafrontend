<script setup lang="ts">
import type { CtProps } from './tools/types';
import { useCustomTextarea } from './tools/useCustomTextarea';

const valRef = defineModel<string | undefined>()
defineProps<CtProps>()
const { whenChange, whenBlur } = useCustomTextarea(valRef)

</script>
<template>

  <textarea class="custom-textarea"
    :placeholder="placeholder"
    :maxlength="maxlength ?? 500"
    :value="valRef"
    @input="whenChange"
    @blur="whenBlur"
    draggable="false"
  ></textarea>

</template>
<style scoped lang="scss">

.custom-textarea {
  width: 100%;
  height: 150px;
  padding: 16px;
  border-radius: 5px;
  background-color: var(--card-bg);
  color: var(--main-normal);
  box-sizing: border-box;
  font-size: var(--input-font-size);
  caret-color: var(--primary-color);
  transition: .12s;
  border: none;
  resize: none;
  caret-color: var(--primary-color);
  line-height: 1.5;

  &::placeholder {
    color: var(--main-note);
  }

  &::selection {
    background-color: var(--inverse-primary)
  }
}

.custom-textarea:focus {
  outline: 3px solid var(--primary-color);
  outline-offset: 3px;
}


</style>