import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Api from './api'
import store from './store'
import 'iview/dist/styles/iview.css'
import components from '@/components/iview'

Vue.config.productionTip = false

Vue.prototype.$api = Api
Vue.use(components)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
