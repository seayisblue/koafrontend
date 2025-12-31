<script setup lang="ts">
import { reactive, onMounted, ref, computed } from 'vue';
import { useRouteAndLiuRouter } from '~/routes/liu-router';
import liuApi from '~/utils/liu-api';
import type { CalendarInstance } from 'element-plus';


const doctorImg = "/figma/doctor.png"; 
const rr = useRouteAndLiuRouter();
const CACHE_KEY = 'user_checkin_record';

// Calendar 实例引用，用于调用 prev-month / next-month
const calendarRef = ref<CalendarInstance>();

// 当前选中的日期（控制日历显示月份）
const currentDate = ref(new Date());

const state = reactive({
  history: [] as string[],
  consecutiveDays: 0,
  totalDays: 0,
});

// 初始化数据
const initData = () => {
  const cache = liuApi.getStorageSync(CACHE_KEY);
  if (cache) {
    state.history = cache.history || [];
    state.consecutiveDays = cache.consecutiveDays || 0;
    state.totalDays = cache.totalDays || 0;
  }
};

// 切换月份
const changeMonth = (type: 'prev-month' | 'next-month') => {
  if (!calendarRef.value) return;
  calendarRef.value.selectDate(type);
};

// 格式化日期标题 (例如: 2025年11月)
const currentMonthLabel = computed(() => {
  const d = currentDate.value;
  return `${d.getFullYear()}年${d.getMonth() + 1}月`;
});

// 判断日期状态
const getDateStatus = (date: Date) => {
  const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  
  // 1. 如果在历史记录里 -> 成功
  if (state.history.includes(dateStr)) {
    return 'success';
  }

  // 2. 模拟其他状态 (仅为了还原 UI，实际逻辑请根据需求修改)
  const today = new Date();
  // 只处理过去的时间
  if (date < today && date.getDate() !== today.getDate()) {
    // 假数据逻辑：   ！需要后端修改！
    const day = date.getDate();
    if (day % 7 === 0) return 'unwell'; // 逢7感到不适
    if (day % 5 === 0) return 'partial'; // 逢5部分完成
    return 'fail'; // 其他算未打卡
  }

  return 'future';
};

const onTapBack = () => {
  rr.router.naviBack();
};

onMounted(() => {
  initData();
});
</script>

<template>
<div class="page-wrapper">
  <div class="page-container">
    <div class="nav-bar">
      <div class="back-icon" @click="onTapBack">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>

    <div class="header-section">
      <div class="doctor-avatar">
        <img :src="doctorImg" alt="doctor" />
      </div>
      <div class="header-text">
        <div class="main-title">再接再励!</div>
        <div class="sub-title">距离本周期结束<br>还有 <span class="highlight">3</span> 天</div>
      </div>
    </div>

    <div class="stats-row">
      <div class="stat-item">
        <div class="stat-label">连续打卡</div>
        <div class="stat-value"><span class="num">{{ state.consecutiveDays }}</span> <span class="unit">天</span></div>
      </div>
      <div class="stat-item">
        <div class="stat-label">累计打卡</div>
        <div class="stat-value"><span class="num">{{ state.totalDays }}</span> <span class="unit">天</span></div>
      </div>
    </div>

    <div class="calendar-card">
      <div class="calendar-header">
        <span class="arrow" @click="changeMonth('prev-month')">&lt;</span>
        <span class="date-title">{{ currentMonthLabel }}</span>
        <span class="arrow" @click="changeMonth('next-month')">&gt;</span>
      </div>

      <el-calendar 
        ref="calendarRef" 
        v-model="currentDate"
        class="custom-el-calendar"
      >
        <template #header>
          <div style="display: none;"></div>
        </template>
        
        <template #date-cell="{ data }">
          <div class="custom-date-cell">
            <div 
              v-if="data.type === 'current-month'"
              class="day-circle"
              :class="`status-${getDateStatus(data.date)}`"
            >
              {{ data.date.getDate() }}
            </div>
          </div>
        </template>
      </el-calendar>
    </div>

    <div class="legend-area">
      <div class="legend-item">
        <div class="dot status-success">23</div>
        <span>已成功打卡</span>
      </div>
      <div class="legend-item">
        <div class="dot status-partial">22</div>
        <span>部分完成</span>
      </div>
      <div class="legend-item">
        <div class="dot status-fail">9</div>
        <span>未成功打卡</span>
      </div>
      <div class="legend-item">
        <div class="dot status-unwell">14</div>
        <span>感到不适</span>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.page-wrapper {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #2E637C 0%, #CDDAE0 100%);
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
  padding: 20px;
  box-sizing: border-box;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.nav-bar {
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
}
.back-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
}

