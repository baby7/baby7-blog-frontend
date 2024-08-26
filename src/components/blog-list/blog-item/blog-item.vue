<template>
    <div>
        <div>
            <section class="el-container">
                <section class="el-container">
                    <!-- 图片信息展示 -->
                    <aside class="el-aside phone-adapt" style="width:220px;">
                        <img class="blog_item_img" :src="blog.img == null ? defaultBlogImg : blog.img"
                             :alt="blog.title">
                    </aside>
                    <!-- 文字内容展示 -->
                    <main class="el-main el-menu-item-blog">
                        <!-- 标题 -->
                        <h2 class="blog_item_title">
                            <router-link :to="'/myBlog/' + blog.id + '.html'" :title="blog.title">
                                {{ blog.title }}
                            </router-link>
                        </h2>
                        <!-- 介绍 -->
                        <div class="blog_item_introduce">
                            <span>{{ blog.introduce }}</span>
                        </div>
                        <!-- 创建时间 -->
                        <span class="blog-msg-time"><i class="el-icon-time"></i>
                            创建时间：{{ blog.createTime.substring(0, 10) }}
                        </span>
                        <!-- 创建时间 -->
                        <span class="blog-msg-look"><i class="el-icon-time"></i>
                            浏览量：{{ blog.lookNum }}
                        </span>
                    </main>
                </section>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    name: "BlogItem",
    props: {
        blog: {
            type: Object,
            require: true
        }
    },
    data() {
        return {
            defaultBlogImg: this.$store.state.defaultBlogImg
        }
    }
}
</script>

<style lang="scss">
@include themeify {
    /*博客图片*/
    .blog_item_img {
        width: 89%;
        right: auto;
        margin: 8px 8px 8px 8px;
        border-radius: 5px;
        box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.3);
        opacity: $p-img-opacity;
    }

    /*文字样式*/
    .blog_item_title {
        font-size: 1.28rem;
        margin-bottom: 0;
    }

    /*文字样式*/
    .blog_item_title > a {
        color: $p-color-title;
        text-decoration: none;
    }

    .blog_item_title > a:hover {
        border-bottom: 2px solid $p-color-text;
    }

    /*文字内容展示块*/
    .el-menu-item-blog {
        position: relative;
    }

    /*介绍*/
    .blog_item_introduce {
        margin-top: 1%;
        margin-bottom: 10%;
        color: $p-background-color-difference;
    }

    /*博客信息块-时间*/
    .blog-msg-time {
        position: absolute;
        bottom: 10%;
        color: $p-background-color-difference;
    }

    /*博客信息块-浏览量*/
    .blog-msg-look {
        position: absolute;
        right: 5%;
        bottom: 10%;
        color: $p-background-color-difference;
    }

    /*阅读全文按钮*/
    .blog-button {
        position: absolute;
        bottom: 7%;
        right: 5%;
    }

    .el-main {
        display: block;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        flex-basis: auto;
        overflow: auto;
        box-sizing: border-box;
        padding: 0 10px 10px;
    }

    .el-aside {
        overflow: auto;
        box-sizing: border-box;
        flex-shrink: 0;
    }

    .el-container {
        display: flex;
        -webkit-box-orient: horizontal;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        flex-basis: auto;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        min-width: 0;
    }
    @media all and (orientation : portrait) {
        .blog-msg-time {
            display: none;
        }
        .blog-msg-look {
            display: none;
        }
    }
}
</style>
