import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import axios from './plugins/axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/iconfont/iconfont.css"

Vue.use(ElementUI);
Vue.config.productionTip = false


window.__global__ = {
  router,
  store
}

Vue.use(axios)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
