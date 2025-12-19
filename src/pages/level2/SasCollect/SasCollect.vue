<script setup lang="ts">
import { useSasCollect } from "./tools/useSasCollect"

const { sasData, onTapNext, onTapBack } = useSasCollect()

const radioItemKeys = [
  "sas-collect.few",
  "sas-collect.little",
  "sas-collect.a_lot",
  "sas-collect.always"
]

</script>
<template>

  <PageWrapper>

    <div class="bi-sized-box"></div>
    <div class="bi-sized-box_two"></div>

    <template v-for="(item, index) in sasData.list" :key="item.question">
      <div class="liu-no-select bi-title">
        <span>{{ index + 1 }}. </span>
        <span>{{ item.question }}</span>
      </div>
      <div class="bi-content">
        <CustomRadios
          :text-keys="radioItemKeys"
          v-model:index="item.selected_idx"
        ></CustomRadios>
      </div>
    </template>

    <div class="bi-sized-box_two"></div>

    <ButtonList
      @next="onTapNext"
      @back="onTapBack"
      main-text-key="sas-collect.complete"
    ></ButtonList>

    <div class="bi-sized-box_three"></div>

  </PageWrapper>


</template>
<style scoped lang="scss">
@use "../../shared/everyone-shared.scss";


</style>