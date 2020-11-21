<template>
    <div class="content-real">
        <!-- 标题 -->
        <span class="right-label-title"><i class="el-icon-link"></i>&nbsp;友链</span>
        <!-- 分隔 -->
        <hr class="title-line-right">
        <!-- 链接表 -->
        <div>
            <span class="link-item" v-for="link in linkList">
                <img :src="link.logo" class="link-img" alt="link.name">
                <a :href="link.url" target="_blank">{{link.title}}</a>
            </span>
        </div>
    </div>
</template>

<script>

export default {
    name: "Link",
    props: {
        linkList: {
            type: Array,
            require: true
        }
    },
}
</script>

<style lang="scss">
@include themeify {
    .link-item {
        vertical-align: middle;
        margin: 4px 4px 10px;
        padding: 4px 8px;
        display: inline-block;
        cursor: pointer;
        border-radius: .25rem;
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
</style>
