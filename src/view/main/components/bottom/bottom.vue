<template>
    <footer class="footer-content">
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
    </footer>
</template>

<script>
export default {
    name: "Bottom",
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
        }
    }
}
</script>

<style lang="scss">
@include themeify {
    .footer-content {
        color: $p-color-text;
        border-top: 2px solid $p-color-border;
        padding: 1rem;
        text-align: center;
        font-size: 14px;
        span {
            a {
                color: $p-color-text;
                text-decoration:none;
            }
        }
    }
    .footer-item {
        margin-left: 15px;
    }
}
</style>
