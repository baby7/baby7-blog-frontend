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
import { addFootprint } from "@/api/footprint";
import { getSystem,getBrowser,getSE } from "@/util/message";

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
            ],
            footprint: false
        }
    },
    methods: {
        // 获取数据
        getData() {
            getBlogPage(this.query).then(res => {
                this.blogList = res.data.records;
                this.query.total = res.data.total;
            })
            if(this.$route.query.seo == null && this.footprint === false) {
                this.footprint = true
                // 添加足迹
                let browser = getBrowser()
                let se = getSE()
                let from = null
                let keyword = null
                if (se != null && se !== "") {
                    from = se[0]
                    keyword = se[1]
                }
                let message = {
                    "browser": browser,
                    "searchEngine": from,
                    "keyword": keyword,
                    "url": location.href,
                    "type": "主页"
                }
                getSystem(addFootprint, message)
            }
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
