import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import '@/styles/index.scss'
import VueCarousel from "vue-carousel";
import Storage from 'vue-ls';

var options = {
  // namespace: 'vuejs__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local', // storage name session, local, memory
};

Vue.use(Storage, options);



// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
//import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

// // Install BootstrapVue
// Vue.use(BootstrapVue)
// // Optionally install the BootstrapVue icon components plugin
// Vue.use(IconsPlugin)

Vue.config.productionTip = false

Vue.use(VueCarousel);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
