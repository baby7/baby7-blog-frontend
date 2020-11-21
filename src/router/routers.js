import Main from '@/view/main/main'

export default [
    {
        path: '/',
        name: '_home',
        redirect: '/index',
        component: Main,
        children: [
            {
                /*主页*/
                path: '/index',
                name: 'index',
                component: () => import('@/view/index/index.vue')
            },
            {
                /*菜单页*/
                path: '/menu',
                name: 'menu',
                component: () => import('@/view/menu/menu.vue')
            },
            {
                /*博客页*/
                path: '/myBlog',
                name: 'myBlog',
                component: () => import('@/view/blog/my-blog.vue')
            },
            {
                /*标签页*/
                path: '/label',
                name: 'label',
                component: () => import('@/view/label/label.vue')
            },
            {
                /*时间线*/
                path: '/timeline',
                name: 'timeline',
                component: () => import('@/view/time-line/time-line')
            },
            {
                /*留言板*/
                path: '/comment',
                name: 'comment',
                component: () => import('@/view/comment/comment')
            },
            {
                /*博主*/
                path: '/myself',
                name: 'myself',
                component: () => import('@/view/blogger/blogger')
            }
        ]
    },
    {
        path: '/401',
        name: 'error_401',
        component: () => import('@/view/error-page/401.vue')
    },
    {
        path: '/500',
        name: 'error_500',
        component: () => import('@/view/error-page/500.vue')
    },
    {
        path: '*',
        name: 'error_404',
        component: () => import('@/view/error-page/404.vue')
    }
]
