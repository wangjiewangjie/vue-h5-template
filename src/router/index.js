import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

/* 
  path: string, // 路径
  component?: Component,  // 组件
  name?: string, // 命名路由
  components?: { [name: string]: Component }, // 命名视图组件
  redirect?: string | Location | Function, // 重定向
  props?: boolean | Object | Function, // 
  alias?: string | Array<string>,// 别名
  children?: Array<RouteConfig>, // 嵌套路由
  beforeEnter?: (to: Route, from: Route, next: Function) => void,
  meta?: any,
  {
    title:string, // 页面标题
    keepAlive:boolean // 保留组件状态或避免重新渲染 true保存 false不保存 
  }

  // 2.6.0+
  caseSensitive?: boolean, // 匹配规则是否大小写敏感？(默认值：false)
  pathToRegexpOptions?: Object // 编译正则的选项
*/

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "Home" */ "../views/Home.vue"),
    meta: {
      title: "首页",
      keepAlive: false
    }
  }
];

const router = new VueRouter({
  mode: "history", //配置history需要nginx配置
  base: process.env.BASE_URL,
  routes
});

/* 路由发生变化修改页面title */
router.afterEach(to => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
});

export default router;
