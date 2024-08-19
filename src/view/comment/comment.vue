<template>
    <div>
        <Comment blog-id="0" :markdown-theme="markdownTheme"/>
    </div>
</template>

<script>
import Comment from "@/components/comment/comment"
import { addFootprint } from "@/api/footprint";
import { getSystem,getBrowser,getSE } from "@/util/message";

export default {
    name: "comment",
    components: {
        Comment
    },
    data() {
        return {
            markdownTheme: "black-dark"
        }
    },
    methods: {
        getData(){
            this.ChangeMarkdownTheme()
            if(this.$route.query.seo == null) {
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
                    "type": "留言页"
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
        this.getData()
        this.$store.state.blogTitle = "留言板"
        this.$store.state.blogDescription = "可以在这里留言加友链哦(*^▽^*)"
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
