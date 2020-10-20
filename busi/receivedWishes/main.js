import Vue from 'vue';
import App from './App';
import filters from './../../common/filters'
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
Vue.config.productionTip = false
new Vue({
    el: '#app',
    template: '<App/>',
    components: { App },
    
});
