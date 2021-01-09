import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue } from 'bootstrap-vue'
// Install BootstrapVue
import axios from 'axios';
import VueAxios from 'vue-axios';

// axios.defaults.withCredentials = true;
Vue.use(VueAxios, axios);

Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//import Header from './components/Header'



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
