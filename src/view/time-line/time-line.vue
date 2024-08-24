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
import {judgeSpider} from "@/util/seo";

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
            timeLine: [],
            spider: true
        }
    },
    methods: {
        // 获取数据
        getData() {
            getBlogPage(this.query).then(res => {
                this.timeLine = res.data.records;
            })
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
                    "type": "时间线页"
                }
                getSystem(addFootprint, message, new Browser())
            }
        }
    },
    mounted() {
        this.spider = judgeSpider()
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
