<template>
    <div class="blog-content">
        <div class="content-real">
            <!-- markdown博客 -->
            <MarkdownPreview :initialValue="blogContent.content" :theme="markdownTheme"/>
            <!-- 转载声明 -->
            <TransferStatement/>
        </div>
        <div class="content-real">
            <BlogInfo :blog-content="blogContent"/>
        </div>
        <Comment v-if="$route.query.id" :blog-id="$route.query.id" :markdown-theme="markdownTheme"/>
    </div>
</template>

<script>
import TransferStatement from "@/view/blog/transfer-statement/transfer-statement";
import MarkdownPreview from '@/components/markdown/preview';
import BlogInfo from "@/view/blog/blog-info/blog-info";
import Comment from "@/components/comment/comment"
import { getBlog,look } from "@/api/blog";
import { addFootprint } from "@/api/footprint";
import { getSystem,getBrowser,getSE } from "@/util/message";
import {judgeSpider} from "@/util/seo";

export default {
    name: "blog",
    components: {
        BlogInfo,
        TransferStatement,
        MarkdownPreview,
        Comment
    },
    data() {
        return {
            blogContent: {},
            markdownTheme: "black-dark",
            spider: true
        }
    },
    methods: {
        getData(){
            this.ChangeMarkdownTheme()
            let blogId = this.$route.params.blogId;
            if (blogId == null) {
                blogId = this.$route.query.id
            }
            getBlog(blogId).then(res => {
                this.blogContent = res.data;
                this.blogContent.content = this.getContent(this.blogContent.content)
                this.$store.state.blogTitle = this.blogContent.title
                this.$store.state.blogDescription = this.blogContent.introduce
                this.$store.state.blogTitleShow = true
                document.title = this.$store.state.blogTitle + " - " + this.$store.state.title
            })
            if(!this.spider) {
                // 添加浏览记录
                look({id:blogId}).then()
                // 添加足迹
                let se = getSE()
                let from = null
                let keyword = null
                if (se != null && se !== "") {
                    from = se[0]
                    keyword = se[1]
                }
                let message = {
                    "searchEngine": from,
                    "keyword": keyword,
                    "url": location.href,
                    "blogId": blogId,
                    "type": "博客"
                }
                getSystem(addFootprint, message, new Browser())
            }
        },
        ChangeMarkdownTheme(){
            localStorage.setItem("baby7-style", "black"); //暂时写死黑色
            if(localStorage.getItem("baby7-style") === "light"){
                this.markdownTheme = "light"
            }
            else {
                this.markdownTheme = "black-dark"
            }
        },
        getContent(content) {
            let changeContent = ""
            let labelCodeBool = false
            content.trim().split('\n').forEach(function(v, i) {
                if(v.indexOf("```") != -1) {
                    labelCodeBool = !labelCodeBool
                }
                if(labelCodeBool){
                    changeContent = changeContent + "\n" + v
                }
                else {
                    changeContent = changeContent + "\n\n" + v
                }
            })
            return changeContent
        }
    },
    mounted() {
        this.spider = judgeSpider()
        this.getData()
    },
    computed: {
        isFollow () {
            return this.$store.state.themeChange;   //需要监听的数据
        }
    },
    watch: {
        isFollow (newVal, oldVal) {
            this.ChangeMarkdownTheme()
        },
        $route(to,from){
            this.getData()
        }
    }
}
</script>

<style lang="scss">
.blog-content {
    //max-width: 740px;
    margin: 0 auto;
    //padding: 2rem 2.5rem;
}
.rich-text {
    padding: 10px;
}
</style>
