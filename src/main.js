import Vue from 'vue'
import App from './App.vue'
import { store } from '@/store/store.js'

Vue.config.productionTip = false
// global variables
Vue.prototype.$mapState = {
  menu: 0,
  playing: 1,
  paused: 2,
  gameover: 3,
  gamewin: 4
};
Vue.prototype.$width = window.innerWidth;
Vue.prototype.$height = window.innerHeight;
// init vue
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
