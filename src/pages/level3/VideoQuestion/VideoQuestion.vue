<script lang="ts" setup>
import { useVideoQuestion } from "./tools/useVideoQuestion";
import CustomCheckboxs from "~/components/CustomCheckboxs/CustomCheckboxs.vue";
import { useI18n } from "vue-i18n";

const { qaItems, onTapNext, onTapBack } = useVideoQuestion()
const { t } = useI18n()
</script>
<template>
  <PageWrapper>

    <div class="bi-sized-box"></div>

    <div class="liu-no-select bi-head">
      <span>{{ t("auto-exam.plz_speak") }}</span>
    </div>

    <template v-for="(item, _) in qaItems">
      <div class="liu-no-select bi-title">
        <span>{{ item.question }}</span>
      </div>
      <div v-if="item.desc" class="liu-no-select bi-desc">
        <span>{{ item.desc }}</span>
      </div>

      <!-- 多选 -->
      <div v-if="item.checkboxItems" class="bi-content">
        <CustomCheckboxs
          v-model="item.checkboxItems"
        ></CustomCheckboxs>
      </div>
      <!-- 单选 -->
       <div v-if="item.radioTexts" class="bi-content">
        <CustomRadios
          :texts="item.radioTexts"
          v-model:index="item.radioIdx"
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