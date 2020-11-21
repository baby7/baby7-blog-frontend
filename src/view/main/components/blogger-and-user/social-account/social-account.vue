<template>
    <div class="content-real">
        <!-- 标题 -->
        <span class="right-label-title"><i class="el-icon-link"></i>&nbsp;社交</span>
        <!-- 分隔 -->
        <hr class="title-line-right">
        <!-- 链接表 -->
        <div>
            <template v-for="socialAccount in socialAccounts">
                <div class="friend-link-item">
                    <img class="friend-link-img" :src="socialAccount.icon" :alt="socialAccount.type+'图标'">
                    <div class="popup-window-wrapper">
                        <div class="popup-window">
                            <div class="info">
                                <img class="friend-link-qr" :src="socialAccount.qr" :alt="socialAccount.type+'二维码'">
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: "SocialAccount",
    props: {
        socialAccounts: {
            type: Array,
            require: true
        }
    },
}
</script>

<style lang="scss">
.friend-link-item {
    position: relative;
    vertical-align: middle;
    line-height: 20px;
    display: inline-block;
    cursor: pointer;
    border-radius: .25rem;
    font-size: 13px;
    box-shadow: var(--box-shadow);
    transition: all .5s;
}
.friend-link-img {
    width: 100px;
    right: 100px;
    margin-left: 20px;
}
.friend-link-qr {
    width: 150px;
    border-radius: 15px;
    border: 2px solid #777;
}
.popup-window {
    position: absolute;
    display: flex;
    background: var(--background-color);
    box-shadow: var(--box-shadow);
    border-radius: .25rem;
    box-sizing: border-box;
    padding: .8rem 1rem;
    width: 300px;
    left: -1rem;
    top: 3.5rem;
}
.popup-window-wrapper {
    display: none;
}
.friend-link-item:hover .popup-window-wrapper {
    display: block;
}
</style>
