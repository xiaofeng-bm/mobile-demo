import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from './plugins/vant'
import Element from './plugins/element'
import './style/index.css'


import '@/icons' // icon

Vue.use(Vant)
Vue.use(Element)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
