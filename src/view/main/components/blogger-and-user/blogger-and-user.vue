<template>
    <div id="app" class="blogger-and-user">
        <!-- 博主模块 -->
        <Blogger :bloggerData="settingData"/>
        <!-- 社交模块 -->
        <SocialAccount v-if="settingData.socialAccounts" :social-accounts="settingData.socialAccounts"/>
        <!-- 标签模块 -->
        <Label :labelList="labelList"/>
        <!-- 友链模块 -->
        <Link :link-list="linkList"/>
    </div>
</template>

<script>
    import Blogger from "@/view/main/components/blogger-and-user/blogger/blogger";
    import SocialAccount from "@/view/main/components/blogger-and-user/social-account/social-account";
    import Label from "@/view/main/components/blogger-and-user/label/label";
    import Link from "@/view/main/components/blogger-and-user/link/link";
    import { getLabelPage } from '@/api/label'
    import { getLinkList } from '@/api/link'

    export default {
        name: "BloggerAndUser",
        components: {
            Blogger,
            SocialAccount,
            Link,
            Label
        },
        props:{
            settingData:{
                type: Object,
                require: true
            }
        },
        data() {
            return {
                linkList: [],
                labelList: []
            }
        },
        methods:{
            // 获取数据
            getData() {
                getLabelPage({current: 1, size: 16}).then(res => {
                    this.labelList = res.data.records
                })
                getLinkList({current: 1, size: 20}).then(res => {
                    this.linkList = res.data.records
                })
            }
        },
        mounted() {
            this.getData()
        }
    }
</script>

<style scoped>
    .blogger-and-user {
    }
</style>
