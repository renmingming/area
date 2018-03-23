// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'

import store from '@/store/index'
import filters from '@/filters/index.js'
import AppConfig from '@/config.js'

Vue.use(MuseUI)
Vue.use(filters)

Vue.config.productionTip = false
Vue.prototype.AppConfig = AppConfig

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
