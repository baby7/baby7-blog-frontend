<template>
    <div id="time-line">
        <div class="item" v-for="item in timeLine" :key="item.index">
            <router-link :to="'/blog?id='+item.id">
                <div class="item-content">
                    <span class="time-line-date">
                        {{ item.createTime.substring(0, 10) }}
                    </span>
                        <span class="time-line-title">
                        {{ item.title }}
                    </span>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "TimeLine",
    props: {
        timeLine: {
            type: Array,
            require: true
        }
    },
    data() {
        return {
            items: [
                {
                    createTime: "2020-8-14 13:20:30",
                    title: "开始毕设。。"
                },
                {
                    createTime: "2020-8-15 13:20:30",
                    title: "写前端。。"
                },
                {
                    createTime: "2020-8-16 13:20:30",
                    title: "还在写前端。。"
                },
                {
                    createTime: "2020-8-17 13:20:30",
                    title: "仍在写前端。。"
                },
                {createTime: "2020-8-18 13:20:30", title: "不想写前端。。"},
                {createTime: "2020-8-19 13:20:30", title: "还得写前端。。。。。"}
            ]
        }
    }
}
</script>

<style lang="scss">
@include themeify {
    #time-line {
        margin-left: 10%;
    }
    /** 每一项的样式 */
    .item {
        margin-left: 30px; /*用左边margin显示时间线*/
        width: calc(100% - 30px); /*因为左边部分用于显示时间线，所以右边部分减去30px*/
        height: auto; /*高度由内容决定*/
        position: relative;
        //margin-bottom: 10px;
        cursor: pointer;
    }
    /** "::before"伪元素作出时间线的节点 */
    .item::before {
        content: "";
        width: 8px;
        height: 8px;
        border-radius: 100%;
        //background-color: $p-color-title;
        position: absolute;
        left: -15px;
        top: 25px;
        background-color: $p-background-color;
        border: 1px solid rgba(0, 0, 0, 0.3);
    }
    /** "::after"伪元素作出时间线线段 */
    .item::after {
        content: "";
        width: 3px;
        height: calc(100%);
        background-color: rgba(0, 0, 0, 0.3);
        position: absolute;
        top: 0;
        left: -11px;
        z-index: -1;
    }
    /** 设置content部分换行效果 */
    .item-content {
        width: 100%;
        height: auto; /*由内容决定*/
        position: relative;
        padding-top: 20px;
        padding-bottom: 20px;
    }
    .item > a {
        text-decoration: none;
    }

    /**
    添加鼠标悬浮效果
     */
    .item:hover::before {
        transform: scale3d(1.2, 1.2, 1);
        background-color: $p-color-title;
    }
    .item:hover > a > div > span {
        color: $p-color-title;
    }

    .time-line-date {
        margin-left: 5px;
        color: $p-background-color-difference;
    }
    .time-line-title {
        margin-left: 10px;
        color: $p-background-color-difference;
    }
}
</style>
