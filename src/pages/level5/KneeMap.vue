<script setup lang="ts">
import { ref } from "vue";
import type { CSSProperties } from "vue";
import { useRouteAndLiuRouter } from "~/routes/liu-router";
import cui from "~/components/custom-ui/index"

const rr = useRouteAndLiuRouter();

const painParts = [
{ id: "1", label: "膝关节外侧" },
{ id: "2", label: "膝关节内侧" },
{ id: "3", label: "髌上滑囊" },
{ id: "4", label: "髌腱/髌下脂肪垫" },
{ id: "5", label: "髌骨" },
{ id: "6", label: "胫骨结节" },
];

const selectedPartIds = ref<string[]>([]);
const hoveredPartId = ref<string | null>(null);

const imageBasePath = "/knee-parts";
const imageExtension = "png";
const defaultPartStyle: CSSProperties = {
  top: "0%",
  left: "0%",
  width: "100%",
  height: "100%",
};

const partLayouts: Record<"L" | "R", Record<string, CSSProperties>> = {
   L: {
    "1": { top: "36%", left: "3%", width: "29%", height: "29%" },
    "2": { top: "39%", left: "61%", width: "28%", height: "28%" },
    "3": { top: "1%", left: "15%", width: "68%", height: "60%" },
    "4": { top: "44%", left: "19%", width: "50%", height: "48%" },
    "5": { top: "35%", left: "30%", width: "33%", height: "33%" },
    "6": { top: "53%", left: "20%", width: "45%", height: "50%" },
  },
  R: {
    "1": { top: "35%", left: "63%", width: "30%", height: "30%" },
    "2": { top: "38%", left: "4%", width: "28%", height: "28%" },
    "3": { top: "1%", left: "10%", width: "68%", height: "60%" },
    "4": { top: "43%", left: "25%", width: "50%", height: "50%" },
    "5": { top: "35%", left: "29%", width: "35%", height: "33%" },
    "6": { top: "53%", left: "28%", width: "45%", height: "50%" },
  },
};

const getPartStyle = (partId: string, side: "L" | "R") => {
  return {
    ...defaultPartStyle,
    ...(partLayouts[side]?.[partId] ?? {}),
  };
};
/*
//切换左右腿 
const currentSide = ref<"L" | "R">("R");
const switchKneeSide = (side: "L" | "R") => {
  currentSide.value = side;
};
*/
const buildImageSrc = (partId: string, side: "L" | "R", isSelected: boolean) => {
  const shouldHighlight = side === "R" && (isSelected || hoveredPartId.value === partId);
  const color = shouldHighlight ? "G" : "W";
  
  return `${imageBasePath}/${partId}-${color}-${side}.${imageExtension}`;
};


const onSelectPart = async (partId: string) => {
  const index = selectedPartIds.value.indexOf(partId);
  if (index > -1) {
    selectedPartIds.value.splice(index, 1);
    return
  }

  const res1 = await cui.showActionSheet({
    title: "哪一只腿？",
    itemList: [
      { text: "⬅️ 左腿" },
      { text: "➡️ 右腿" },
      { text: "双腿都有" }
    ]
  })
  const tapIndex = res1.tapIndex
  if(tapIndex === 0) {
    console.log("选择了左腿..")
  } else if(tapIndex === 1) {
    console.log("选择了右腿..")
  } else if(tapIndex === 2) {
    console.log("选择了双腿都有..")
  }
  else {
    console.log("取消了选择")
    return
  }


  selectedPartIds.value.push(partId);
};


const onPartHover = (partId: string | null) => {
  hoveredPartId.value = partId;
};

const onTapBack = () => {
  rr.router.naviBack();
};

const onTapNext = () => {
  rr.router.goHome();
};
</script>

<template>
  <div class="page-wrapper">
    <div class="page-container">
      <div class="header-area">
        <div class="title">膝盖部位图</div>
        <div class="subtitle">请选择您疼痛的部位</div>
      </div>

      <div class="button-grid">
        <button
          v-for="part in painParts"
          :key="part.id"
          class="part-button"
          :class="{ active: selectedPartIds.includes(part.id) }"
          @click="onSelectPart(part.id)"
          @mouseenter="onPartHover(part.id)"
          @mouseleave="onPartHover(null)"
        >
          {{ part.label }}
        </button>
      </div>

      <div class="knee-card">
        <div class="knee-overlay">
          <img class="knee-image" src="/knee-parts/knee_man.png" alt="膝盖示意图" />
          <div class="knee-map">
            <div class="knee-column">
              <div class="knee-stack">
                <img
                  v-for="part in painParts"
                  :key="`left-${part.id}`"
                  class="knee-part"
                  :src="buildImageSrc(part.id, 'L', false)"
                  :alt="`${part.label} 左膝`"
                  :style="getPartStyle(part.id, 'L')"
                />
              </div>
            </div>
            <div class="knee-column">
              <div class="knee-stack">
                <img
                  v-for="part in painParts"
                  :key="`right-${part.id}`"
                  class="knee-part"
                  :src="buildImageSrc(part.id, 'R', selectedPartIds.includes(part.id))"
                  :alt="`${part.label} 右膝`"
                  :style="getPartStyle(part.id, 'R')"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-actions">
        <button class="action-button secondary" @click="onTapBack">上一步</button>
        <button class="action-button primary" @click="onTapNext">下一步</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-wrapper {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #4D7A8F 0%, #CDDAE0 100%);
  display: flex;
  justify-content: center;
}

.page-container {
  min-height: 100vh;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 28px 20px 36px;
  box-sizing: border-box;
  color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.header-area {
  text-align: center;
  margin-bottom: 20px;
}

.title {
  font-size: 30px;
  font-weight: 700;
  letter-spacing: 1px;
}

.subtitle {
  margin-top: 8px;
  font-size: 16px;
  opacity: 0.9;
}

.button-grid {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 14px;
  margin-bottom: 20px;
}

.part-button {
  border: none;
  border-radius: 8px;
  padding: 14px 10px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.4);
  color: #f5f7f9;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;

  &.active {
    background: #2A6885;
    color: #ffffff;
  }

  &:hover {
    background-color: #2A6885;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    transform: scale(1.02);
  }
}

.knee-card {
  width: 100%;
  aspect-ratio: 11 / 11; 
  position: relative;
  background: rgba(241, 243, 246, 0.55);
  border-radius: 8px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
  margin: 5px 0 24px;
  overflow: hidden; 
}

.knee-map {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  padding: 12px;
  box-sizing: border-box;
}

.knee-overlay {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 14px;
  overflow: hidden;
}

.knee-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;       
  object-position: center;  
  pointer-events: none;
  z-index: 1;
}

.knee-column {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;
}

.knee-stack {
  position: relative;
  width: 78%;
  height: 78%;
  margin: auto;
}

.knee-part {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  user-select: none;
  pointer-events: none;
}

.footer-actions {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 18px;
}

.action-button {
  flex: 1;
  border: none;
  border-radius: 8px;
  padding: 14px 0;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
  margin-top: 30px;

  &.secondary {
    background: rgba(255, 255, 255, 0.85);
    color: #1f2429;
  }

  &.primary {
    background: rgba(28, 86, 113, 0.9);
    color: #ffffff;
  }

  &:hover {
    opacity: 0.9;
    transform: scale(0.98);
  }

  &:active {
    opacity: 0.9;
    transform: scale(0.98);
  }
}
</style>