<script setup lang="ts">
import { onActivated } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouteAndLiuRouter } from '~/routes/liu-router';
import liuUtil from '~/utils/liu-util';
import { medicalOption, MRIOption, XRayOption } from './tools/types';
import { filter, needMRIPlan, needXRayPlan } from './tools/scripts';

const runImg = "/figma/running.png";
const balanceImg = "/figma/balance.png";
const doctorQrImg = "/doctor01.png"; 

const { t } = useI18n();
const rr = useRouteAndLiuRouter();

const getIconImg = (key: string) => {
  if (key === 'aerobic') return runImg;
  if (key === 'neuro') return balanceImg;
  return undefined; 
}

onActivated(() => {
  let val_key = "light-rehab.title_1";
  const f = rr.route.query?.plan;
  if(f === "moderate") {
    val_key = "light-rehab.title_2";
  } else if(f === "severe") {
    val_key = "severe-rehab.title";
  } else if(f === "serious") {
    val_key = "light-rehab.serious";
  }
  liuUtil.setAppTitle({ val_key });
});

const onTapBack = () => {
  rr.router.naviBack();
};

const onSelectOption = (key: string) => {
  const query = rr.route.query
  const f = query?.plan
  let plan = "mild"
  if(f === "moderate") {
    plan = "moderate"
  } else if(f === "severe") {
    plan = "severe"
  }
  
  let name = `${plan}-${key}`
  rr.router.push({ name })
}
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

    <div class="header-area">
      <h1 class="main-title">{{ t('light-rehab.question') }}</h1>
    </div>

    <div class="cards-list">
      
      <template v-if="rr.route.query?.plan === 'serious'">
        <div class="glass-card" @click="onSelectOption(medicalOption.key)">
          <div class="card-img-box">
            <span style="font-size: 64px;">{{ medicalOption.icon }}</span>
          </div>
          <div class="card-desc">{{ t('light-rehab.desc-medical') }}</div>
          <div class="card-btn-area">
            <button class="action-btn">
              {{ t('light-rehab.option-medical') }}
            </button>
          </div>
        </div>

        <div class="doctor-qr-box">
          <img :src="doctorQrImg" class="doctor-qr-img" alt="doctor qr code" />
        </div>
      </template>

      <template v-else>
        <template v-for="option in filter()" :key="option.key">
          <div 
            v-if="option.key !== 'notice'" 
            class="glass-card"
          >
            <div class="card-img-box">
              <img v-if="getIconImg(option.key)" :src="getIconImg(option.key)" class="card-img" :alt="option.key" />
              <span v-else style="font-size: 64px;">{{ option.icon }}</span>
            </div>
            <div class="card-desc">{{ t(`light-rehab.desc-${option.key}`) }}</div>
            <div class="card-btn-area">
              <button class="action-btn" @click="onSelectOption(option.key)">
                {{ t(`light-rehab.option-${option.key}`) }}
              </button>
            </div>
          </div>
        </template>
      </template>

      <div v-if="needMRIPlan()" class="glass-card">
        <div class="card-img-box">
          <span style="font-size: 64px;">{{ MRIOption.icon }}</span>
        </div>
        <div class="card-desc">{{ t('light-rehab.desc-MRI') }}</div>
        <div class="card-btn-area">
          <button class="action-btn" @click="onSelectOption(MRIOption.key)">
            {{ t('light-rehab.option-MRI') }}
          </button>
        </div>
      </div>

      <div v-if="needXRayPlan()" class="glass-card">
        <div class="card-img-box">
          <span style="font-size: 64px;">{{ XRayOption.icon }}</span>
        </div>
        <div class="card-desc">{{ t('light-rehab.desc-XRay') }}</div>
        <div class="card-btn-area">
          <button class="action-btn" @click="onSelectOption(XRayOption.key)">
            {{ t('light-rehab.option-XRay') }}
          </button>
        </div>
      </div>

    </div>
    <div style="height: 40px;"></div>
  </div>
</div>
</template>

<style scoped lang="scss">
  .page-wrapper {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #4D7A8F 0%, #CDDAE0 100%);
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
  margin-bottom: 10px;
}

.back-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;              
  cursor: pointer;
  opacity: 0.9;
  
  &:active {
    opacity: 0.6;
  }
}

.header-area {
  text-align: center;
  margin-bottom: 30px;
}

.main-title {
  font-size: 26px;
  font-weight: 700;
  line-height: 1.4;
  white-space: pre-wrap; 
  text-shadow: 0 1px 2px rgba(0,0,0,0.1);
  letter-spacing: 1px;
  white-space: pre-line;
}

.cards-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0px; 
}

.glass-card {
  width: 100%;
  max-width: 400px; 
  margin: 24px auto; 
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.card-img-box {
  height: 120px;
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  .card-img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
}

.card-desc {
  font-size: 15px;
  color: #fff;
  margin-bottom: 24px;
  text-align: center;
  opacity: 0.95;
  letter-spacing: 0.5px;
  font-weight: 500;
}

.card-btn-area {
  width: 100%;
  display: flex;
  justify-content: center;
}

.action-btn {
  background-color: #2D5D72;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 48px; 
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.2s;
  letter-spacing: 1px;
   &.is-active,
    &:hover {
        opacity: 0.9;
        transform: scale(0.98);
        background-color: #244b5c;
    }

  &:active {
    transform: scale(0.96);
    background-color: #244b5c;
  }
}

.doctor-qr-box {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
  
  .doctor-qr-img {
    width: 100%;
    max-width: 300px; 
    border-radius: 12px; 
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); 

  }
}
</style>





