import Vue from 'vue'
import router from './router'
import store from '@/store'
import App from './App.vue'

/**
 * 主题
 */
import './index.scss'
import Plain from 'theme'
Vue.use(Plain)

/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = true
/**
 * @description 全局变量
 */
Vue.store = store

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
}).$mount('#app');

