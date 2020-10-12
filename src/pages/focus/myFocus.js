import Vue from 'vue'
import myFocus from './myFocus.vue'
import loading from '../../plugins/loading'

Vue.use(loading)
Vue.config.productionTip = false

new Vue({
  render: h => h(myFocus)
}).$mount('#app')
