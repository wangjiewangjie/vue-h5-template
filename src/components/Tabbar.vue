<template>
  <ul class="tabbar">
    <li>
      <router-link to="/">
        <div class="tabbar-icon">
          <i
            class="tabbar-sprite"
            :class="
              $route.name === 'home' ? 'tabbar-mall_enter' : 'tabbar-mall_leave'
            "
          ></i>
        </div>
        <div
          class="tabbar-text"
          :class="$route.name === 'home' ? 'tabbar-text-enter' : ''"
        >
          商城
        </div>
      </router-link>
    </li>

    <li>
      <router-link to="/">
        <div class="tabbar-icon">
          <i
            class="tabbar-sprite"
            :class="
              $route.name === 'order'
                ? 'tabbar-order_enter'
                : 'tabbar-order_leave'
            "
          ></i>
        </div>
        <div
          class="tabbar-text"
          :class="$route.name === 'order' ? 'tabbar-text-enter' : ''"
        >
          订单
        </div>
      </router-link>
    </li>

    <li>
      <router-link to="/">
        <div class="tabbar-icon">
          <i
            class="tabbar-sprite"
            :class="
              $route.name === 'usercenter'
                ? 'tabbar-point_enter'
                : 'tabbar-point_leave'
            "
          ></i>
        </div>
        <div
          class="tabbar-text"
          :class="$route.name === 'usercenter' ? 'tabbar-text-enter' : ''"
        >
          积分
        </div>
      </router-link>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.tabbar {
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 98px;
  background: #fff;
  li {
    width: 33.333%;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 98px;
      font-size: 28px;
      color: #a4a4a4;
    }
  }

  .tabbar-icon {
    margin-right: 10px;
    i {
      display: block;
      width: 44px;
      height: 44px;
    }
  }
  .tabbar-text-enter {
    // color: $primary-1;
  }
}

/* tabbar雪碧图 */
.tabbar-sprite,
.tabbar-mall_enter,
.tabbar-mall_leave,
.tabbar-order_enter,
.tabbar-order_leave,
.tabbar-point_enter,
.tabbar-point_leave {
  background-image: url("../../public/images/tabbar_sprite.png");
  background-repeat: no-repeat;
  background-size: 44px;
}

.tabbar-mall_enter {
  background-position: 0 0;
}

.tabbar-mall_leave {
  background-position: 0 -49px;
}

.tabbar-order_enter {
  background-position: 0 -98px;
}

.tabbar-order_leave {
  background-position: 0 -147px;
}

.tabbar-point_enter {
  background-position: 0 -196px;
}

.tabbar-point_leave {
  background-position: 0 -245px;
}
</style>
