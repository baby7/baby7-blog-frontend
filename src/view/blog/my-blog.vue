<template>
    <div class="blog-content">
        <div class="content-real">
            <!-- markdown博客 -->
            <MarkdownPreview v-if="blogContent.type == 1" :initialValue="blogContent.content" :theme="markdownTheme"/>
            <!-- 富文本博客 -->
            <div v-if="blogContent.type != 1" v-html="blogContent.content" class="rich-text"/>
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
                if(this.blogContent.type === 1) {
                    // this.blogContent.content = this.blogContent.content.replaceAll("\n", "\n\n")
                    this.blogContent.content = this.getContent(this.blogContent.content)
                }
                this.$store.state.blogTitle = this.blogContent.title
                this.$store.state.blogDescription = this.blogContent.introduce
                this.$store.state.blogTitleShow = true
                document.title = this.$store.state.blogTitle + " - " + this.$store.state.title
            })
            look({id:this.$route.query.id}).then()
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
            return this.$store.state.themeChange;　　//需要监听的数据
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
