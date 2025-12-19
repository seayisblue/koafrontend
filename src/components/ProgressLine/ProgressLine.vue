<template>
  <div class="progress-wrapper">
    <div
      class="progress-row"
      v-for="(row, rowIndex) in steps"
      :key="rowIndex"
    >
      <div class="row-title">{{ row.title }}</div>

      <div class="row-content">
        <div
          class="node-block"
          v-for="(node, nodeIndex) in row.nodes"
          :key="nodeIndex"
        >
          <div
            v-if="node.label"
            class="node-label"
            :class="[
              nodeIndex % 2 === 0 ? 'top' : 'bottom', 
              { done: node.done }
            ]"
            :style="{ left: nodeIndex === 0 ? '50%' : '7px' }"
          >
            {{ node.label }}
          </div>

          <div class="node-container">
            <div
              v-if="nodeIndex === 0"
              class="line left"
              :class="{ done: node.startLineDone }"
            ></div>

            <div class="dot" :class="{ done: node.done }"></div>

            <div
              class="line right"
              :class="{ done: node.lineDone }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgressLine",
  props: {
    steps: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.progress-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  margin-left: auto;
  margin-right: 145px;
}

.progress-row {
  display: flex;
  align-items: center;
  gap: 30px;
}

.row-title {
  width: 120px;
  color: #000000;
  font-size: 18px;
  font-weight: 600;
  flex-shrink: 0;
}

.row-content {
  display: flex;
  align-items: center;
  gap: 15px; 
}

.node-block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
}

.node-label {
  font-size: 14px;
  font-weight: 600;
  color: #15455ECC;
  white-space: nowrap;
  text-align: center;
  position: absolute;
  transform: translateX(-50%); 
}

.node-label.done {
  color: #FFFFFF; 
}

.node-label.top {
  bottom: 28px;
}

.node-label.bottom {
  top: 28px;
}

.node-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px
}

.line {
  height: 4px;
  background: #15455ECC;
  border-radius: 2px;
  transition: background-color 0.3s;
  flex-shrink: 0;
}

.line.left,
.line.right {
  width: 60px; 
}

.line.done {
  background: #FFFFFF;
}

.dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #15455ECC;
  box-sizing: border-box;
  z-index: 1;
  flex-shrink: 0; 
}

.dot.done {
  background: #FFFFFF;
}
</style>