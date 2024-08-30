<template>
  <section>
    <img v-if="!spider" :src="p0Src" id="p0" :style="{ transform: `translateY(${p0Top}px)`, zIndex: `100` }" alt="p0">
    <img v-if="!spider" :src="p1Src" id="p1" :style="{ transform: `translateY(${p1Top}px)`, zIndex: `200` }" alt="p1">
    <img v-if="!spider" :src="p2Src" id="p2" :style="{ transform: `translateY(${p2Top}px)`, zIndex: `300` }" alt="p2">
    <img v-if="!spider" :src="p3Src" id="p3" :style="{ transform: `translateY(${p3Top}px)`, zIndex: `400` }" alt="p3">
    <img v-if="!spider" :src="p4Src" id="p4" :style="{ transform: `translateY(${p4Top}px)`, zIndex: `500` }" alt="p4">
    <img v-if="!spider" :src="p6Src" id="p6" :style="{ transform: `translateY(${p6Top}px)`, zIndex: `600` }" alt="p6">
    <a v-if="!spider" href="javascript:void(0);"
       @click="goContent"
       :style="{ transform: `translateY(${p6Top}px)`, zIndex: `700`}">
      <img :src="p7Src" id="p7" alt="p7">
    </a>
    <div id="banner_title"
         class="container"
         :style="{ marginRight: `0px`, marginTop: `${bannerTitleMarginTop}px`, width: `75%`}">
        <h1>{{blogTitle}}</h1>
        <p class="description">{{blogDescription}}</p>
    </div>
  </section>
</template>

<script>
import {judgeSpider} from "@/util/seo";

const imgUrl = "https://media.baby7blog.com/blog/img/";
const imgSuffix = "-to75.webp";
// const imgUrl = "/static/";
export default {
  name: "Banner",
  data() {
    return {
      p0Src: imgUrl + 'banner/ppp0.png' + imgSuffix,
      p1Src: imgUrl + 'banner/pp1.png' + imgSuffix,
      p2Src: imgUrl + 'banner/pp2.png' + imgSuffix,
      p3Src: imgUrl + 'banner/pp3.png' + imgSuffix,
      p4Src: imgUrl + 'banner/pp4.png' + imgSuffix,
      p6Src: imgUrl + 'banner/pp6.png' + imgSuffix,
      p7Src: imgUrl + 'banner/bottom.png' + imgSuffix,
      p0Top: -100,
      p1Top: 0,
      p2Top: 0,
      p3Top: 0,
      p4Top: 0,
      p6Top: 0,
      p7Top: 0,
      bannerTitleMarginTop: -230,
      requestId: undefined, // 用于跟踪 requestAnimationFrame 的标识,
      spider: true
    };
  },
  props:{
    blogTitle:{
      type: String,
      require: true
    },
    blogDescription:{
      type: String,
      require: true
    },
  },
  mounted() {
    this.spider = judgeSpider()
    this.addScrollListener();
  },
  beforeDestroy() {
    this.removeScrollListener();
  },
  methods: {
    addScrollListener() {
      // 使用 passive 参数优化滚动性能
      window.addEventListener('scroll', this.handleScroll, {passive: true});
    },
    removeScrollListener() {
      window.removeEventListener('scroll', this.handleScroll);
    },
    handleScroll() {
      const value = window.scrollY;
      this.p0Top = value * 0.6 - 100;
      this.p1Top = value * 0.36;
      this.p2Top = value * 0.24;
      this.p3Top = value * 0.16;
      this.p4Top = value * 0.12;
      this.p6Top = 0;
      this.bannerTitleMarginTop = value * 1.1 - 230;
      // 使用 requestAnimationFrame 更新样式
      if (this.requestId === undefined) {
        this.requestId = requestAnimationFrame(this.updateStyles);
      }
    },
    updateStyles() {
      // 清除请求动画帧标识
      this.requestId = undefined;
    },
    goContent() {
      let stepNumber = 0;
      var timer = setInterval(function () {
        let osTop = document.documentElement.scrollTop || document.body.scrollTop;    // 当前距离顶部的距离
        let ispeed = 30;                                 // 下次要移动的距离
        let targetTop = window.innerHeight * 0.95;                                    // 移动的最终目标
        if ((osTop + ispeed) >= targetTop) {    // 如果移动后的位置超过目标位置，则移动到目标位置
          osTop = targetTop;
          ispeed = 0;
        }
        document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
        stepNumber = stepNumber + 1;
        if (osTop >= targetTop) {
          clearInterval(timer);
        }
        if (stepNumber >= 40) {
          clearInterval(timer);
        }
      }, 10)
    }
  }
}
</script>

<style scoped lang="scss">
section {
  position: relative;
  width: 100%;
  height: 100vh;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    //height: 100%;
    object-fit: cover;
    pointer-events: none;
    will-change: transform; // 提前告知浏览器哪些属性可能会发生变化
  }

  a {
    position: absolute;
    margin-left: 0;
    margin-top: 50rem;
    width: 4%;
    height: 8%;
    -webkit-animation: bounce 2s 1s infinite;
  }

  #p4,#p3,#p2,#p1,#p0 {
    width: 100%;
    height: 100%;
  }

  #p6 {
    width: 100%;
    height: 150%;
  }

  section::before {
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    //height: 100px;
    background: linear-gradient(to top, #1c0522, transparent);
    //z-index: 1000;
  }
}
@-webkit-keyframes bounce {
  0%,10%,25%,40%,50% {
    -webkit-transform: translateY(0) rotate(0deg);
    transform: translateY(0) rotate(0deg)
  }

  20% {
    -webkit-transform: translateY(-10px) rotate(0deg);
    transform: translateY(-10px) rotate(0deg)
  }

  30% {
    -webkit-transform: translateY(-5px) rotate(0deg);
    transform: translateY(-5px) rotate(0deg)
  }
}

@keyframes bounce {
  0%,10%,25%,40%,50% {
    -webkit-transform: translateY(0) rotate(0deg);
    transform: translateY(0) rotate(0deg)
  }

  20% {
    -webkit-transform: translateY(-10px) rotate(0deg);
    transform: translateY(-10px) rotate(0deg)
  }

  30% {
    -webkit-transform: translateY(-5px) rotate(0deg);
    transform: translateY(-5px) rotate(0deg)
  }
}
</style>
