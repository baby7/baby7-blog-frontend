<template>
    <div class="content-real">
        <!-- 标题 -->
        <span class="right-label-title">
          &nbsp;◈&nbsp;友链
        </span>
        <span class="add-user">
          <router-link class="blog-link" :to="'/friendLink.html'">
            +友链
          </router-link>
        </span>
        <!-- 分隔 -->
        <hr class="title-line-right">
        <!-- 链接表 -->
        <div>
            <span class="link-item" v-for="link in linkList">
                <img v-if="!spider" :src="link.logo" class="link-img" alt="link.name">
                <a :href="link.url" target="_blank">{{link.title}}</a>
            </span>
        </div>
    </div>
</template>

<script>

import {judgeSpider} from "@/util/seo";

export default {
    name: "Link",
    data() {
        return {
            spider: true
        };
    },
    props: {
        linkList: {
            type: Array,
            require: true
        }
    },
    mounted() {
        this.spider = judgeSpider()
    },
}
</script>

<style lang="scss">
@include themeify {
    .link-item {
        vertical-align: middle;
        margin: 4px 0px 4px 0px;
        padding: 4px 8px;
        display: inline-block;
        cursor: pointer;
        border-radius: 0.25rem;
        line-height: 13px;
    }

    .link-item:hover > a {
        border-bottom: 2px solid $p-color-text;
    }

    .link-item > a {
        margin-left: 5px;
        color: $p-color-text;
        text-decoration: none;
    }

    .add-user {
      float:right;
    }
    .add-user > a {
      color: $p-color-text;
    }
    .add-user > a:hover {
      border-bottom: 1px solid $p-color-text;
    }
}

.link-td {
    padding: 8px;
    line-height: 1.42857143;
    vertical-align: top;
    text-align: left;
    border-top: 0px solid #ddd;
    color: #5b9dce;
    font-size: 18px;
}

.link-img {
    float: left;
    max-width: 16px;
}

.title-line-right {
    margin-bottom: 5px;
}
</style>
