# <div id="top">目录</div>

* [✅  目录结构](#directoryStructure)
* [✅  安装](#dev)
* [✅  发布](#build)
* [✅  VantUI 组件按需加载](#vant)
* [✅  Sass 全局样式](#scss)
* [✅  Axios 封装及接口管理](#axios)
* [✅  Vue-router](#router)
* [✅  Nginx 代理](#nginx)
* [✅  第三方库](#npm)

### <div id="directoryStructure">✅ 目录结构</div>

``` 
├─ mock                     # 项目mock 模拟数据
├─ nginx                    # nginx反向代理配置
├─ public                   # 静态资源
│  ├─ images                # 图片
│  ├─ favicon.ico           # favicon图标
│  └─ index.html            # html模板
├─ src                      # 源代码
│  ├─ api                   # 所有请求
│  ├─ assets                # 主题 图片等静态资源
│  ├─ components            # 全局公用组件
│  ├─ plugins               # 全局插件
│  ├─ router                # 路由
│  ├─ store                 # 全局 store管理
│  ├─ styles                # 全局样式
│  ├─ utils                 # 全局公用方法
│  ├─ views                 # views 所有页面
│  ├─ APP.vue               # 入口页面
│  └─ main.js               # 入口文件 加载组件 初始化等
├─ vue.config.js            # vue-cli 配置
```

### <div id="dev">✅  安装</div>

``` 
# 克隆项目
git clone https://github.com/wangjiewangjie/vue-h5-template.git

# 进入项目目录
cd vue-h5-template

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run serve
```

[▲ 回顶部](#top)

### <div id="build">✅  发布</div>

``` 
# 构建生产环境
npm run build
```

[▲ 回顶部](#top)

### <div id="vant">✅  VantUI 组件按需加载</div>

项目采用[VantUI 按需引入 (推荐)](https://youzan.github.io/vant/#/zh-CN/quickstart)

[▲ 回顶部](#top)

### <div id="scss">✅  Sass 全局样式</div>

#### 公共样式

公共样式都在 `@/src/styles` 目录下设置

``` 
│  ├─ styles            
│  │  ├─ _var.scss                   # 全局变量
│  │  ├─ reset.css                   # 样式重置
```

#### 全局变量

`vue.config.js` 中的 `css.loaderOptions` 选项

``` javascript
module.exports = {
    css: {
        loaderOptions: {
            // 给 scss-loader 传递选项
            scss: {
                // 引入scss全局变量
                prependData: `@import "~@/styles/_var.scss";`
            },
            /* 配置rem适配  selectorBlackList需要排除的样式 */
            postcss: {
                plugins: [
                    require("postcss-pxtorem")({
                        rootValue: 37.5,
                        propList: ["*"],
                        unitPrecision: 3,
                        minPixelValue: 2,
                        selectorBlackList: ["van-"]
                    })
                ]
            }
        }
    },
}
```

[▲ 回顶部](#top)

### <div id="axios">✅  Axios 封装及接口管理</div>

`utils/requset.js` axios的封装

``` javascript
const service = axios.create({
    // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
    // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
    baseURL: process.env.NODE_ENV === "production" ? "" : "",
    // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
    // 如果请求话费了超过 `timeout` 的时间，请求将被中断
    timeout: 5000
});

service.interceptors.request.use(
    config => {
        /**
         * @param {Object} config.data [请求主体被发送的数据 拦截混入公共参数]
         */
        return config;
    },
    error => {
        // 请求失败
        return Promise.reject(error);
    }
);
```

`api/api.js` 统一管理接口

``` javascript
/**
 * @param {String} url [请求的服务器 URL]
 * @param {String} ${api} [开发环境下代理服务器的主机名称和端口]
 * @param {String} method [请求时使用的方法]
 * @param {Object} data [请求主体被发送的数据]
 */
export function Api(data) {
    return request({
        url: `${api}Api` ,
        method: "get",
        data
    });
}
```

[▲ 回顶部](#top)

### <div id="router">✅  Vue-router</div>

``` javascript
const routes = [{
    path: "*",
    name: "Error",
    component: () =>
        import(
            /* webpackChunkName: "error", webpackPrefetch: true */
            "../views/Error/Error.vue"
        ), // 路由懒加载 webpackChunkName分包名称 webpackPrefetch 手动选择要提前获取的代码区块
    meta: {
        title: "页面不存在", // 页面title
        keepAlive: false // keep-alive 标识
    }
}]

const router = new VueRouter({
    mode: "history", //配置history需要nginx配置 hash模式 需要配置 vue.config.js publicPath
    routes
});

/* 路由发生变化修改页面title */
router.afterEach(to => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
});
```

[▲ 回顶部](#top)

### <div id="nginx">✅  Nginx 代理</div>

路由history模式下配置Nginx

``` javascript
const router = new VueRouter({
    mode: "history", //配置history需要nginx配置
    routes
});
```

``` javascript
location / {
    try_files $uri $uri / /index.html; #路由history配置
}
```

[▲ 回顶部](#top)

### <div id="npm">✅  第三方库</div>

``` 
md5                 # md5加密
vue-clipboards      # 复制粘贴
decimal.js          # js浮点数计算bug              
```

[▲ 回顶部](#top)
