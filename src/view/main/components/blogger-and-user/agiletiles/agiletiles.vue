<template>
    <div class="content-real">
        <div>
            <span class="avatar">
                <a target="_blank" href="https://www.agiletiles.com/">
                    <img src="https://cdn.baby7blog.com/agiletiles/promotional.png" style="object-fit: cover;" alt="avatar">
                </a>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: "AgileTiles",
    props: {
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
        margin: 5px;
        border-radius: 4px;
        height: 97px;
        line-height: 97px;
    }
    .avatar > a > img {
        display: block;
        height: 100%;
        vertical-align: middle;
        line-height: 35px;
        border-radius: 4px;
    }
}
</style>
