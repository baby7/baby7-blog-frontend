<template>
  <div
    id="back-to-top"
    :class="['back-to-top cd-top faa-float animated', { 'cd-is-visible': isTopVisible }]"
    :style="{ top: topStyle + 'px' }"
    @click="goTop"></div>
</template>

<script>
import { debounce } from 'lodash';

export default {
  name: "BackToTop",
  props: {
    url: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isTopVisible: false,
      topStyle: -999,
      requestId: undefined, // 用于跟踪 requestAnimationFrame 的标识
    };
  },
  methods: {
    addScrollListener() {
      window.addEventListener('scroll', this.debouncedHandleScroll, {passive: true});
    },
    removeScrollListener() {
      window.removeEventListener('scroll', this.debouncedHandleScroll);
    },
    debouncedHandleScroll: debounce(function() {
      this.handleScroll();
    }, 200),
    handleScroll() {
      this.isTopVisible = window.pageYOffset > 500;
      this.topStyle = this.isTopVisible ? -200 : -999;
      const element = document.getElementById("back-to-top");
      element.style.background = `url(${this.url})`;
      // 使用 requestAnimationFrame 更新样式
      if (this.requestId === undefined) {
        this.requestId = requestAnimationFrame(this.updateStyles);
      }
    },
    updateStyles() {
      // 清除请求动画帧标识
      this.requestId = undefined;
    },
    goTop() {
        var timer = setInterval(function () {
          let osTop = document.documentElement.scrollTop || document.body.scrollTop;
          let ispeed = Math.floor(-osTop / 5);
          document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
          if (osTop === 0) {
              clearInterval(timer);
          }
      }, 10)
    }
  },
  mounted() {
    this.addScrollListener();
  },
  beforeDestroy() {
    this.removeScrollListener();
  }
}
</script>



<style scoped>
@keyframes passing {
  0% {
    transform: translateX(-50%);
    opacity: 0
  }
  50% {
    transform: translateX(0%);
    opacity: 1
  }
  100% {
    transform: translateX(50%);
    opacity: 0
  }
}

.faa-passing, .faa-parent.animated-hover:hover > .faa-passing, .faa-passing.animated-hover:hover {
  animation: passing 2s linear infinite;
}

.faa-passing.faa-fast, .faa-parent.animated-hover:hover > .faa-passing.faa-fast, .faa-passing.animated-hover.faa-fast:hover, .faa-passing.animated.faa-fast {
  animation: passing 1s linear infinite;
}

.faa-passing.faa-slow, .faa-parent.animated-hover:hover > .faa-passing.faa-slow, .faa-passing.animated-hover.faa-slow:hover, .faa-passing.animated.faa-slow {
  animation: passing 3s linear infinite;
}

@keyframes passing-reverse {
  0% {
    transform: translateX(50%);
    opacity: 0
  }
  50% {
    transform: translateX(0%);
    opacity: 1
  }
  100% {
    transform: translateX(-50%);
    opacity: 0
  }
}

.faa-passing-reverse, .faa-parent.animated-hover:hover > .faa-passing-reverse, .faa-passing-reverse.animated-hover:hover {
  animation: passing-reverse 2s linear infinite;
}

.faa-passing-reverse.faa-fast, .faa-parent.animated-hover:hover > .faa-passing-reverse.faa-fast, .faa-passing-reverse.animated-hover.faa-fast:hover, .faa-passing-reverse.animated.faa-fast {
  animation: passing-reverse 1s linear infinite;
}

.faa-passing-reverse.faa-slow, .faa-parent.animated-hover:hover > .faa-passing-reverse.faa-slow, .faa-passing-reverse.animated-hover.faa-slow:hover, .faa-passing-reverse.animated.faa-slow {
  animation: passing-reverse 3s linear infinite;
}

@keyframes burst {
  0% {
    opacity: .6
  }
  50% {
    transform: scale(1.8);
    opacity: 0
  }
  100% {
    opacity: 0
  }
}

.faa-burst, .faa-parent.animated-hover:hover > .faa-burst, .faa-burst.animated-hover:hover {
  animation: burst 2s infinite linear;
}

.faa-burst.faa-fast, .faa-parent.animated-hover:hover > .faa-burst.faa-fast, .faa-burst.animated-hover.faa-fast:hover, .faa-burst.animated.faa-fast {
  animation: burst 1s infinite linear;
}

.faa-burst.faa-slow, .faa-parent.animated-hover:hover > .faa-burst.faa-slow, .faa-burst.animated-hover.faa-slow:hover, .faa-burst.animated.faa-slow {
  animation: burst 3s infinite linear;
}

@keyframes falling {
  0% {
    transform: translateY(-50%);
    opacity: 0
  }
  50% {
    transform: translateY(0%);
    opacity: 1
  }
  100% {
    transform: translateY(50%);
    opacity: 0
  }
}

.faa-falling, .faa-parent.animated-hover:hover > .faa-falling, .faa-falling.animated-hover:hover {
  animation: falling 2s linear infinite;
}

.faa-falling.faa-fast, .faa-parent.animated-hover:hover > .faa-falling.faa-fast, .faa-falling.animated-hover.faa-fast:hover, .faa-falling.animated.faa-fast {
  animation: falling 1s linear infinite;
}

.faa-falling.faa-slow, .faa-parent.animated-hover:hover > .faa-falling.faa-slow, .faa-falling.animated-hover.faa-slow:hover, .faa-falling.animated.faa-slow {
  animation: falling 3s linear infinite;
}

.back-to-top {
  cursor: pointer;
  position: fixed;
  right: 80px;
  top: -900px;
  z-index: 2;
  width: 70px;
  height: 900px;
  transition: all .5s ease-in-out;
  opacity: 1;
}

</style>
