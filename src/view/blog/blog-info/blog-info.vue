<template>
    <div class="blog-main-info">
        <!-- 时间及标签 -->
        <div class="blog-infos">
            <p>发布时间：{{ formatTime(blogContent.createTime) }}</p>
            <p>最后更新：{{ formatTime(blogContent.updateTime) }}</p>
            <p>浏览量：{{ blogContent.lookNum }}</p>
            <p>
                标签：
                <span v-for="label in blogContent.labelList" style="margin-right: 10px">
                    <router-link
                        :to="'/label/' + label.id + '.html'"
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
                        <router-link class="blog-link" :to="'/myBlog/' + blogContent.prev.id + '.html'">
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
                        <router-link class="blog-link" :to="'/myBlog/' + blogContent.next.id + '.html'">
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
        },
        methods: {
            formatTime(timeString) {
                if (!timeString) return '未知时间';
                // 先替换空格，再替换连字符
                return timeString.replace(" ", "日 - ").replace("-", "年").replace("-", "月");
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
        color: $p-background-color-difference;
    }
    .blog-prev {
        height: 100%;
        float: left;
        position: relative;
        width: 49%;
        border-right: 1px dashed #555;
        color: $p-background-color-difference;
    }
    .blog-next {
        float: right;
        position: relative;
        width: 49%;
        text-align: right;
        color: $p-background-color-difference;
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
