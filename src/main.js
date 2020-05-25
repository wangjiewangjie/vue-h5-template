import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import wx from "weixin-jsapi";
import * as FastClick from "fastclick";
import "./styles/ress.css";
import * as api from "@/api/api";

Vue.config.productionTip = false;
Vue.prototype.$wx = wx;
Vue.prototype.$api = api;

if ("addEventListener" in document && "ontouchstart" in window) {
  FastClick.prototype.focus = function(targetElement) {
    targetElement.focus();
  };
  document.addEventListener(
    "DOMContentLoaded",
    function() {
      FastClick.attach(document.body);
    },
    false
  );
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
