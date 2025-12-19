<script setup lang="ts">
import { defineAsyncComponent } from "vue"
const PreviewImage = defineAsyncComponent(() => import("./preview-image/preview-image.vue"))
const CustomModal = defineAsyncComponent(() => import("./modal/custom-modal.vue"))
const SnackBar = defineAsyncComponent(() => import("./snack-bar/snack-bar.vue"))

</script>
<template>

  <PreviewImage></PreviewImage>
  <CustomModal></CustomModal>
  <SnackBar></SnackBar>

</template>
<style scoped lang="scss">
</style>