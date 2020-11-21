<template>
    <div v-show="visible" class="dialog-tips dialog-center">
        <div :class="'msg-'+level">
            {{ message }}
        </div>
    </div>
</template>
<script>
export default {
    name: "Toast",
    props:{
        visible:{
            type: Boolean,
            require: true
        },
        level:{
            type: String,
            require: true
        },
        message:{
            type: String,
            require: true
        },
    }
};
</script>
<style lang="scss">
@include themeify {
    .dialog-tips {
        position: fixed;
        font-size: 17px;
        z-index: 100;
        min-width: 50px;
        padding: 10px 10px;
        white-space: nowrap;
        background-color: $p-background-color-extreme;
        box-shadow: 0px 8px 15px 0 rgba(0, 0, 0, 0.1);
        text-align: center;
        border-radius: .6em;
    }
    .dialog-center {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%)
    }
    .msg-primary {
        color: $p-background-color-level-primary;
    }
    .msg-success {
        color: $p-background-color-level-success;
    }
    .msg-info {
        color: $p-background-color-level-info;
    }
    .msg-warning {
        color: $p-background-color-level-warning;
    }
    .msg-danger {
        color: $p-background-color-level-danger;
    }
}
</style>
