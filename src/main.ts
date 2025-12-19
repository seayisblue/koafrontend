import 'virtual:svg-icons-register'

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { i18n } from './locales'
import { createPinia } from 'pinia'
import { router } from './routes/router'
import SvgIcon from "./assets/svg-icon.vue"
import PageWrapper from './components/PageWrapper/PageWrapper.vue'
import CustomButton from './components/custom-ui/custom-button/custom-button.vue'
import CustomRadios from "./components/CustomRadios/CustomRadios.vue"
import CustomCheckboxs from "./components/CustomCheckboxs/CustomCheckboxs.vue"
import CustomInput from './components/CustomInput/CustomInput.vue'
import ButtonList from './components/ButtonList/ButtonList.vue'
import LiuImg from "./components/common/liu-img/liu-img.vue"
import { liuShowDirective } from "~/utils/directives/v-liu-show"

const app = createApp(App)

app.component("SvgIcon", SvgIcon)
app.component("PageWrapper", PageWrapper)
app.component("CustomButton", CustomButton)
app.component("CustomRadios", CustomRadios)
app.component("CustomCheckboxs", CustomCheckboxs)
app.component("CustomInput", CustomInput)
app.component("ButtonList", ButtonList)
app.component("LiuImg", LiuImg)
app.use(createPinia())
app.use(i18n)
app.use(router)

// register global directives
app.directive('liu-show', liuShowDirective)


app.mount('#app')
