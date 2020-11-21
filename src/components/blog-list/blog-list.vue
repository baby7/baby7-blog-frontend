<template>
    <div>
        <!-- 博客列表 -->
        <div v-for="blog in blogList" class="content-real">
            <BlogItem :blog="blog"/>
        </div>
        <!-- 分页 -->
    </div>
</template>

<script>
import BlogItem from "./blog-item/blog-item"

export default {
    name: "blog-list",
    components: {
        BlogItem
    },
    props: {
        blogList: {
            type: Array,
            require: true
        }
    },
    data() {
        return {
            query: {
                current: 1,
                size: 10
            },
            count: 0,
            isShowBlog: true
        }
    },
}
</script>

<style scoped>

</style>
