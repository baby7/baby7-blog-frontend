<template>
    <div>
        <ul class="menu-list">
            <li
                v-for="(menu,index) in menuList"
                class="menu-item">
                <router-link v-if="String(menu.id) === $route.query.id" style="color: #3F86E8" :to="'/menu?id='+menu.id">
                    {{ menu.name }}
                </router-link>
                <router-link v-if="String(menu.id) !== $route.query.id" :to="'/menu?id='+menu.id">
                    {{ menu.name }}
                </router-link>
            </li>
        </ul>
        <BlogList :blog-list="blogList"/>
        <Pagination
            :page-index="blogQuery.current"
            :total="blogQuery.total"
            :page-size="blogQuery.size"
            @change="handleCurrentChange">
        </Pagination>
    </div>
</template>

<script>
import BlogList from "@/components/blog-list/blog-list"
import Pagination from "@/components/pagination/pagination"
import {getMenuList} from '@/api/menu'
import {getBlogPage} from "@/api/blog";
import { addFootprint } from "@/api/footprint";
import { getSystem,getBrowser,getSE } from "@/util/message";

export default {
    name: "menu",
    components: {
        BlogList,
        Pagination
    },
    data() {
        return {
            blogQuery: {
                current: 1,
                size: 10
            },
            menuQuery: {
                current: 1,
                size: 999
            },
            menuList: [],
            blogList: [
                {
                    img: '',
                    title: '',
                    introduce: '',
                    createTime: '',
                    id: '',
                }
            ]
        }
    },
    methods: {
        // 获取数据
        getData() {
            this.blogQuery.menuId = this.$route.query.id
            getMenuList(this.menuQuery).then(res => {
                this.menuList = res.data.records
                this.changeTitle()
            })
            getBlogPage(this.blogQuery).then(res => {
                this.blogList = res.data.records;
                this.blogQuery.total = res.data.total;
            })
            if(this.$route.query.seo == null) {
                // 添加足迹
                let system = getSystem()
                let browser = getBrowser()
                let se = getSE()
                let from = null
                let keyword = null
                if (se != null && se !== "") {
                    from = se[0]
                    keyword = se[1]
                }
                let message = {
                    "system": system,
                    "browser": browser,
                    "searchEngine": from,
                    "keyword": keyword,
                    "url": location.href,
                    "type": "菜单页"
                }
                addFootprint(message).then()
            }
        },
        //分页
        handleCurrentChange(val) {
            this.blogQuery.current = val;
            this.getData();
        },
        changeTitle() {
            for (let i = 0; i < this.menuList.length; i++) {
                if(this.menuList[i].id == this.blogQuery.menuId) {
                    this.$store.state.blogTitle = this.menuList[i].name
                    this.$store.state.blogDescription = ""
                    this.$store.state.blogTitleShow = true
                    document.title = this.$store.state.blogTitle + " - " + this.$store.state.title
                }
            }
        }
    },
    mounted() {
        this.getData()
    },
    watch:{
        $route(to,from){
            this.blogQuery.menuId = this.$route.query.id
            getBlogPage(this.blogQuery).then(res => {
                this.blogList = res.data.records;
                this.blogQuery.total = res.data.total;
            })
            this.changeTitle()
        }
    }
}
</script>

<style lang="scss">
@include themeify {
    .menu-list {
        padding-left: 0;
    }
    .menu-item {
        display: inline;
        font-size: 14px;
        position: relative;
        padding: 6px;
        line-height: 1.42857143;
        text-decoration: none;
        box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.9);
        background-color: $p-background-color;
        margin-left: 6px;
        cursor: pointer;
        color: $p-background-color-difference;
        border-radius: 4px;
    }
    .menu-item > a {
        color: $p-background-color-difference;
        text-decoration: none;
    }
}
</style>
