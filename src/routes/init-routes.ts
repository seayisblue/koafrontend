
import type { RouteRecordRaw } from "vue-router"
const HomePage = () => import("../pages/HomePage/HomePage.vue")
const BasicInfo = () => import("../pages/level1/BasicInfo/BasicInfo.vue")
const ChiefComplaint = () => import("../pages/level1/ChiefComplaint/ChiefComplaint.vue")
const MedicalHistory = () => import("../pages/level1/MedicalHistory/MedialHistory.vue")
const LabTests = () => import("../pages/level1/LabTests/LabTests.vue")
const MedicalResult = () => import("../pages/level1/MedicalResult/MedicalResult.vue")
const WomacHome = () => import("../pages/level2/WomacHome/WomacHome.vue")
const WomacOne = () => import("../pages/level2/WomacOne/WomacOne.vue")
const WomacTwo = () => import("../pages/level2/WomacTwo/WomacTwo.vue")
const WomacThree = () => import("../pages/level2/WomacThree/WomacThree.vue")
const WomacResult = () => import("../pages/level2/WomacResult/WomacResult.vue")
const SasHome = () => import("../pages/level2/SasHome/SasHome.vue")
const SasCollect = () => import("../pages/level2/SasCollect/SasCollect.vue")
const SasResult = () => import("../pages/level2/SasResult/SasResult.vue")
const TouchCollect = () => import("../pages/level2/TouchCollect/TouchCollect.vue")
const TugCollect = () => import("../pages/level2/TugCollect/TugCollect.vue")
const TugResult = () => import("../pages/level2/TugResult/TugResult.vue")
const VideoStart = () => import("../pages/level3/VideoStart/VideoStart.vue")
const VideoBox = () => import("../pages/level3/VideoBox/VideoBox.vue")
const VideoQuestion = () => import("../pages/level3/VideoQuestion/VideoQuestion.vue")
const LightRehab = () => import("../pages/level4/LightRehab/LightRehab.vue")
const MildAerobic = () => import("../pages/level4/MildAerobic/MildAerobic.vue")
const MildAerobicSelect = () => import("../pages/level4/MildAerobic/MildAerobicSelect.vue")
const ModerateAerobic = () => import("../pages/level4/ModerateAerobic/ModerateAerobic.vue")
const ModerateAerobicSelect = () => import("../pages/level4/ModerateAerobic/ModerateAerobicSelect.vue")
const MildNeuro = () => import("../pages/level4/MildNeuro/MildNeuro.vue")
const MildNeuroSelect = () => import("../pages/level4/MildNeuro/MildNeuroSelect.vue")
const MildNeuroDetail = () => import("../pages/level4/MildNeuro/MildNeuroDetail.vue")
const MildNeuroVideo = () => import("../pages/level4/MildNeuro/MildNeuroVideo.vue")
const ModerateNeuro = () => import("../pages/level4/ModerateNeuro/ModerateNeuro.vue")
const ModerateNeuroSelect = () => import("../pages/level4/ModerateNeuro/ModerateNeuroSelect.vue")
const ModerateNeuroDetail = () => import("../pages/level4/ModerateNeuro/ModerateNeuroDetail.vue")
const ModerateNeuroVideo = () => import("../pages/level4/ModerateNeuro/ModerateNeuroVideo.vue")
const SevereAerobic = () => import("../pages/level4/SevereAerobic/SevereAerobic.vue")
const SevereNeuro = () => import("../pages/level4/SevereNeuro/SevereNeuro.vue")
const SevereNeuroSelect = () => import("../pages/level4/SevereNeuro/SevereNeuroSelect.vue")
const SevereNeuroDetail = () => import("../pages/level4/SevereNeuro/SevereNeuroDetail.vue")
const SevereNeuroVideo = () => import("../pages/level4/SevereNeuro/SevereNeuroVideo.vue")
const SevereNeuroComplete = () => import("../pages/level4/SevereNeuro/SevereNeuroComplete.vue")

const MildAerobic_v2 = () => import('~/pages/level4/MildAerobic/MildAerobic.vue')
const StatusCheck = () => import('~/pages/level5/StatusCheck/StatusCheck.vue');

