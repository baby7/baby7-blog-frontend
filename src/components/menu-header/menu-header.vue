<template>
    <div class="nav">
        <div class="nav-a">
            <ul class="nav-a-ul">
                <li class="nav-style-li">
                    <StyleChange/>
                </li>
                <li class="nav-search-li">
                    <BlogSearch :items="blogList"/>
                </li>
                <li class="nav-a-li" :class="classA === index ? 'active' : '' " @click="selected(index)"
                    v-for="(item,index) in configNav">
                    <router-link v-if="item.path.substring(0,1) === '/'" :to='item.path' class="nav-a-text"
                                 @click="showToggle(index)">
                        {{ item.subItems ? item.name + '▾' : item.name }}
                    </router-link>
                    <a v-if="item.path.substring(0,1) !== '/'" :href='item.path' class="nav-a-text"
                       @click="showToggle(index)">
                        {{ item.subItems ? item.name + '▾' : item.name }}
                    </a>
                    <ul v-if="item.subItems" class="menu_ul" :class="{'active' :index===isShow}">
                        <li class="menu_li" v-for="nav in item.subItems" :class="classB === nav ? 'active' : '' "
                            @click="menuselected(nav)">
                            <router-link v-if="item.path === '/'" class="menu_ul_text" :to="nav.link"
                                         :class="{'active':nav.link === linkClick}"
                                         @click="treeNavSwitch(nav)">{{ nav.text }}
                            </router-link>
                            <a v-if="item.path !== '/'" class="menu_ul_text" :href="nav.link"
                               :class="{'active':nav.link === linkClick}"
                               @click="treeNavSwitch(nav)">{{ nav.text }}
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import BlogSearch from "@/components/blog-search/blog-search";
import StyleChange from "@/components/style-change/style-change";

import {getBlogList} from "@/api/blog";

export default {
    name: "MenuHeader",
    components: {StyleChange, BlogSearch},
    props: {
        configNav: {
            type: Array,
            require: true
        }
    },
    data() {
        return {
            show: false,
            classA: 0,
            classB: 0,
            isShow: 0,
            linkClick: "",
            blogList: []
        }
    },
    methods: {
        getData() {
            getBlogList().then(res => {
                this.blogList = res.data;
            })
        },
        selected: function (index) {
            this.classA = index;
        },
        menuselected: function (nav) {
            this.classB = nav;
        },
        showToggle: function (index) {
            this.isShow = index;
        },
        treeNavSwitch: function (nav) {
            this.linkClick = nav.link;
        }
    },
    mounted() {
        this.getData()
    }
}
</script>

<style lang="scss">
@include themeify {
    .nav {
        height: auto;
        position: absolute;
        border-bottom: none;
        right: 2rem;
    }

    .nav-a {
        cursor: pointer;
        float: left;
        letter-spacing: 4px;
        position: relative;
    }

    .nav-a-ul {
        list-style: none;
        margin: 0;
    }

    .nav-a-li {
        display: inline-block;
        margin-left: 30px;
        line-height: 2rem;
    }

    .nav-search-li {
        display: inline-block;
        margin-left: 30px;
        line-height: 2rem;
    }

    .nav-style-li {
        display: inline-block;
        margin-left: 30px;
        line-height: 2rem;
    }

    .nav-a-text {
        font-size: 14px;
        color: $p-background-color-extreme;
        text-decoration: none;
    }

    .menu_ul {
        list-style: none;
        background: $p-background-color;
        border-radius: 3px;
        z-index: 999;
        position: absolute;
        display: none;
        padding: 15px;
        margin-left: -20px;
        box-shadow: $p-color-box-shadow-start 0 2px 4px, $p-color-box-shadow-end 0 0 6px;
    }

    .menu_li {
        height: 30px;
        line-height: 30px;
    }

    /** 二级菜单 */
    .menu_ul_text {
        font-size: 14px;
        color: $p-background-color-extreme;
        letter-spacing: 0;
        line-height: 30px;
        text-decoration: none;
    }

    /** 菜单下划线 */
    .nav-a-li:hover {
        border-bottom: 2px solid $p-color-text;
    }

    /** 菜单下划线(active状态) */
    .nav-a-li.active {
        border-bottom: 2px solid $p-color-text;
    }

    /** 菜单鼠标在上状态 */
    .nav-a-li:hover > .nav-a-text {
        color: $p-color-text;
    }

    /** 菜单(active状态) */
    .nav-a-li.active > a {
        color: $p-color-text;
    }

    .nav-a-li:hover .menu_ul {
        display: block;
    }

    .menu_ul_text:hover {
        color: $p-color-text;
    }

    .menu_li.active .menu_ul_text {
        color: $p-color-text;
    }
  @media all and (orientation : portrait) {
    .nav-a-li {
      display: none;
    }
  }
}
</style>
