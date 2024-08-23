<template>
    <div>
        <div id="comment-top" class="comment-wrap">
            <div class="comment-header">
                <input name="nick" v-model="commentSubmit.nickname" placeholder="昵称" class="comment-input" type="text" autocomplete="on">
                <input name="mail" v-model="commentSubmit.email" placeholder="邮箱" class="comment-input" type="email" autocomplete="on">
                <input name="link" v-model="commentSubmit.url" placeholder="网址(http://)" class="comment-input" type="text" autocomplete="on">
            </div>
            <div class="comment-edit">
                <textarea id="comment-editor" v-model="commentSubmit.content" class="comment-editor comment-input" :placeholder="commentPrompt"></textarea>
            </div>
            <div class="comment-control">
                <div class="col col-20" title="Markdown is supported">
                    <a href="https://segmentfault.com/markdown" target="_blank">
                        <svg class="markdown" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
                            <path fill-rule="evenodd" d="M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z"></path>
                        </svg>
                    </a>
                </div>
                <div class="col col-80 text-right">
                    <button type="button" class="comment-submit" @click="Reply">
                        回复
                    </button>
                </div>
            </div>
            <div style="display:none;" class="comment-mark"></div>
        </div>
        <div v-if="commentList.length > 0" class="comment-list">
            <div class="comment-card" v-for="comment in commentList">
                <img class="comment-img" :src="comment.avatar">
                <div class="comment-right">
                    <div class="comment-head">
                        <a class="comment-nick" :href="comment.url">
                            {{ comment.nickname }}
                        </a>
                        <span class="comment-sys">{{ comment.browser }}</span>
                        <span class="comment-sys">{{ comment.system }}</span></div>
                    <div class="comment-meta">
                        <span class="comment-time">{{ comment.createTime.substring(0, 10) }}</span>
                        <span class="comment-at" @click="ReplyBefore(comment.id, comment.id, comment.nickname)">
                            回复
                        </span>
                    </div>
                    <div class="comment-content">
                        <MarkdownPreview :initialValue="comment.content" :theme="markdownTheme"/>
                    </div>
                    <div class="comment-quote">
                        <div class="comment-card" v-for="children in comment.childrenList">
                            <img class="comment-img" :src="children.avatar">
                            <div class="comment-right">
                                <div class="comment-head">
                                    <a class="comment-nick" :href="children.url">
                                        {{ children.nickname }}
                                    </a>
                                    <span class="comment-sys">{{ children.browser }}</span>
                                    <span class="comment-sys">{{ children.system }}</span></div>
                                <div class="comment-meta">
                                    <span class="comment-time">{{ children.createTime.substring(0, 10) }}</span>
                                    <span class="comment-at"  @click="ReplyBefore(comment.id, children.id, comment.nickname)">
                                        回复
                                    </span>
                                </div>
                                <div class="comment-content">
<!--                                    <p>@{{ comment.nickname }}，{{ children.content }}</p>-->
                                    <MarkdownPreview
                                        :initialValue="'@'+comment.nickname+'\n\n'+children.content"
                                        :theme="markdownTheme"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="comment-info">

        </div>
    </div>
</template>

<script>
import { getCommentTree, addComment } from "@/api/comment";
import { getOtherSystem,getBrowser } from "@/util/message";
import MarkdownPreview from "@/components/markdown/components/preview/index";

