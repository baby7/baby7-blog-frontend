<template>
    <div v-if="total/pageSize > 1" class="pagination-box">
        <ul class="pagination">
            <!-- first -->
            <li
                v-if="index !== 1"
                :class="['paging-item', 'paging-item--first', {'paging-item--disabled' : index === 1}]"
                @click="first">首页
            </li>

            <!-- prev -->
            <li
                v-if="index !== 1"
                :class="['paging-item', 'paging-item--prev', {'paging-item--disabled' : index === 1}]"
                @click="prev">上一页
            </li>

            <li
                :class="['paging-item', 'paging-item--more']"
                v-if="showPrevMore">...
            </li>

            <li
                :class="['paging-item', {'paging-item--current' : index === pager}]"
                v-for="pager in pagers"
                @click="go(pager)">{{ pager }}
            </li>

            <li
                :class="['paging-item', 'paging-item--more']"
                v-if="showNextMore">...
            </li>

            <!-- next -->
            <li
                v-if="index !== pages"
                :class="['paging-item', 'paging-item--next', {'paging-item--disabled' : index === pages}]"
                @click="next">下一页
            </li>

            <!-- last -->
            <li
                v-if="index !== pages"
                :class="['paging-item', 'paging-item--last', {'paging-item--disabled' : index === pages}]"
                @click="last">末页
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "Pagination",
    props: {

        //页面中的可见页码，其他的以...替代, 必须是奇数
        perPages: {
            type: Number,
            default: 5
        },

        //当前页码
        pageIndex: {
            type: Number,
            default: 1
        },

        //每页显示条数
        pageSize: {
            type: Number,
            default: 10
        },

        //总记录数
        total: {
            type: Number,
            default: 1
        },

    },
    methods: {
        prev() {
            if (this.index > 1) {
                this.go(this.index - 1)
            }
        },
        next() {
            if (this.index < this.pages) {
                this.go(this.index + 1)
            }
        },
        first() {
            if (this.index !== 1) {
                this.go(1)
            }
        },
        last() {
            if (this.index != this.pages) {
                this.go(this.pages)
            }
        },
        go(page) {
            if (this.index !== page) {
                this.index = page
                //父组件通过change方法来接受当前的页码
                this.$emit('change', this.index)
            }
            this.goContent()
        },
        goContent() {
            var comment = document.getElementById("app");
            var commentTop = comment.offsetTop + window.innerHeight * 0.95;
            let stepNumber = 0;
            var timer = setInterval(function () {
                let osTop = document.documentElement.scrollTop || document.body.scrollTop;    // 当前距离顶部的距离
                let ispeed = 100;                                 // 下次要移动的距离
                let targetTop = commentTop;                                    // 移动的最终目标
                if ((osTop - ispeed) <= targetTop) {    // 如果移动后的位置超过目标位置，则移动到目标位置
                    osTop = targetTop;
                    ispeed = 0;
                }
                document.documentElement.scrollTop = document.body.scrollTop = osTop - ispeed;
                stepNumber = stepNumber + 1;
                if (osTop <= targetTop) {
                    clearInterval(timer);
                }
            }, 10)
        }
    },
    computed: {

        //计算总页码
        pages() {
            return Math.ceil(this.size / this.limit)
        },

        //计算页码，当count等变化时自动计算
        pagers() {
            const array = []
            const perPages = this.perPages
            const pageCount = this.pages
            let current = this.index
            const _offset = (perPages - 1) / 2


            const offset = {
                start: current - _offset,
                end: current + _offset
            }

            //-1, 3
            if (offset.start < 1) {
                offset.end = offset.end + (1 - offset.start)
                offset.start = 1
            }
            if (offset.end > pageCount) {
                offset.start = offset.start - (offset.end - pageCount)
                offset.end = pageCount
            }
            if (offset.start < 1) offset.start = 1

            this.showPrevMore = (offset.start > 1)
            this.showNextMore = (offset.end < pageCount)

            for (let i = offset.start; i <= offset.end; i++) {
                array.push(i)
            }

            return array
        }
    },
    data() {
        return {
            index: this.pageIndex, //当前页码
            limit: this.pageSize, //每页显示条数
            size: this.total || 1, //总记录数
            showPrevMore: false,
            showNextMore: false
        }
    },
    watch: {
        pageIndex(val) {
            this.index = val || 1
        },
        pageSize(val) {
            this.limit = val || 10
        },
        total(val) {
            this.size = val || 1
        }
    }
}
</script>

<style lang="scss">
@include themeify {
    .pagination-box {
        text-align: center;
    }
    .pagination {
        display: inline-block;
        padding: 0;
        margin: 1rem 0;
        font-size: 0;
        list-style: none;
        user-select: none;

        > .paging-item {
            display: inline;
            margin-right: 4px;
            font-size: 18px;
            position: relative;
            padding: 5px 8px 5px 10px;
            line-height: 1.42857143;
            text-decoration: none;
            box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.9);
            background-color: rgba(148, 154, 173, 0.1215686275);
            margin-left: 4px;
            cursor: pointer;
            color: $p-background-color-difference;
            border-radius: 4px;

            &:first-child {
                margin-left: 0;
            }

            &:hover {
                background-color: $p-background-color;
                color: #0275d8;
            }

            &.paging-item--disabled,
            &.paging-item--more {
                //background-color: $p-background-color;
                color: #505050;
            }

            //禁用
            &.paging-item--disabled {
                cursor: not-allowed;
                opacity: .75;
            }

            &.paging-item--more,
            &.paging-item--current {
                cursor: default;
            }

            //选中
            &.paging-item--current {
                background-color: $p-color-box;
                color: #fff;
                position: relative;
                z-index: 1;
                border-color: #0275d8;
            }
        }
    }
}
</style>
