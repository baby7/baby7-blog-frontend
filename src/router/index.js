import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'

/************************************************************************/

Vue.use(Router);

const router = new Router({
    routes,
    mode: 'history'
});

router.beforeEach((to, from, next) => {
    next()
});

router.afterEach(to => {
    setTitle(to);
});

export default router

/************************************************************************/

/**
 * @description 根据当前跳转的路由设置显示在浏览器标签的title
 * @param {Object} routeItem 路由对象
 */
export const setTitle = (routeItem) => {
    const handledRoute = getRouteTitleHandled(routeItem)
    const pageTitle = showTitle(handledRoute)
}

export const getRouteTitleHandled = (route) => {
    let router = {...route}
    let meta = {...route.meta}
    let title = ''
    if (meta.title) {
        if (typeof meta.title === 'function') title = meta.title(router)
        else title = meta.title
    }
    meta.title = title
    router.meta = meta
    return router
}

export const showTitle = (item) => ((item.meta && item.meta.title) || item.name)
