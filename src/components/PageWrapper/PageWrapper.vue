<script setup lang="ts">

</script>
<template>

  <div class="page-wrapper">

    <div class="page-wrapper-box">
      <slot></slot>
    </div>

  </div>

</template>
<style scoped lang="scss">

.page-wrapper {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  container-type: inline-size;
  container-name: page-wrapper;

  --card-min: 270px;
  --card-max: 630px;
  --card-percent: 92%;
}

.page-wrapper-box {
  width: var(--card-percent);
  max-width: var(--card-max);
  min-width: var(--card-min);
  position: relative;
}


</style>