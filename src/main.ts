import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import CountryFlag from 'vue-country-flag-next'

import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
  // .use(CountryFlag)

app.mount('#app')
