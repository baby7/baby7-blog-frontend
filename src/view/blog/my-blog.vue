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
            markdownTheme: "black-dark"
        }
    },
    methods: {
        getData(){
            this.ChangeMarkdownTheme()
            getBlog(this.$route.query.id).then(res => {
                this.blogContent = res.data;
                this.blogContent.content = this.getContent(this.blogContent.content)
                this.$store.state.blogTitle = this.blogContent.title
                this.$store.state.blogDescription = this.blogContent.introduce
                this.$store.state.blogTitleShow = true
                document.title = this.$store.state.blogTitle + " - " + this.$store.state.title
            })
            if(this.$route.query.seo == null) {
                // 添加浏览记录
                look({id:this.$route.query.id}).then()
                // 添加足迹
                let system = getSystem()
                let browser = getBrowser()
                let se = getSE()
                let from = null
                let keyword = null
                if (se != null && se !== "") {
                    from = se[0]
                    keyword = se[1]
                }
                let message = {
                    "system": system,
                    "browser": browser,
                    "searchEngine": from,
                    "keyword": keyword,
                    "url": location.href
                }
                addFootprint(message).then()
            }
        },
        ChangeMarkdownTheme(){
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