.header-section {
  display: flex;
  align-items: center;
  width: 100%;
  
  .doctor-avatar {
    width: 200px;
    height: 170px;
    margin-right: 30px;
    margin-bottom: 30px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .header-text {
    text-align: left;
    .main-title {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 8px;
      letter-spacing: 1px;
    }
    .sub-title {
      font-size: 28px;
      font-weight: 600;
      line-height: 1.4;
      opacity: 0.95;
      .highlight {
        color: #FFD54F;
        font-size: 32px;
        margin: 0 39px;
        font-weight: 700;
      }
    }
  }
}

.stats-row {
  display: flex;
  justify-content: space-around;
  width: 90%;
  margin-bottom: 30px;
}
.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.stat-label { font-size: 16px; opacity: 0.9; margin-bottom: 4px; }
.stat-value {
  .num { font-size: 40px; font-weight: 700; }
  .unit { font-size: 14px; margin-left: 4px; }
}

.calendar-card {
  width: 90%;
  background: rgba(241, 243, 246, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: 12px 20px;
  box-sizing: border-box;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  color: #2c3e50;
  margin-bottom: 30px;
  min-height: auto;
}

.calendar-header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  color: #4A5568;

  .date-title { font-size: 20px; font-weight: 400;color:#1F2429CC }
  .arrow {
    cursor: pointer; font-weight: 450; padding: 0 10px;color: #1F2429CC;
    &:active { opacity: 1; }
  }
  
}

:deep(.custom-el-calendar) {
  background: transparent !important;
  border: none !important;
  --el-calendar-border: none;
  --el-calendar-header-border-bottom: none;
  
  .el-calendar__body {
    padding: 0;
  }

  .el-calendar-table {
    border: none;
    
    thead th {
      color: #1F2429CC;
      font-size: 12px;
      font-weight: 400;
      
    }

    td {
      border: none !important;
      background: transparent !important;
    }

    tr:first-child td { border-top: none; }
    tr td:first-child { border-left: none; }
    
    .el-calendar-day:hover {
      background-color: transparent !important;
    }
    .is-selected {
      background-color: transparent !important;
    }
  }

  .el-calendar-day {
    height: 35px; 
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.custom-date-cell {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
:deep(.custom-el-calendar) {
  .el-calendar__header {
    margin-bottom: 0 !important;
    padding-bottom: 0 !important;
  }
}

.day-circle {
  width: 28px;
  height: 28px;
  line-height: 28px;
  border-radius: 50%;
  font-size: 18px;
  font-weight: 450;
  text-align: center;
  
  &.status-success { background-color: #1C5671; color: #fff;}
  &.status-fail { background-color: #F13F5D4D; color: #1F2429;}
  &.status-partial { background-color: #1C567180;color: #fff;}
  &.status-unwell { background-color: #FFC32DB3; color: #1F2429CC;}
  &.status-future { color: #1F2429CC; }
}

.legend-area {
  width: 90%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
  margin: 20px auto 20px 60px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 15px;
  
  span {
    font-size: 14px;
    color: #1F2429CC;
    opacity: 0.9;
  }
  
  .dot {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #fff;

    &.status-success { background-color: #1C5671; font-weight: 400;}
    &.status-fail { background-color: #F13F5D4D; color: #1F2429CC;font-weight: 400;}
    &.status-partial { background-color: #1C567180;font-weight: 400;}
    &.status-unwell { background-color: #FFC32DB3; color: #1F2429CC;font-weight: 400;}
  }
}
</style>