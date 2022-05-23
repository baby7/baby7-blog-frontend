<template>
    <div>
        <template>
          <router-link class="label-link" to="/label">
                <span class="label-item" style="background-color:#E355CD">
                  全部
                </span>
          </router-link>
        </template>
        <template
            v-for="(label,index) in labelList">
          <router-link class="label-link" :to="'/label?id='+label.id">
                <span
                    class="label-item"
                    :style="'background-color:'+getColor(index)">
                  {{label.label}}
                </span>
          </router-link>
        </template>
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
import {getLabelPage} from '@/api/label'
import {getBlogPage} from "@/api/blog";
import { addFootprint } from "@/api/footprint";
import { getSystem,getBrowser,getSE } from "@/util/message";

export default {
    name: "label",
    components: {
        BlogList,
        Pagination
    },
    data() {
        return {
            labelQuery: {
                current: 1,
                size: 999
            },
            blogQuery: {
                current: 1,
                size: 10
            },
            labelList: [],
            colorList: [
                "#409eff",
                "#67C23A",
                "#E6A23C",
                "#F56C6C",
                "#E355CD",
            ],
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
            getLabelPage(this.labelQuery).then(res => {
                this.labelList = res.data.records
                this.changeTitle()
            })
            this.blogQuery.labelId = this.$route.query.id
            getBlogPage(this.blogQuery).then(res => {
                this.blogList = res.data.records;
                this.blogQuery.total = res.data.total;
            })
            if(this.$route.query.seo == null) {
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
                    "type": "标签页"
                }
                getSystem(addFootprint, message)
            }
        },
        getColor(index){
            return this.colorList[index%this.colorList.length];
        },
        //分页
        handleCurrentChange(val){
            this.blogQuery.current = val;
            this.getData();
        },
        changeTitle() {
            let labelAllState = true
            for (let i = 0; i < this.labelList.length; i++) {
                if(this.labelList[i].id == this.blogQuery.labelId) {
                    labelAllState = false
                    this.$store.state.blogTitle = this.labelList[i].label
                    this.$store.state.blogDescription = ""
                    this.$store.state.blogTitleShow = true
                }
            }
            if(labelAllState){
                this.$store.state.blogTitle = "全部标签"
                this.$store.state.blogDescription = ""
                this.$store.state.blogTitleShow = true
            }
            document.title = this.$store.state.blogTitle + " - " + this.$store.state.title
        }
    },
    mounted() {
        this.getData()
    },
    watch:{
        $route(to,from){
            this.blogQuery.labelId = this.$route.query.id
            getBlogPage(this.blogQuery).then(res => {
                console.log(res.data)
                this.blogList = res.data.records;
                this.blogQuery.total = res.data.total;
            })
            this.changeTitle()
        }
    }
}
</script>

<style scoped>

</style>
