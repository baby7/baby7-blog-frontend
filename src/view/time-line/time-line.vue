<template>
    <div>
        <TimeLine :time-line="timeLine"/>
    </div>
</template>

<script>
import TimeLine from "@/components/time-line/time-line"
import {getBlogPage} from "@/api/blog";
import { addFootprint } from "@/api/footprint";
import { getSystem,getBrowser,getSE } from "@/util/message";

export default {
    name: "time-line",
    components: {
        TimeLine
    },
    data() {
        return {
            query: {
                current: 1,
                size: 999
            },
            timeLine: []
        }
    },
    methods: {
        // 获取数据
        getData() {
            getBlogPage(this.query).then(res => {
                this.timeLine = res.data.records;
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
                    "type": "时间线页"
                }
                getSystem(addFootprint, message)
            }
        }
    },
    mounted() {
        this.getData()
        this.$store.state.blogTitle = "时间线"
        this.$store.state.blogDescription = ""
        this.$store.state.blogTitleShow = true
        document.title = this.$store.state.blogTitle + " - " + this.$store.state.title
    }
}
</script>

<style scoped>

</style>
