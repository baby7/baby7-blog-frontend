<template>
    <div id="app">
        <!-- 导航栏 -->
        <Header
            :avatar="settingData.icon"
            :title="settingData.title"/>
        <!-- 标题栏 -->
        <div v-if="$store.state.blogTitleShow" class="header-wrap">
            <div class="container">
                <h1>{{$store.state.blogTitle}}</h1>
                <p class="description">{{$store.state.blogDescription}}</p>
            </div>
        </div>
        <!-- 中间块 -->
        <div class="main">
            <div class="main-wrapper">
                <div class="main-list">
                    <!-- 主要内容 -->
                    <MainContent/>
                </div>
                <div class="info-wrapper">
                    <!-- 博主及用户 -->
                    <BloggerAndUser :setting-data="settingData"/>
                </div>
            </div>
        </div>
        <!-- 下方信息 -->
        <Bottom
            :record-url="settingData.recordUrl"
            :record-number="settingData.recordNumber"
            :create-time="settingData.createTime"/>
        <!-- 提示信息弹出框 -->
        <Toast
            :visible="showToast"
            :message="showToastMsg"
            :level="showToastLevel"/>
        <!-- 背景 -->
        <div v-if="$route.query.seo == null">
            <!-- 粒子连线特效 -->
            <BackgroundParticles v-if="settingData.plugins.particles.state"/>
            <!-- 粒子穿越特效 -->
            <BackgroundStarfield v-if="settingData.plugins.starfield.state"/>
            <!-- 下雪特效 -->
            <BackgroundSnow v-if="settingData.plugins.snow.state"/>
            <!-- 海中鱼特效 -->
            <FlyingFish v-if="settingData.plugins.flyingFish.state"/>
        </div>
        <!-- 看板娘 -->
        <Live2dw
            v-if="settingData.plugins.live2dw.state && openLive2dw && $route.query.seo == null"
            :data="settingData.plugins.live2dw"/>
        <!-- 上吊猫 -->
        <BackToTop
            v-if="settingData.plugins.backToTop.state && $route.query.seo == null"
            :url="settingData.plugins.backToTop.cdnPath"/>
    </div>
</template>

