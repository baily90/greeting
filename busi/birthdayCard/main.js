import Vue from 'vue'
import App from './App'
import { Lazyload } from 'vant'
Vue.config.productionTip = false
Vue.use(Lazyload)
new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
})
