<template>
    <div class="blog-content">
        <div class="content-real">
            <!-- markdown说明 -->
            <MarkdownPreview :initialValue="content" :theme="markdownTheme"/>
        </div>
        <Comment blog-id="-1" :markdown-theme="markdownTheme"/>
    </div>
</template>

<script>
import Comment from "@/components/comment/comment"
import { addFootprint } from "@/api/footprint";
import { judgeSpider }      from "@/util/seo"
import { getSystem,getBrowser,getSE } from "@/util/message";
import MarkdownPreview from "@/components/markdown/preview";
import TransferStatement from "@/view/blog/transfer-statement/transfer-statement.vue";

export default {
    name: "friendLink",
    components: {
        TransferStatement, MarkdownPreview,
        Comment
    },
    data() {
        return {
            markdownTheme: "black-dark",
            spider: true,
            content: "> # 交换友链\n\n请在下方评论区填写您博客的简介，格式可以像下面这样：\n\n```text\n站点名称：七仔的博客\n站点域名：https://www.baby7blog.com\n站点简介：主要记录自己在写程序过程中的发现、问题、成果\n站点图标：https://www.baby7blog.com/favicon.ico\n```"
        }
    },
    methods: {
        getData(){
            this.ChangeMarkdownTheme()
            if(!this.spider) {
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
                    "type": "友链页"
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
        }
    },
    mounted() {
        this.spider = judgeSpider()
        this.getData()
        this.$store.state.blogTitle = "友链留言"
        this.$store.state.blogDescription = "可以在这里留言申请友链哦(*^▽^*)"
        this.$store.state.blogTitleShow = true
        document.title = this.$store.state.blogTitle + " - " + this.$store.state.title
    },
    computed: {
        isFollow () {
            return this.$store.state.themeChange;　　//需要监听的数据
        }
    },
    watch: {
        isFollow (newVal, oldVal) {
            this.ChangeMarkdownTheme()
        }
    }
}
</script>

<style scoped>

</style>
