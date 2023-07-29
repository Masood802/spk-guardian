import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import StudentHeader from '@/components/StudentHeader'
import './axios'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App)
app.component('StudentHeader',StudentHeader);
app.component('VueDatePicker',VueDatePicker)
.use(createPinia())
.use(router)
.mount('#app');

