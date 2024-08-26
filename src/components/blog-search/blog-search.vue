<template>
    <div class="search-box">
        <i class="iconfont">🔍</i>
        <input type="text" placeholder="搜索" v-model="searchVal" class="search-input" @blur="LoseFocus">
        <ul class="search-list" v-if="NewItems.length > 0">
            <li v-for="(item,index) in NewItems" :key="index" :value="item.id" class="search-item">
                <router-link class="search-link" :to="'/myBlog/' + item.id + '.html'" :title="item.title">
                    {{ item.title }}
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: "BlogSearch",
    props: {
        items: {
            type: Array,
            require: true
        }
    },
    data() {
        return {
            searchVal: ""
        };
    },
    methods: {
        LoseFocus(){
            setTimeout(() => {
                this.searchVal = ""
            }, 300);
        }
    },
    computed: {
        NewItems() {
            var _this = this;
            var NewItems = [];
            if(this.searchVal == null || this.searchVal === ""){
                return NewItems
            }
            this.items.map(function(item) {
                if (item.title.toUpperCase().indexOf(_this.searchVal.toUpperCase()) != -1) {
                    NewItems.push(item);
                }
            });
            return NewItems;
        }
    }
};
</script>
<style lang="scss">
@include themeify {
    .iconfont {
        position: absolute;
        top: 0;
        bottom: 0;
        z-index: 0;
        margin: auto;
        padding-left: 5px;
        font-style: normal;
    }
    .search-input {
        cursor: text;
        width: 10rem;
        height: 2rem;
        //color: $p-background-color-difference;
        color: #fff;
        display: inline-block;
        //border: 1px solid $p-background-color-difference;
        border: 1px solid #fff;
        border-radius: .25rem;
        font-size: .9rem;
        line-height: 2rem;
        padding: 0 .5rem 0 2rem;
        outline: none;
        transition: all .2s ease;
        background: transparent;
        background-size: 1rem;
    }
    .search-input::placeholder {
        color: #fff;
    }
    .search-input:focus {
        border: 1px solid $p-color-text;
    }
    .search-list {
        font-size: .9rem;
        z-index: 100;
        background: $p-background-color;
        width: 20rem;
        position: absolute;
        top: 2.5rem;
        border-radius: 6px;
        border: 1px solid $p-background-color-extreme;
        list-style: none;
        padding: 10px;
    }
    .search-item {
        border-bottom: 1px dashed $p-background-color-difference;
    }
    .search-link {
        color: $p-background-color-extreme;
        text-decoration: none;
        letter-spacing: 0;
    }
    .search-link:hover {
        color: $p-color-text;
    }
    @media all and (orientation : portrait) {
      .search-list {
        left: 0;
      }
    }
}
</style>