const CheckinHistory = () => import("../pages/level4/Checkin/CheckinHistory.vue")
const Checkpage = () => import("../pages/level4/Checkin/Check.vue")

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    components: {
      default: HomePage,
    },
    name: "home",
    meta: {}
  },
  {
    path: "/basic-info",
    components: {
      default: BasicInfo,
    },
    name: "basic-info",
    meta: {}
  },
  {
    path: "/chief-complaint",
    components: {
      default: ChiefComplaint,
    },
    name: "chief-complaint",
    meta: {}
  },
  {
    path: "/medical-history",
    components: {
      default: MedicalHistory,
    },
    name: "medical-history",
    meta: {}
  },
  {
    path: "/lab-tests",
    components: {
      default: LabTests,
    },
    name: "lab-tests",
    meta: {}
  },
  {
    path: "/medical-result",
    components: {
      default: MedicalResult,
    },
    name: "medical-result",
    meta: {}
  },

  // WOMAC
  {
    path: "/womac-home",
    components: {
      default: WomacHome,
    },
    name: "womac-home",
    meta: {}
  },
  {
    path: "/womac-one",
    components: {
      default: WomacOne,
    },
    name: "womac-one",
    meta: {}
  },
  {
    path: "/womac-two",
    components: {
      default: WomacTwo,
    },
    name: "womac-two",
    meta: {}
  },
  {
    path: "/womac-three",
    components: {
      default: WomacThree,
    },
    name: "womac-three",
    meta: {}
  },
  {
    path: "/womac-result",
    components: {
      default: WomacResult,
    },
    name: "womac-result",
    meta: {}
  },

  // SAS
  {
    path: "/sas-home",
    components: {
      default: SasHome,
    },
    name: "sas-home",
    meta: {}
  },
  {
    path: "/sas-collect",
    components: {
      default: SasCollect,
    },
    name: "sas-collect",
    meta: {}
  },
  {
    path: "/sas-result",
    components: {
      default: SasResult,
    },
    name: "sas-result",
    meta: {}
  },

  // 触诊
  {
    path: "/touch-collect",
    components: {
      default: TouchCollect,
    },
    name: "touch-collect",
    meta: {}
  },

  // tug
  {
    path: "/tug-collect",
    components: {
      default: TugCollect,
    },
    name: "tug-collect",
    meta: {}
  },

  {
    path: "/tug-result",
    components: {
      default: TugResult,
    },
    name: "tug-result",
    meta: {}
  },

  {
    path: "/ae/:aeType",
    components: {
      default: VideoStart,
    },
    name: "ae-video-start",
    meta: {},
  },
  {
    path: "/ae/:aeType/video",
    components: {
      default: VideoBox,
    },
    name: "ae-video-box",
    meta: {},
  },
  {
    path: "/ae/:aeType/question",
    components: {
      default: VideoQuestion,
    },
    name: "ae-video-question",
    meta: {},
  },

  {
    path: "/light-rehab",
    components: {
      default: LightRehab,
    },
    name: "light-rehab",
    meta: {},
  },
  {
    path: "/mild-aerobic",
    components: {
      default: MildAerobic,
    },
    name: "mild-aerobic",
    meta: {},
  },
  {
    path: "/mild-aerobic/select",
    components: {
      default: MildAerobicSelect,
    },
    name: "mild-aerobic-select",
    meta: {},
  },
   {
    path: "/mild-aerobic/check",
    components: {
      default: Checkpage,
    },
    name: "mild-aerobic-check",
    meta: {},
  },
  {
    path: "/moderate-aerobic",
    components: {
      default: ModerateAerobic,
    },
    name: "moderate-aerobic",
    meta: {},
  },
  {
    path: "/moderate-aerobic/select",
    components: {
      default: ModerateAerobicSelect,
    },
    name: "moderate-aerobic-select",
    meta: {},
  },
   {
    path: "/moderate-aerobic/check",
    components: {
      default: Checkpage,
    },
    name: "moderate-aerobic-check",
    meta: {},
  },
  {
    path: "/mild-neuro",
    components: {
      default: MildNeuro,
    },
    name: "mild-neuro",
    meta: {},
  },
  {
    path: "/mild-neuro/select",
    components: {
      default: MildNeuroSelect,
    },
    name: "mild-neuro-select",
    meta: {},
  },
  {
    path: "/mild-neuro/:exerciseId",
    components: {
      default: MildNeuroDetail,
    },
    name: "mild-neuro-detail",
    meta: {},
  },
  {
    path: "/mild-neuro/:exerciseId/video",
    components: {
      default: MildNeuroVideo,
    },
    name: "mild-neuro-video",
    meta: {},
  },
  {
    path: "/moderate-neuro",
    components: {
      default: ModerateNeuro,
    },
    name: "moderate-neuro",
    meta: {},
  },
  {
    path: "/moderate-neuro/select",
    components: {
      default: ModerateNeuroSelect,
    },
    name: "moderate-neuro-select",
    meta: {},
  },
  {
    path: "/moderate-neuro/:exerciseId",
    components: {
      default: ModerateNeuroDetail,
    },
    name: "moderate-neuro-detail",
    meta: {},
  },
  {
    path: "/moderate-neuro/:exerciseId/video",
    components: {
      default: ModerateNeuroVideo,
    },
    name: "moderate-neuro-video",
    meta: {},
  },
  {
    path: "/severe-aerobic",
    components: {
      default: SevereAerobic,
    },
    name: "severe-aerobic",
    meta: {},
  },
   {
    path: "/severe-aerobic/check",
    components: {
      default: Checkpage,
    },
    name: "severe-aerobic-check",
    meta: {},
  },
  {
    path: "/severe-neuro",
    components: {
      default: SevereNeuro,
    },
    name: "severe-neuro",
    meta: {},
  },
  {
    path: "/severe-neuro/select",
    components: {
      default: SevereNeuroSelect,
    },
    name: "severe-neuro-select",
    meta: {},
  },
  {
    path: "/severe-neuro/:exerciseId",
    components: {
      default: SevereNeuroDetail,
    },
    name: "severe-neuro-detail",
    meta: {},
  },
  {
    path: "/severe-neuro/:exerciseId/video",
    components: {
      default: SevereNeuroVideo,
    },
    name: "severe-neuro-video",
    meta: {},
  },
  {
    path: "/severe-neuro/complete",
    components: {
      default: SevereNeuroComplete,
    },
    name: "severe-neuro-complete",
    meta: {},
  },
  {
    path: "/severe-neuro/check",
    components: {
      default: Checkpage,
    },
    name: "severe-neuro-check",
    meta: {},
  },
  {
  path: '/test-aerobic',
   components: {
    default: MildAerobic_v2
  },
  name: 'test-aerobic',
  meta: {},
  },
  {
    path: '/test-status',
    name: 'test-status',
    components: {
      default: StatusCheck,
    },
    meta: {},
  },
  {
  path: "/checkin-history",
  components: {
    default: CheckinHistory,
  },
  name: "checkin-history",
  meta: {},
  },
  {
  path: "/checkin-page",
  components: {
    default: Checkpage,
  },
  name: "checkin-page",
  meta: {},
},

  /***************** the rest of routes, redirect to root ****************/
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  }
]
