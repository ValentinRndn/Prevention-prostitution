import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/style.css'
import { createMetaManager } from 'vue-meta'; 
// import VueMatomo from 'vue-matomo'

const app = createApp(App)

app.use(router)


app.use(createMetaManager());
app.mount('#app')

window._paq = window._paq || []
window._paq.push(['trackPageView'])
