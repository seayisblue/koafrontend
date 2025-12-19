<script setup lang="ts">
import type { CustomInputProps } from './tools/types';
import { useCustomInput } from './tools/useCustomInput';

const valRef = defineModel<string | undefined>()
const props = defineProps<CustomInputProps>()
const { whenChange, whenBlur } = useCustomInput(valRef, props)

</script>
<template>

  <input class="custom-input"
    :placeholder="placeholder"
    :maxlength="maxlength ?? 60"
    :type="type"
    :min="min"
    :max="max"
    :value="valRef"
    @input="whenChange"
    @blur="whenBlur"
  ></input>

</template>
<style scoped lang="scss">

.custom-input {
  width: 100%;
  padding: 16px;
  border-radius: 5px;
  background-color: var(--card-bg);
  color: var(--main-normal);
  box-sizing: border-box;
  font-size: var(--input-font-size);
  caret-color: var(--primary-color);
  transition: .12s;

  &::placeholder {
    color: var(--main-note);
  }

  &::selection {
    background-color: var(--inverse-primary)
  }
}

.custom-input:focus {
  outline: 3px solid var(--primary-color);
  outline-offset: 3px;
}

input[type="date"].custom-input {
  appearance: none; /* 去掉默认的日期图标样式（部分浏览器支持） */
  -webkit-appearance: none;
  -moz-appearance: none;
  min-height: 53px;
}


</style>