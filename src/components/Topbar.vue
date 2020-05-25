<template>
  <div
    class="movable"
    ref="movable"
    @mousedown="down"
    @touchstart="down"
    @mousemove="move"
    @touchmove.prevent="move"
    @mouseup="end"
    @touchend="end"
    @click="routerBack"
  >
    返回
  </div>
</template>

<script>
export default {
  props: ["routerHistory"],
  data() {
    return {
      flags: false,
      position: { x: 0, y: 0 },
      nx: "",
      ny: "",
      dx: "",
      dy: "",
      xPum: "",
      yPum: ""
    };
  },
  methods: {
    routerBack() {
      if (this.routerHistory === null || this.routerHistory === "login") {
        this.$router.replace("/");
      } else {
        this.$router.back(-1);
      }
    },
    // 实现移动端拖拽
    down() {
      this.flags = true;
      let touch;

      if (event.touches) {
        touch = event.touches[0];
      } else {
        touch = event;
      }

      this.position.x = touch.clientX;
      this.position.y = touch.clientY;
      this.dx = this.$refs.movable.offsetLeft;
      this.dy = this.$refs.movable.offsetTop;
    },
    move() {
      if (this.flags) {
        let touch;
        if (event.touches) {
          touch = event.touches[0];
        } else {
          touch = event;
        }

        // this.nx = touch.clientX - this.position.x;
        this.ny = touch.clientY - this.position.y;

        // this.xPum = this.dx + this.nx;
        this.yPum = this.dy + this.ny;

        // 判断不超出页面可视区
        if (this.yPum <= 0) {
          this.yPum = 0;
        } else if (this.yPum >= document.documentElement.clientHeight - 100) {
          this.yPum = document.documentElement.clientHeight - 100;
        }

        // this.$refs.movable.style.left = this.xPum + "px";
        this.$refs.movable.style.top = this.yPum + "px";

        // 阻止页面的滑动默认事件
        document.addEventListener(
          "touchmove",
          () => {
            event.stopPropagation();
          },
          false
        );
      }
    },
    // 鼠标释放时候的函数
    end() {
      this.flags = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.movable {
  position: fixed;
  left: 0px;
  top: 100px;
  z-index: 999;
  width: 100px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  background: #fff;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.15);
  border-radius: 0 100px 100px 0;
  opacity: 0.9;
  font-size: 22px;
  // color: $mainTextColor;
}
</style>
