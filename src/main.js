import Vue from 'vue'
import router from './router'
import store from '@/store'
import App from './App.vue'

router.afterEach(() => {
    var timer = setInterval(function () {
        let osTop = document.documentElement.scrollTop || document.body.scrollTop;
        let ispeed = Math.floor(-osTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
        this.isTop = true;
        if (osTop === 0) {
            clearInterval(timer);
        }
    }, 10)
})

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

