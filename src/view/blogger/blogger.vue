<template>
    <div class="content-real">
        <MarkdownPreview :initialValue="blogger.blogger" :theme="markdownTheme"/>
    </div>
</template>

<script>
import MarkdownPreview from '@/components/markdown/preview';
import { getBlogger } from "@/api/setting";
import { addFootprint } from "@/api/footprint";
import { getSystem,getBrowser,getSE } from "@/util/message";

export default {
    name: "blogger",
    components: {
        MarkdownPreview,
        Comment
    },
    data() {
        return {
            blogger: {},
            markdownTheme: "black-dark"
        }
    },
    methods: {
        getData(){
            this.ChangeMarkdownTheme()
            getBlogger().then(res => {
                this.blogger = res.data;
            })
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
                    "type": "博主页"
                }
                getSystem(addFootprint, message, new Browser())
            }
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
        this.$store.state.blogTitle = "博主信息"
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
