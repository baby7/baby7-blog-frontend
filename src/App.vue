<template>
    <div class="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'app',
    created() {
      localStorage.setItem("baby7-style", "black"); //暂时写死黑色
        if(localStorage.getItem("baby7-style") === "light"){
            this.$plain.changeTheme("default")
            document.getElementById('css').href = 'static/css/scroll-bar-light.css'
        }
        else {
            this.$plain.changeTheme("black")
            document.getElementById('css').href = 'static/css/scroll-bar-black.css'
        }
    }
}
</script>

<style lang="scss">
@include themeify {
    .app {
        font-family: $p-font-family;
        background-color: $p-background-color;
    }
}
</style>
