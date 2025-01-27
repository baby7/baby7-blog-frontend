<template>
    <div v-if="!spider" class="content-real">
        <!-- 标题 -->
        <span class="right-label-title">&nbsp;◈&nbsp;社交</span>
        <!-- 分隔 -->
        <hr class="title-line-right">
        <!-- 链接表 -->
        <div style="display:flex;justify-content:center;">
            <template v-for="socialAccount in socialAccounts">
                <div class="friend-link-item">
                    <img class="friend-link-img" :src="socialAccount.icon + imgSuffix" :alt="socialAccount.type+'图标'">
                    <div class="popup-window-wrapper">
                        <div class="popup-window">
                            <div class="info">
                                <img class="friend-link-qr" :src="socialAccount.qr + imgSuffix" :alt="socialAccount.type+'二维码'">
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import {judgeSpider} from "@/util/seo";
const imgSuffix = "-to75.webp";

export default {
    name: "SocialAccount",
    data() {
        return {
            spider: true,
            imgSuffix: imgSuffix,
        };
    },
    props: {
        socialAccounts: {
            type: Array,
            require: true
        }
    },
    mounted() {
        this.spider = judgeSpider()
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
    margin-left: 15px;
    margin-right: 15px;
}
.friend-link-img {
    width: 80px;
    right: 100px;
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
