<!-- Step 1: 基本信息 -->
<script setup lang="ts">
import { useI18n } from "vue-i18n"
import { useBasicInfo } from "./tools/useBasicInfo";
import { BMI } from "./tools/scripts";
import ButtonList from "~/components/ButtonList/ButtonList.vue";

const { biData, onTapNext, onTapBack } = useBasicInfo()
const { t } = useI18n()

const disabledAfterToday = (date: Date) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0) 
  return date > today 
}

</script>
<template>

  <PageWrapper>

    <div class="bi-sized-box"></div>

    <div class="liu-no-select bi-head">
      <span>{{ t("basic-info.title_1") }}</span>
    </div>

    <!-- 姓名 -->
    <div class="liu-no-select bi-title">
      <span>{{ t('basic-info.name') }}</span>
    </div>
    <div class="bi-content">
      <CustomInput v-model="biData.name"></CustomInput>
    </div>

    <!-- 性别 -->
    <div class="liu-no-select bi-title">
      <span>{{ t('basic-info.gender') }}</span>
    </div>
    <div class="bi-content">
      <CustomRadios
        :text-keys="['shared.male', 'shared.female']"
        v-model:index="biData.gender"
      ></CustomRadios>
    </div>

    <!-- 年龄 -->
    <div class="liu-no-select bi-title">
      <span>{{ t('basic-info.age') }}</span>
    </div>
    <div class="bi-content">
      <CustomInput v-model="biData.age" type="string"
        min="0" max="120"
      ></CustomInput>
    </div>

    <!-- 身高 -->
    <div class="liu-no-select bi-title">
      <span>{{ t('basic-info.height') }}</span>
    </div>
    <div class="bi-content">
      <CustomInput v-model="biData.height" type="string"
        min="90" max="220"
      ></CustomInput>
    </div>

    <!-- 体重 -->
    <div class="liu-no-select bi-title">
      <span>{{ t('basic-info.weight') }}</span>
    </div>
    <div class="bi-content">
      <CustomInput v-model="biData.weight" type="string"
        min="10" max="150"
      ></CustomInput>
    </div>

    <!-- BMI -->
    <div class="liu-no-select bi-title">
      <span>{{ t('basic-info.BMI') }}</span>
    </div>
    <div class="liu-no-select bi-desc">
      <span>{{(biData.BMI = BMI(biData.weight, biData.height))}}</span>
    </div>

    <!-- 职业 -->
    <div class="liu-no-select bi-title">
      <span>{{ t('basic-info.occupation') }}</span>
    </div>
    <div class="bi-content">
      <CustomInput v-model="biData.occupation" type="text"
        :maxlength="32"
      ></CustomInput>
    </div>

    <!-- 联系电话 -->
    <div class="liu-no-select bi-title">
      <span>{{ t('basic-info.tel') }}</span>
    </div>
    <div class="bi-content">
      <CustomInput v-model="biData.phone" type="tel"
        :maxlength="11"
      ></CustomInput>
    </div>

    <!-- 发病时间 -->
    <div class="liu-no-select bi-title">
      <span>{{ t('basic-info.onset_date') }}</span>
    </div>
    <div class="bi-content">
      <el-date-picker
        v-model="biData.onset_date"
        type="date"
        placeholder="请选择日期"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
        style="width: 100%;"
        class="custom-date-picker"
        :editable="false"
        :disabled-date="disabledAfterToday"
      />
    </div>

    <div class="bi-sized-box_two"></div>

    <!-- 生活习惯 -->
    <div class="liu-no-select bi-head">
      <span>{{ t("basic-info.title_2") }}</span>
    </div>
    <!-- 是否经常运动 -->
    <div class="liu-no-select bi-title">
      <span>{{ t('basic-info.workout') }}</span>
    </div>
    <div class="bi-content">
      <CustomRadios
        :text-keys="['shared.yes', 'shared.no']"
        v-model:index="biData.workout"
      ></CustomRadios>
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

:deep(.custom-date-picker) {
  .el-input__wrapper {
    background-color: var(--card-bg); 
    box-shadow: none;                
    border-radius: 5px;              
    padding: 28px;                  
    box-sizing: border-box;
    
  
    &.is-focus {
      box-shadow: 0 0 0 1px var(--primary-color) inset; 
    }
  }

  .el-input__inner {
    color: var(--main-normal);
    font-size: var(--input-font-size);
    height: auto;
    line-height: normal;
    
    &::placeholder {
      color: var(--main-note);
    }
  }

  .el-input__prefix {
    display: none; 
  }

}
</style>