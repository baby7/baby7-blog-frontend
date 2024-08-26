<template>
    <footer class="footer-content">
        <div>
            <span>
                <a href="https://www.baby7blog.com" target="blank" rel="nofollow">
                    Power by baby7-blog
                </a>
            </span>
                <span class="footer-item">
                Copyright©{{ getCopyrightDate() }}
            </span>
                <span class="footer-item">
                <a :href="recordUrl" target="blank" rel="nofollow">
                    {{recordNumber}}
                </a>
            </span>
        </div>
        <div>
            <span class="footer-item">
                博客总浏览量：{{lookCount}}
            </span>
            <span class="footer-item">
                博客总篇数：{{blogCount}}
            </span>
        </div>
        <div>
            <span class="footer-item">
                <a href='/feed' target="_blank">
                    RSS订阅
                </a>
            </span>
        </div>
    </footer>
</template>

<script>
import { getLookCount } from '@/api/setting'

export default {
    name: "Bottom",
    data() {
        return {
            lookCount: 0,
            blogCount: 0,
        };
    },
    props:{
        recordUrl:{
            type: String,
            require: true
        },
        recordNumber:{
            type: String,
            require: true
        },
        createTime:{
            type: String,
            require: true
        }
    },
    methods: {
        getCopyrightDate(){
            if(this.createTime != null){
                if(this.createTime.substring(0, 4) === String(new Date().getFullYear())){
                    return new Date().getFullYear();
                }
                return  this.createTime.substring(0, 4) + " - " + new Date().getFullYear()
            }
            return new Date().getFullYear() + ""
        },
        getData() {
            getLookCount().then(res => {
                this.lookCount = res.data.lookCount
                this.blogCount = res.data.blogCount
            })
        }
    },
    mounted() {
        this.getData()
    }
}
</script>

<style lang="scss">
@include themeify {
    .footer-content {
        color: $p-color-text;
        border-top: 2px solid $p-color-border;
        padding: 0.8rem;
        text-align: center;
        font-size: 14px;
        div {
            margin-top: 2px;
            margin-bottom: 2px;
            span {
                a {
                    color: $p-color-text;
                    text-decoration:none;
                }
            }
        }
    }
    .footer-item {
        margin-left: 15px;
    }
}
</style>
