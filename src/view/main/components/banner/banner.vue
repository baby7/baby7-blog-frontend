<template>
  <section>
    <img :src="p0Src" id="p0" :style="{ transform: `translateY(${p0Top}px)` }" alt="p0">
    <img :src="p1Src" id="p1" :style="{ transform: `translateY(${p1Top}px)` }" alt="p1">
    <img :src="p2Src" id="p2" :style="{ transform: `translateY(${p2Top}px)` }" alt="p2">
    <img :src="p3Src" id="p3" :style="{ transform: `translateY(${p3Top}px)` }" alt="p3">
    <img :src="p4Src" id="p4" :style="{ transform: `translateY(${p4Top}px)` }" alt="p4">
    <img :src="p6Src" id="p6" :style="{ transform: `translateY(${p6Top}px)` }" alt="p6">
    <div id="banner_title" class="container" :style="{ marginRight: `0px`, marginTop: `${bannerTitleMarginTop}px`}">
        <h1 style="z-index: 1000">{{blogTitle}}</h1>
        <p class="description">{{blogDescription}}</p>
    </div>
  </section>
</template>

<script>
export default {
  name: "Banner",
  data() {
    return {
      p0Src: 'https://media.baby7blog.com/blog/img/banner/p0.png',
      p1Src: 'https://media.baby7blog.com/blog/img/banner/p1.png',
      p2Src: 'https://media.baby7blog.com/blog/img/banner/p2.png',
      p3Src: 'https://media.baby7blog.com/blog/img/banner/p3.png',
      p4Src: 'https://media.baby7blog.com/blog/img/banner/p4.png',
      p6Src: 'https://media.baby7blog.com/blog/img/banner/p6.png',
      p0Top: 0,
      p1Top: 0,
      p2Top: 0,
      p3Top: 0,
      p4Top: 0,
      p6Top: 0,
      bannerTitleMarginTop: 100,
      requestId: undefined, // 用于跟踪 requestAnimationFrame 的标识
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
      this.p0Top = value * 0.6;
      this.p1Top = value * 0.36;
      this.p2Top = value * 0.24;
      this.p3Top = value * 0.16;
      this.p4Top = value * 0.12;
      this.p6Top = 0;
      this.bannerTitleMarginTop = value * 1.0 + 100;
      // 使用 requestAnimationFrame 更新样式
      if (this.requestId === undefined) {
        this.requestId = requestAnimationFrame(this.updateStyles);
      }
    },
    updateStyles() {
      // 清除请求动画帧标识
      this.requestId = undefined;
    }
  }
}
</script>

<style scoped lang="scss">
section {
  position: relative;
  width: 100%;
  height: 55vh;
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

  section::before {
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    //height: 100px;
    background: linear-gradient(to top, #1c0522, transparent);
    z-index: 1000;
  }
}
</style>
