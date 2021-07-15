import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/iconfont/iconfont.css";



//axios赋值给变量http		将axios挂到vue原型上
Vue.prototype.$axios = axios

Vue.use(ElementUI);

Vue.config.productionTip = false
//定义全局默认配置
//axios.defaults.headers.common['Authentication'] = store.state.token;

window.__global__ = {
  router,
  store
}

Vue.prototype.axios = axios


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


axios.interceptors.request.use(
  config => {
    if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.token = `${store.state.token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });


