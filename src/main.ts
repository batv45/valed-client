import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import { createPinia } from 'pinia'
import mainPlugin from '~/plugins/mainPlugin.ts'

import 'notyf/notyf.min.css' // for React, Vue and Svelte
import './style.css'
import App from './App.vue'
import router from './router.ts'
import '@tabler/core/dist/js/tabler.min.js'

const pinia = createPinia()

const head = createHead({
  titleTemplate: '%s - Valed',
})
const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(head)
app.use(mainPlugin)
app.mount('#app')
