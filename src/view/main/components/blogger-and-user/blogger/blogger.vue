<template>
    <div class="content-real">
        <div>
            <span class="avatar">
                <img :src="bloggerData.avatar" style="object-fit: cover;" alt="avatar">
            </span>
            <div class="blogger-text">
                <router-link to="/myself" class="blogger-text-title">{{ bloggerData.nickname }}</router-link><br>
                <span>{{ bloggerData.describe }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Blogger",
    props: {
        bloggerData: {
            type: Object,
            require: true
        }
    }
}
</script>

<style lang="scss">
@include themeify {
    .content-real {
        margin-bottom: 15px;
        padding: 5px 5px 5px 5px;
        //background-color: $p-background-color;
        background-color: #949aad1f;
        //overflow: hidden;
        border-radius: .25rem;
        box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.9);
        box-sizing: border-box;
        transition: all .3s;
        color: $p-background-color-extreme;
    }
    .content-real:hover{
        box-shadow: 0 2px 26px 0 rgba(0, 0, 0, 0.9);
    }
    .avatar {
        display: inline-block;
        box-sizing: border-box;
        text-align: center;
        font-size: 14px;
        margin-top: 5px;
        margin-left: 5px;
        border-radius: 4px;
        height: 100px;
        width: 100px;
        line-height: 100px;
    }
    .avatar > img {
        display: block;
        height: 100%;
        vertical-align: middle;
        line-height: 35px;
        border-radius: 4px;
    }
    .blogger-text {
        float: right;
        margin-top: 5px;
        font-size: 15px;
        width: 55%;
    }
    .blogger-text-title {
        font-size: 20px;
        color: $p-color-text;
        text-decoration: none;
    }
    .blogger-text-title:hover {
        border-bottom: 1px solid $p-color-text;
    }
}
</style>
