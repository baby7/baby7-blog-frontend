<template>
    <header>
        <div class="header-info">
            <img :src="avatar" class="header-img" style="height: 35px">
            <span class="header-title">
<!--                <router-link to="/index">-->
<!--                    {{ title }}-->
<!--                </router-link>-->
              <a href="/index">
                {{ title }}
              </a>
            </span>
        </div>
        <MenuHeader v-show="showMenu" :config-nav="configNav"/>
    </header>
</template>

<script>
import MenuHeader from "@/components/menu-header/menu-header"
import { getMenuList } from '@/api/menu'

export default {
    name: "Header",
    components: {
        MenuHeader
    },
    props:{
        avatar:{
            type: String,
            require: true
        },
        title:{
            type: String,
            require: true
        },
    },
    data() {
        return {
            query: {
                current: 1,
                size: 20
            },
            configNav: [
                {
                    name: "首页",
                    path: '/index',
                },
                {
                    name: " 分类",
                    path: '/',
                    subItems: [
                        {link: '', text: '分类1'},
                        {link: '', text: '分类2'}
                    ]
                },
                {
                    name: "时间线",
                    path: '/timeline',
                },
                {
                    name: "留言",
                    path: '/comment',
                },
                {
                    name: "博主",
                    path: '/myself',
                },
                // {
                //     name: "开源地址",
                //     path: 'https://github.com/',
                //     subItems: [
                //         {link: 'https://github.com/baby7/baby7-blog-frontend', text: '前端源码'},
                //         {link: 'https://github.com/baby7/baby7-blog-manage', text: '管理端源码'},
                //         {link: 'https://github.com/baby7/baby7-blog-server', text: '后端源码'}
                //     ]
                // }
            ],
            showMenu: false
        }
    },
    methods:{
        // 获取数据
        getData() {
            getMenuList(this.query).then(res => {
                let subItems = []
                for (let i = 0; i < res.data.records.length; i++) {
                    subItems.push({
                        link: "/menu?id=" + res.data.records[i].id,
                        text: res.data.records[i].name
                    })
                }
                this.configNav[1].subItems = subItems
                this.showMenu = true
            })
        }
    },
    mounted() {
        this.getData()
    }
}
</script>

<style lang="scss">
@include themeify {
    header {
        position: fixed;
        height: 35px;
        top: 0;
        width: 100%;
        z-index: 20;
        padding: .7rem;
        background-color:  rgba(0, 0, 0, 0.5);;
        font-size: .9rem;
        box-shadow: $p-color-box-shadow-start 0 2px 4px, $p-color-box-shadow-end 0 0 6px;
    }
    .header-info {
        position: absolute;
        line-height: 2.2rem;
        font-size: 16px
    }
    .header-img {
        height: 35.2px;
        min-width: 35.2px;
        vertical-align: top;
        border-radius: 4px;
    }
    .header-title {
        position: relative;
        font-size: 1.2rem;
        line-height: 2.2rem;
        color: $p-color-title;
    }
    .header-title > a {
        color: $p-color-title;
        text-decoration: none;
    }
}
</style>
