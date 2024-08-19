<template>
    <div class="blog-main-info">
        <!-- 时间及标签 -->
        <div class="blog-infos">
            <p>发布时间：{{ blogContent.createTime.replace("-", "年").replace("-", "月").replace(" ", "日 - ") }}</p>
            <p>最后更新：{{ blogContent.updateTime.replace("-", "年").replace("-", "月").replace(" ", "日 - ") }}</p>
            <p>
                标签：
                <span v-for="label in blogContent.labelList" style="margin-right: 10px">
                    <router-link
                        :to="'/label?id=' + label.id"
                        class="label"
                    style="text-decoration: none;">
                        <span style="color: #3F86E8">{{ label.label }}</span>
                    </router-link>
                </span>
            </p>
        </div>
        <!-- 上一篇和下一篇 -->
        <div class="blog-links">
            <div class="blog-prev">
                <p style="margin-top: 2rem">上一篇</p>
                <p>
                    <template v-if="blogContent.prev">
                        <router-link class="blog-link" :to="'/myBlog?id=' + blogContent.prev.id">
                            {{blogContent.prev.title}}
                        </router-link>
                    </template>
                    <template v-if="!blogContent.prev">
                        <span>没有了</span>
                    </template>
                </p>
            </div>
            <div class="blog-next">
                <p style="margin-top: 2rem">下一篇</p>
                <p>
                    <template v-if="blogContent.next">
                        <router-link class="blog-link" :to="'/myBlog?id=' + blogContent.next.id">
                            {{blogContent.next.title}}
                        </router-link>
                    </template>
                    <template v-if="!blogContent.next">
                        <span>没有了</span>
                    </template>
                </p>
            </div>
        </div>
        <!-- 分享博客 -->
<!--        <div class="blog-share">-->
<!--            <p>-->
<!--                asdfasdf-->
<!--            </p>-->
<!--        </div>-->
    </div>
</template>

<script>
    export default {
        name: "BlogInfo",
        props:{
            blogContent:{
                type: Object,
                require: true
            }
        }
    }
</script>

<style lang="scss">
@include themeify {
    .blog-main-info {
        padding: 10px;
    }
    .blog-infos {
        padding-bottom: 10px;
    }
    .blog-prev {
        height: 100%;
        float: left;
        position: relative;
        width: 49%;
        border-right: 1px dashed #555;
    }
    .blog-next {
        float: right;
        position: relative;
        width: 49%;
        text-align: right;
    }
    .blog-link {
        color: $p-color-title;
        text-decoration: none;
    }
    .blog-links {
        height: 7rem;
        border-bottom: 1px dashed #555;
        border-top: 1px dashed #555;
    }
}
</style>