export default {
    name: "Comment",
    components: {MarkdownPreview},
    props: {
        blogId: {
            type: Number,
            require: true
        },
        markdownTheme: {
            type: String,
            require: true
        }
    },
    data() {
        return {
            commentList: [],
            commentPrompt: "快来留言吧，支持markdown哦~",
            commentSubmit: {
                id: 0,
                blogId: this.blogId,
                ancestorId: 0,
                replyId: 0,
                nickname: "",
                avatar: "",
                email: "",
                url: "",
                content: "",
                browser: "",
                system: ""
            },
            showToast: false,
            showToastMsg: "",
            showToastLevel: "success"
        }
    },
    methods:{
        // 获取数据
        getData() {
            getCommentTree(this.blogId).then(res => {
                this.commentList = res.data
            })
        },
        Reply(){
            this.commentSubmit.browser = getBrowser()
            this.commentSubmit.system = getOtherSystem()
            if (this.commentSubmit.nickname != null) {
                localStorage.setItem("comment-nickname", this.commentSubmit.nickname);
            }
            if (this.commentSubmit.email != null) {
                localStorage.setItem("comment-email", this.commentSubmit.email);
            }
            if (this.commentSubmit.url != null) {
                localStorage.setItem("comment-url", this.commentSubmit.url);
            }
            addComment(this.commentSubmit).then(res => {
                if(res.code === 0){
                    this.ShowMessage(res.msg, "success")
                    this.commentSubmit = {
                        id: 0,
                        blogId: this.blogId,
                        ancestorId: 0,
                        replyId: 0,
                        nickname: "",
                        avatar: "",
                        email: "",
                        url: "",
                        content: "",
                        browser: "",
                        system: ""
                    }
                    this.commentPrompt = "快来留言吧，支持markdown哦~"
                    this.getData()
                }
                else {
                    this.ShowMessage(res.msg, "danger")
                }
            })
        },
        ShowMessage(msg, level){
            this.$store.state.messageBoxChange = !this.$store.state.messageBoxChange
            this.$store.state.messageBoxLevel = level
            this.$store.state.messageBoxMessage = msg
        },
        ReplyBefore(ancestorId, replyId, commentPrompt){
            this.commentSubmit.ancestorId = ancestorId
            this.commentSubmit.replyId = replyId
            this.commentSubmit.content = ""
            this.commentPrompt = "@" + commentPrompt
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
    mounted() {
        this.getData()
        if (localStorage.getItem("comment-nickname")) {
            this.commentSubmit.nickname = localStorage.getItem("comment-nickname");
        }
        if (localStorage.getItem("comment-email")) {
            this.commentSubmit.email = localStorage.getItem("comment-email");
        }
        if (localStorage.getItem("comment-url")) {
            this.commentSubmit.url = localStorage.getItem("comment-url");
        }
    }
}
</script>

<style lang="scss">
@include themeify {
    .comment-wrap {
        border: 1px solid transparent;
        background-color: #949aad1f;
        border-radius: 4px;
        margin-bottom: 10px;
        overflow: hidden;
        position: relative;
        padding: 10px;
        box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.9);
    }
    .comment-wrap:hover{
        box-shadow: 0 2px 26px 0 rgba(0, 0, 0, 0.9);
    }
    .comment-input {
        border: none;
        resize: none;
        outline: none;
        padding: 10px 5px;
        max-width: 100%;
        font-size: .775em;
        background: transparent;
        width: 32%;
        //border-bottom: 1px dashed #555;
        color: #ffffff;
    }
    .comment-edit {
        position: relative;
        padding-top: 10px;
        border-top: 1px dashed #555
    }
    .comment-edit > .comment-editor {
        width: 99%;
        min-height: 8.75em;
        font-size: .875em;
        background: transparent;
        resize: vertical;
        transition: all .25s ease;
        border-bottom: 0;
    }
    .comment-control {
        font-size: 0;
        padding-top: 15px;
    }
    .col {
        display: inline-block;
        font-size: 16px;
        vertical-align: middle;
        color: #ccc;
    }
    .col-20 {
        width: 20%;
    }
    .col-80 {
        width: 80%;
    }
    .text-right {
        text-align: right;
    }
    .comment-submit {
        transition-duration: .4s;
        text-align: center;
        color: #ffffff;
        border: 1px solid $p-background-color-difference;
        border-radius: .3em;
        display: inline-block;
        background: $p-background-color-difference;
        margin-bottom: 0;
        font-weight: 400;
        vertical-align: middle;
        touch-action: manipulation;
        cursor: pointer;
        white-space: nowrap;
        padding: .5em 1.25em;
        font-size: .875em;
        line-height: 1.42857143;
        -webkit-user-select: none;
        user-select: none;
        outline: none;
    }
    .comment-list {
        background-color: #949aad1f;
        border-radius: 4px;
        margin-bottom: 10px;
        padding: 10px 20px 10px 10px;
        box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.9);
    }
    .comment-list:hover{
        box-shadow: 0 2px 26px 0 rgba(0, 0, 0, 0.9);
    }
    .comment-card {
        padding-top: 1.5em;
        position: relative;
        display: block;
    }

    .comment-img {
        width: 3.125em;
        height: 3.125em;
        float: left;
        border-radius: 50%;
        margin-right: .7525em;
        border: 1px solid #f5f5f5;
        padding: .125em;
    }

    .comment-right {
        overflow: hidden;
        padding-bottom: .5em;
        //border-bottom: 1px dashed #f5f5f5;
    }
    .comment-card:last-child .comment-right {
        border-bottom: none;
    }

    .comment-head {
        line-height: 1.5;
        margin-top: 0;
    }

    .comment-nick {
        position: relative;
        font-size: .875em;
        font-weight: 500;
        margin-right: .875em;
        cursor: pointer;
        color: $p-color-title;
        text-decoration: none;
        display: inline-block;
    }

    .comment-nick:hover {
        border-bottom: 1px solid $p-color-title;
    }

    .comment-sys {
        display: inline-block;
        padding: .2em .5em;
        background: #ededed;
        color: #b3b1b1;
        font-size: .75em;
        border-radius: .2em;
        margin-right: .3em;
    }

    .comment-meta {
        line-height: 1;
        position: relative;
    }

    .comment-time {
        color: #b3b3b3;
        font-size: .75em;
        margin-right: .875em;
    }

    .comment-at {
        font-size: .8125em;
        color: #ef2f11;
        cursor: pointer;
        float: right;
    }

    .comment-content {
        word-break: break-all;
        text-align: justify;
        color: #888;
        font-size: .875em;
        line-height: 2;
        position: relative;
        margin-bottom: .75em;
        padding-top: .625em;
    }
    .comment-quote {
        color: #666;
        margin-top: 1em;
        padding-left: 1em;
        //border-left: 1px dashed hsla(0, 0%, 93%, .5);
    }
}
</style>
