import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/iconfont/iconfont.css"
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';

//axios赋值给变量http		将axios挂到vue原型上
Vue.prototype.$axios = axios

Vue.use(ElementUI,Avue,{axios});
Vue.config.productionTip = false
//定义全局默认配置
//axios.defaults.headers.common['Authentication'] = store.state.token;

window.__global__ = {
  router,
  store
}

//Vue.prototype.axios = axios

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


