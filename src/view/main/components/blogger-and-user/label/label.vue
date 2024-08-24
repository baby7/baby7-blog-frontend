<template>
    <div class="content-real">
        <!-- 标题 -->
        <span class="right-label-title">&nbsp;◈&nbsp;标签</span>
        <!-- 分隔 -->
        <hr class="title-line-right">
        <template>
            <router-link class="label-link" to="/label">
              <span class="label-item" style="background-color:#E355CD">
                全部
              </span>
            </router-link>
        </template>
        <template
            v-for="(label,index) in labelList">
            <router-link class="label-link" :to="'/label?id='+label.id">
              <span
                  class="label-item"
                  :style="'background-color:'+getColor(index)">
                {{label.label}}
              </span>
            </router-link>
        </template>
    </div>
</template>

<script>
    export default {
        name: "Label",
        props:{
            labelList:{
                type: Array,
                require: true
            }
        },
        data() {
            return {
                colorList: [
                    "#409EFF",
                    "#67C23A",
                    "#E6A23C",
                    "#F56C6C",
                    "#E355CD",
                ]
            }
        },
        methods: {
            getColor(index){
                return this.colorList[index%this.colorList.length];
            }
        }
    }
</script>

<style lang="scss">
@include themeify {
    .label-item {
        vertical-align: middle;
        margin: 4px 4px 10px;
        padding: 8px 8px;
        display: inline-block;
        cursor: pointer;
        border-radius: .25rem;
        line-height: 13px;
        font-size: 13px;
        transition: all .5s;
    }
    .label-link {
        color: $p-background-color-extreme;
        text-decoration: none;
    }
}

.title-line-right {
    margin-bottom: 5px;
}
</style>
