import './assets/base.css'

import { createApp } from 'vue'
import App from './App.vue'
import VueEcharts from 'vue-echarts';

const app = createApp(App);
app.component('v-chart', VueEcharts);
app.mount('#app')
