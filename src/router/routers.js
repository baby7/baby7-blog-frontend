import Main from '@/view/main/main'

export default [
    {
        path: '/',
        name: '_home',
        redirect: '/index.html',
        component: Main,
        children: [
            {
                /*主页*/
                path: '/index.html',
                name: 'index',
                component: () => import('@/view/index/index.vue')
            },
            {
                /*菜单页*/
                path: '/menu/:menuId.html',
                name: 'menu',
                component: () => import('@/view/menu/menu.vue')
            },
            {
                /*博客页*/
                path: '/myBlog/:blogId.html',
                name: 'myBlog',
                component: () => import('@/view/blog/my-blog.vue')
            },
            {
                /*标签页*/
                path: '/label.html',
                name: 'label',
                component: () => import('@/view/label/label.vue')
            },
            {
                /*标签页*/
                path: '/label/:labelId.html',
                name: 'myLabel',
                component: () => import('@/view/label/label.vue')
            },
            {
                /*时间线*/
                path: '/timeline.html',
                name: 'timeline',
                component: () => import('@/view/time-line/time-line')
            },
            {
                /*留言板*/
                path: '/comment.html',
                name: 'comment',
                component: () => import('@/view/comment/comment')
            },
            {
                /*友链*/
                path: '/friendLink.html',
                name: 'friendLink',
                component: () => import('@/view/friend-link/friend-link.vue')
            },
            {
                /*博主*/
                path: '/myself.html',
                name: 'myself',
                component: () => import('@/view/blogger/blogger')
            },
            /*******************************旧的路径，兼容***********************************/
            {
                /*主页*/
                path: '/index',
                name: 'oldIndex',
                component: () => import('@/view/index/index.vue')
            },
            {
                /*菜单页*/
                path: '/menu',
                name: 'oldMenu',
                component: () => import('@/view/menu/menu.vue')
            },
            {
                /*博客页*/
                path: '/myBlog',
                name: 'oldMyBlog',
                component: () => import('@/view/blog/my-blog.vue')
            },
            {
                /*标签页*/
                path: '/label',
                name: 'oldLabel',
                component: () => import('@/view/label/label.vue')
            },
            {
                /*时间线*/
                path: '/timeline',
                name: 'oldTimeline',
                component: () => import('@/view/time-line/time-line')
            },
            {
                /*留言板*/
                path: '/comment',
                name: 'oldComment',
                component: () => import('@/view/comment/comment')
            },
            {
                /*博主*/
                path: '/myself',
                name: 'oldMyself',
                component: () => import('@/view/blogger/blogger')
            },
        ]
    },
    {
        path: '/401.html',
        name: 'error_401',
        component: () => import('@/view/error-page/401.vue')
    },
    {
        path: '/401',
        name: 'error_401',
        component: () => import('@/view/error-page/401.vue')
    },
    {
        path: '/500.html',
        name: 'error_500',
        component: () => import('@/view/error-page/500.vue')
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
