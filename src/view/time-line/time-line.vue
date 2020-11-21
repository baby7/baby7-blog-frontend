<template>
    <div>
        <TimeLine :time-line="timeLine"/>
    </div>
</template>

<script>
import TimeLine from "@/components/time-line/time-line"
import {getBlogPage} from "@/api/blog";

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
