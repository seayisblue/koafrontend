<script setup lang="ts">
import { useApp } from './utils/useApp';
import { initLiuRouter } from "./routes/liu-router"
import { defineAsyncComponent } from "vue"
import GlobalLoading from "./components/loaders/global-loading/global-loading.vue"
import { ElConfigProvider } from 'element-plus'

const CustomUi = defineAsyncComponent(() => {
  return import("./components/custom-ui/custom-ui.vue")
})

initLiuRouter()
useApp()

</script>
<template>
  <el-config-provider>
    <div class="app-container">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>

    <custom-ui />
    <global-loading />
  </el-config-provider>

</template>

<style scoped>

.app-container {
  height: max-content;
  min-height: 100%;
  min-width: 250px;
  background-color: var(--bg-color);
}


</style>
