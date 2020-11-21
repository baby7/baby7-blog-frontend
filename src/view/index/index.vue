<template>
    <div>
        <BlogList :blog-list="blogList"/>
        <Pagination
            :page-index="query.current"
            :total="query.total"
            :page-size="query.size"
            @change="handleCurrentChange">
        </Pagination>
    </div>
</template>

<script>
import BlogList from "@/components/blog-list/blog-list"
import Pagination from "@/components/pagination/pagination"

import {getBlogPage} from "@/api/blog"

export default {
    name: "index",
    components: {
        BlogList,
        Pagination
    },
    data() {
        return {
            query: {
                current: 1,
                size: 10,
                total: 0
            },
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
            getBlogPage(this.query).then(res => {
                this.blogList = res.data.records;
                this.query.total = res.data.total;
            })
        },
        //分页
        handleCurrentChange(val) {
            this.query.current = val;
            this.getData();
        }
    },
    mounted() {
        this.getData()
        this.$store.state.blogTitleChange = !this.$store.state.blogTitleChange
    }
}
</script>

<style scoped>

</style>