<script>
    import BloggerAndUser       from "@/view/main/components/blogger-and-user/blogger-and-user";
    import Bottom               from "@/view/main/components/bottom/bottom";
    import MainContent          from "@/view/main/components/main-content/main-content";
    import Header               from "@/view/main/components/blogger-and-user/header/header"
    import { getSetting }       from '@/api/setting'
    import Toast                from "@/components/comment/toast/toast";
    import BackgroundParticles  from "@/components/background-particles/background-particles";
    import BackgroundStarfield  from "@/components/background-starfield/background-starfield";
    import Live2dw              from "@/components/live2dw/live2dx"
    import FlyingFish from "@/components/flying-fish/flying-fish";
    import BackToTop from "@/components/back-to-top/back-to-top";
    import BackgroundSnow from "@/components/background-snow/background-snow";

    export default {
        name: "Main",
        components: {
            BackgroundSnow,
            BackToTop,
            FlyingFish,
            Toast,
            MainContent,
            BloggerAndUser,
            Bottom,
            Header,
            BackgroundParticles,
            BackgroundStarfield,
            Live2dw
        },
        data() {
            return {
                settingData: {
                    nickname: "",
                    title: "",
                    icon: "",
                    avatar: "",
                    socialAccounts: [
                        {
                            type: "微信",
                            icon: "https://media.baby7blog.com/img/blogger/weixin.png",
                            qr: ""
                        },
                        {
                            type: "QQ",
                            icon: "https://media.baby7blog.com/img/blogger/qq.png",
                            qr: ""
                        }
                    ],
                    uploadFile: {
                        local: {
                            state: true,
                            name: "服务器上传"
                        },
                        qiniu: {
                            state: true,
                            name: "七牛云存储",
                            accessKey: "",
                            secretKey: "",
                            bucket: "",
                            path: ""
                        }
                    },
                    push: {
                        baidu: {
                            state: false
                        },
                        360: {
                            state: false,
                            value: ""
                        },
                        toutiao: {
                            state: false,
                            value: ""
                        }
                    },
                    plugins: {
                        particles: {
                            state: false
                        },
                        starfield: {
                            state: false
                        },
                        live2dw: {
                            state: false,
                            cdnPath: "http://cdn.baby7blog.com/",
                            type: "rem",
                            position: "right",
                            width: 250,
                            height: 500,
                            hOffset: 0,
                            vOffset: -110
                        },
                        flyingFish: {
                            state: false
                        },
                        backToTop: {
                            state: false,
                            cdnPath: "http://cdn.baby7blog.com/gototop.png"
                        },
                        snow: {
                            state: false
                        }
                    },
                    describe: "主要记录自己在写程序过程中的发现、问题、成果",
                    backgroundImg: "",
                    defaultImg: "",
                    recordUrl: "http://beian.miit.gov.cn",
                    recordNumber: "",
                    createTime: "2019-04-10 20:51:03",
                    updateTime: "2020-11-03 00:00:00"
                },
                showToast: false,
                showToastMsg: "",
                showToastLevel: "success",
                showTitleMsg: false,
                openLive2dw: false
            }
        },
        methods:{
            // 获取数据
            getData() {
                let setting = localStorage.getItem("baby7-setting")
                if(setting != null){
                    this.settingData = JSON.parse(setting)
                    document.querySelector("link[rel='icon']").href = this.settingData.icon
                }
                getSetting().then(res => {
                    if(this.settingData.updateTime != res.data.updateTime) {
                        this.settingData = res.data
                        localStorage.setItem("baby7-setting", JSON.stringify(res.data))
                        document.querySelector("link[rel='icon']").href = this.settingData.icon
                    }
                    this.$store.state.title = this.settingData.title
                    document.title = this.$store.state.blogTitle + " - " + this.$store.state.title
                    if(this.$store.state.blogTitle == ""){
                      document.title = this.$store.state.title
                    }
                    this.openLive2dw = true
                    if(this.showTitleMsg){
                        this.$store.state.blogTitle = this.settingData.title
                        this.$store.state.blogDescription = this.settingData.describe
                        this.$store.state.blogTitleShow = true;
                    }
                    this.autoPush()
                })
            },
            ShowMessage(){
                this.showToastMsg = this.$store.state.messageBoxMessage;
                this.showToast = true;
                this.showToastLevel = this.$store.state.messageBoxLevel;
                setTimeout(() => {
                    this.showToast = false;
                }, 1500);
            },
            //自动收录
            autoPush() {
                if(this.$route.query.seo == null) {
                  // 百度自动收录
                  if(this.settingData.push.baidu.state){
                    let bp = document.createElement('script');
                    let curProtocol = window.location.protocol.split(':')[0];
                    if (curProtocol === 'https') {
                      bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
                    }
                    else {
                      bp.src = 'http://push.zhanzhang.baidu.com/push.js';
                    }
                    let s = document.getElementsByTagName("script")[0];
                    s.parentNode.insertBefore(bp, s);
                  }
                  // 360自动收录
                  if(this.settingData.push["360"].state){
                    let th = document.createElement('script');
                    th.src = "https://jspassport.ssl.qhimg.com/11.0.1.js?" + this.settingData.push["360"].value;
                    th.id = "sozz"
                    let s = document.getElementsByTagName("script")[0];
                    s.parentNode.insertBefore(th, s);
                  }
                  // 头条自动收录
                  if(this.settingData.push.toutiao.state){
                    let el = document.createElement("script");
                    el.src = "https://s3a.pstatp.com/toutiao/push.js?" + this.settingData.push.toutiao.value;
                    el.id = "ttzz";
                    let s = document.getElementsByTagName("script")[0];
                    s.parentNode.insertBefore(el, s);
                  }
                }
            }
        },
        mounted() {
            this.getData()
        },
        computed: {
            isFollow () {
                return this.$store.state.messageBoxChange;
            },
            isTitle() {
                return this.$store.state.blogTitleChange;
            }
        },
        watch: {
            isFollow (newVal, oldVal) {
                this.ShowMessage()
            },
            isTitle(newVal, oldVal) {
                if(this.showTitleMsg){
                    this.$store.state.blogTitle = this.settingData.title
                    this.$store.state.blogDescription = this.settingData.describe
                    this.$store.state.blogTitleShow = true;
                    document.title = this.$store.state.blogTitle + " - " + this.$store.state.title
                }
                this.showTitleMsg = true
            }
        }
    }
</script>

<style lang="scss">
@include themeify {
    .main{
        margin: 0 auto;
    }
    .main-wrapper {
        display: flex;
        align-items: flex-start;
        margin: 20px auto 0;
        max-width: 1126px;
        transition: all 0.25s ease-in-out 0.24s;
        transform: translateY(0px);
        opacity: 1;
    }
    .main-list {
        flex: auto;
        width: 0;
    }
    .info-wrapper {
        position: sticky;
        top: 70px;
        transition: all .3s;
        margin-left: 15px;
        flex: 0 0 300px;
        height: auto;
        border-radius: .25rem;
        box-sizing: border-box;
        padding: 0 15px;
    }
    .header-wrap {
        margin-top: -70px;
        text-align: center;
        background: $p-background-img;
        min-height: 650px;
        width: 100%;
        -webkit-background-size: 100%;
        -moz-background-size: 100%;
        -o-background-size: 100%;
        background-size: 100%;
        padding-top: 150px;
    }
    .container {
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
        padding-top: 150px;
    }
    .container > h1 {
        color: #ffffff;
        font-size: 3.0rem;
    }
    .description {
        color: #ffffff;
        font-size: 1.5rem;
        transition: all 0.25s ease-in-out 0.08s;
        transform: translateY(0px); opacity: 1;
    }
}
</style>
