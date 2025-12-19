<script setup lang="ts">
import { reactive, computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useRouteAndLiuRouter } from '~/routes/liu-router';
import liuApi from '~/utils/liu-api';

const walkImg = "/figma/walking.png";
const bikeImg = "/figma/cycling.png";
const swimImg = "/figma/swimming.png";
const completeImg = "/figma/complete.png";

const rr = useRouteAndLiuRouter();
const route = useRoute();
const CACHE_KEY = 'user_checkin_record';

const currentDate = ref(new Date());

const routeConfig: Record<string, any> = {
  'mild-aerobic-check': {
    walking: { title: "平地慢跑", img: walkImg },
    bike: { title: "功率自行车", img: bikeImg },
    swimming: { title: "游泳", img: swimImg },
    default: { title: "平地慢跑", img: walkImg }
  },
  'moderate-aerobic-check': {
    walking: { title: "平地快走", img: walkImg },
    bike: { title: "功率自行车", img: bikeImg },
    swimming: { title: "游泳", img: swimImg },
    default: { title: "平地快走", img: walkImg }
  },
  'severe-aerobic-check': {
    default: { title: "平地慢走", img: walkImg }
  },
  'severe-neuro-check': {
    default: { title: "神经肌肉训练", img: completeImg }
  }
};

const currentConfig = computed(() => {
  const routeName = route.name as string;
  const type = (route.query.type as string) || 'default';
  
  const configGroup = routeConfig[routeName];
  
  if (!configGroup) {
    return { title: "打卡", img: walkImg };
  }
  
  return configGroup[type] || configGroup['default'];
});

const checkinData = reactive({
  statusText: "今日未打卡",
  consecutiveDays: 0,
  totalDays: 0,
  history: [] as string[]
});

const currentMonthLabel = computed(() => {
  const d = currentDate.value;
  return `${d.getFullYear()}年${d.getMonth() + 1}月`;
});

const getDateStatus = (date: Date) => {
  const today = new Date();
  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    return 'success'; 
  }
  return ''; 
};

const initData = () => {
  const cache = liuApi.getStorageSync(CACHE_KEY);
  if (cache) {
    checkinData.consecutiveDays = cache.consecutiveDays || 0;
    checkinData.totalDays = cache.totalDays || 0;
    checkinData.history = cache.history || [];
  }
  checkStatus();
  performCheckIn();
};

const getTodayStr = () => {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
};

const checkStatus = () => {
  const todayStr = getTodayStr();
  if (checkinData.history.includes(todayStr)) {
    checkinData.statusText = "今日已打卡";
  } else {
    checkinData.statusText = "打卡中...";
  }
};

const performCheckIn = () => {
  const todayStr = getTodayStr();
  if (checkinData.history.includes(todayStr)) return;

  checkinData.history.push(todayStr);
  checkinData.totalDays += 1;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yStr = `${yesterday.getFullYear()}-${yesterday.getMonth()+1}-${yesterday.getDate()}`;
  
  if (checkinData.history.includes(yStr)) {
    checkinData.consecutiveDays += 1;
  } else {
    checkinData.consecutiveDays = 1; 
  }

  checkinData.statusText = "今日已打卡";

  liuApi.setStorageSync(CACHE_KEY, {
    consecutiveDays: checkinData.consecutiveDays,
    totalDays: checkinData.totalDays,
    history: checkinData.history
  });
};

const onTapRest = () => {
  rr.router.goHome();
};

const onTapHistory = () => {
  rr.router.push({ name: 'checkin-history' });
};

onMounted(() => {
  initData();
});
</script>

<template>
<div class="page-wrapper">
  <div class="page-container">
    <div class="header-title liu-no-select">{{ currentConfig.title }}</div>

    <div class="illustration-box">
      <img :src="currentConfig.img" class="bike-img" alt="Illustration" />
    </div>

    <div class="status-text liu-no-select">{{ checkinData.statusText }}</div>

    <div class="stats-row">
      <div class="stat-item">
        <div class="stat-label">连续打卡</div>
        <div class="stat-value">
          <span class="num">{{ checkinData.consecutiveDays }}</span>
          <span class="unit">天</span>
        </div>
      </div>
      <div class="stat-item">
        <div class="stat-label">累计打卡</div>
        <div class="stat-value">
          <span class="num">{{ checkinData.totalDays }}</span>
          <span class="unit">天</span>
        </div>
      </div>
    </div>

    <div class="calendar-card">
      <div class="calendar-header">
        <span class="arrow disabled">&lt;</span>
        <span class="date-title">{{ currentMonthLabel }}</span>
        <span class="arrow disabled">&gt;</span>
      </div>

      <el-calendar 
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
              :class="getDateStatus(data.date) ? `status-${getDateStatus(data.date)}` : ''"
            >
              {{ data.date.getDate() }}
            </div>
          </div>
        </template>
      </el-calendar>
    </div>

    <div class="footer-btn-area">
      <div class="rest-btn" @click="onTapRest">
        休息一下
      </div>
      <div class="history-link" @click="onTapHistory">
        查看历史数据
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.page-wrapper {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #376A82 0%, #FFFFFF 100%);
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
}

.header-title {
  margin-top: 10px;
  font-size: 22px;
  font-weight: 400;
  letter-spacing: 1px;
}

.illustration-box {
  margin-top: 10px;

  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  .bike-img {
    width: 100%;
    height: 200px;
    object-fit: contain;
  }
}

.status-text {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 15px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.stats-row {
  display: flex;
  justify-content: space-around; 
  width: 90%; 
  margin-bottom: 10px; 
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-label {
  font-size: 16px; 
  opacity: 0.9;
  margin-bottom: 4px;
}

.stat-value {
  .num {
    font-size: 40px; 
    font-weight: 700;
  }
  .unit {
    font-size: 14px;
    margin-left: 4px;
  }
}

.calendar-card {
  width: 90%;
  background: rgba(241, 243, 246, 0.5); 
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 12px 20px;
  box-sizing: border-box;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  color: #2c3e50;
  margin-bottom: 30px;
}

.calendar-header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  color: #4A5568;
  
  .date-title { 
    font-size: 20px; 
    font-weight: 400; 
    color:#1F2429CC; 
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  }
  
  .arrow {
    font-weight: 400; 
    color: #1F2429CC; 
    opacity: 0.5;
    cursor: default;
  }
}

:deep(.custom-el-calendar) {
  background: transparent !important;
  border: none !important;
  --el-calendar-border: none;
  --el-calendar-header-border-bottom: none;
  
  .el-calendar__body { padding: 0; }
  
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
    
    .el-calendar-day:hover, .is-selected {
      background-color: transparent !important;
    }
  }

  .el-calendar-day {
    height: 40px;
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
  color: #1F2429CC; 
  
  &.status-success {
    background-color: #1C5671; 
    color: #fff; 
    font-weight: 400;
  }
}

.footer-btn-area {
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 30px;
  gap: 20px;
}

.rest-btn {
  background-color: #2D5D72;
  color: white;
  padding: 12px 60px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  box-shadow: 0 4px 10px rgba(45, 93, 114, 0.4);
  cursor: pointer;
  transition: transform 0.1s;

  &:active {
    transform: scale(0.98);
  }
}

.history-link {
  font-size: 14px;
  color: #8C9FA9;
  text-decoration: underline;
  text-underline-offset: 4px;
  cursor: pointer;
  opacity: 0.9;
  letter-spacing: 0.5px;
  
  &:active {
    opacity: 0.7;
  }
}
</style>