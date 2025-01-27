import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/style.css'
import { createHead } from '@vueuse/head';
// import VueMatomo from 'vue-matomo'

const app = createApp(App)
const head = createHead();

app.use(router)
app.use(head);

app.mount('#app')


window._paq = window._paq || []
window._paq.push(['trackPageView'])
