import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store/store'
import bus from './eventBus.js'
import './registerServiceWorker'

import './scss/main.scss'

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
