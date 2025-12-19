<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useAdlCollect } from "./tools/useAdlCollect"

const { acData, onTapNext, onTapBack } = useAdlCollect()
const { t } = useI18n()

</script>
<template>

  <PageWrapper>

    <div class="bi-sized-box"></div>

    <!-- 第一部分：基本生活能力 -->
    <div class="liu-no-select bi-head">
      <span>{{ t("adl-collect.title_a") }}</span>
    </div>

    <template v-for="item in acData.list1">
      <div class="liu-no-select bi-title">
        <span>{{ t(item.title_key) }}</span>
      </div>
      <div v-if="item.desc_key" class="liu-no-select bi-desc">
        <span>{{ t(item.desc_key) }}</span>
      </div>
      <div v-if="item.radio_item_keys" class="bi-content">
        <CustomRadios
          :textKeys="item.radio_item_keys"
          v-model:index="item.selected_idx"
        ></CustomRadios>
      </div>
    </template>

    <div class="bi-sized-box_two"></div>

    <!-- 第二部分：如厕能力 -->
    <div class="liu-no-select bi-head">
      <span>{{ t("adl-collect.title_b") }}</span>
    </div>
    <template v-for="item in acData.list2">
      <div class="liu-no-select bi-title">
        <span>{{ t(item.title_key) }}</span>
      </div>
      <div v-if="item.desc_key" class="liu-no-select bi-desc">
        <span>{{ t(item.desc_key) }}</span>
      </div>
      <div v-if="item.radio_item_keys" class="bi-content">
        <CustomRadios
          :textKeys="item.radio_item_keys"
          v-model:index="item.selected_idx"
        ></CustomRadios>
      </div>
    </template>

    <div class="bi-sized-box_two"></div>

    <!-- 第三部分：移动能力 -->
     <div class="liu-no-select bi-head">
      <span>{{ t("adl-collect.title_c") }}</span>
    </div>
    <template v-for="item in acData.list3">
      <div class="liu-no-select bi-title">
        <span>{{ t(item.title_key) }}</span>
      </div>
      <div v-if="item.desc_key" class="liu-no-select bi-desc">
        <span>{{ t(item.desc_key) }}</span>
      </div>
      <div v-if="item.radio_item_keys" class="bi-content">
        <CustomRadios
          :textKeys="item.radio_item_keys"
          v-model:index="item.selected_idx"
        ></CustomRadios>
      </div>
    </template>

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


</style>