<template>
    <div class="button-change">
        <button class="base-button button-black" @click="BlackStyle">黑</button>
        <button class="base-button button-light" @click="LightStyle">白</button>
    </div>
</template>

<script>
export default {
    name: "StyleChange",
    methods: {
        BlackStyle() {
            this.$plain.changeTheme("black")
            document.getElementById('css').href = 'static/css/scroll-bar-black.css'
            localStorage.setItem("baby7-style", "black");
            this.$store.state.themeChange = !this.$store.state.themeChange
        },
        LightStyle() {
            this.$plain.changeTheme("default")
            document.getElementById('css').href = 'static/css/scroll-bar-light.css'
            localStorage.setItem("baby7-style", "light");
            this.$store.state.themeChange = !this.$store.state.themeChange
        }
    }
}
</script>

<style lang="scss">
@include themeify {
    .base-button {
        display: inline-block;
        margin-bottom: 0;
        font-weight: 400;
        text-align: center;
        vertical-align: middle;
        touch-action: manipulation;
        cursor: pointer;
        background-image: none;
        white-space: nowrap;
        line-height: 1.5;
        user-select: none;
        outline: none;
        border: none;
        border-radius: 10px;
        border-left-color: $p-color-box;
        background-color: $p-color-box;
    }
    .button-black {
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
        color: #000000;
    }
    .button-light {
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
        color: #ffffff;
    }
}
</style>
