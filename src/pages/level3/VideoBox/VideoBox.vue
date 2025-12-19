<script lang="ts" setup>
import { useVideoBox } from "./tools/useVideoBox";
const { videoSrc, onTapNext, onTapBack } = useVideoBox()

</script>
<template>
  <PageWrapper v-if="videoSrc">

    <div class="vb-virtual"></div>

    <video autoplay controls class="vb-video" 
      :src="videoSrc" 
      playsinline
      webkit-playsinline
    ></video>

    <ButtonList
      @next="onTapNext"
      @back="onTapBack"
    ></ButtonList>

    <div class="vb-virtual"></div>
    
  </PageWrapper>

</template>
<style scoped lang="scss">


.vb-virtual {
  width: 100%;
  height: 16px;
}

.vb-video {
  width: 100%;
  height: 86vh;
  margin-block-end: 16px;
  object-fit: contain;
  border-radius: 20px;
  background-color: #000;
}


</style>