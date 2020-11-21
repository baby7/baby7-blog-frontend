<template>
    <div>
        <Comment blog-id="0" :markdown-theme="markdownTheme"/>
    </div>
</template>

<script>
import Comment from "@/components/comment/comment"

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
        },
        ChangeMarkdownTheme(){
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
        this.$store.state.blogDescription = ""
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
