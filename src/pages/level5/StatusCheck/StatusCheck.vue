<script setup lang="ts">
import { useStatusCheck } from "./tools/useStatusCheck";

const {
  doctorImg,
  statusChoice,
  showHelperText,
  onSelectChoice,
  onTapNext
} = useStatusCheck();

</script>

<template>
  <div class="page-container">

    <div class="header-title liu-no-select">状态查询</div>

    <div class="illustration-box">
      <img :src="doctorImg" class="doctor-img" alt="Doctor" />
    </div>

    <div class="question-card liu-no-select">
      今日是否感到不适?
    </div>

    <div class="helper-text-container">
        <div v-if="showHelperText" class="helper-text liu-no-select animate-fade-in">
        已为您在打卡界面标注今日情况
        </div>
    </div>


    <div class="choice-btns-group liu-no-select">
      <div
        class="choice-btn"
        :class="{ 'active': statusChoice === 1 }"
        @click="onSelectChoice(1)"
      >
        是
      </div>

      <div
        class="choice-btn"
        :class="{ 'active': statusChoice === 0 }"
        @click="onSelectChoice(0)"
      >
        否
      </div>
    </div>

    <div class="footer-btn-area">
      <div class="next-btn liu-no-select" @click="onTapNext">
        下一步
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
.page-container {
  min-height: 100vh;
  width: 100%;
  max-width: 480px; 
  margin: 0 auto;
  background: linear-gradient(180deg, #5F8FA5 0%, #7A9FB3 50%, #9DBCCF 85%, #C4D6E0 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  color: #fff;
  position: relative;
}

.header-title {
  margin-top: 20px;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 1px;
}

.illustration-box {
  margin-top: 30px;
  width: 180px; 
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  .doctor-img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
}

.question-card {
  width: 90%;
  background: rgba(255, 255, 255, 0.25); 
  backdrop-filter: blur(4px);           
  border-radius: 16px;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-top: 20px;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.helper-text-container {
    height: 30px; 
    margin-top: 20px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.helper-text {
  font-size: 14px;
  opacity: 0.9;
  color: #E0E8ED;
}

.animate-fade-in {
    animation: fadeIn 0.3s ease-in-out;
}
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 0.9; transform: translateY(0); }
}


.choice-btns-group {
  width: 90%;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: auto;
}

.choice-btn {
  flex: 1; 
  height: 56px;
  background-color: #FFFFFF;
  color: #5A6D7A; 
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
  transition: all 0.2s ease; 

  &:active {
    transform: scale(0.98);
  }

  &.active {
    background-color: #DBC065;
    color: #FFFFFF;
  }
}

.footer-btn-area {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 30px;
  margin-top: 30px;
}

.next-btn {
  width: 80%;
  height: 50px;
  background-color: #2D5D72; 
  color: white;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(45, 93, 114, 0.3);
  transition: transform 0.1s;

  &:active {
    transform: scale(0.98);
  }
}
</style>