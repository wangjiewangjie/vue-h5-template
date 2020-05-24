const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "css"];
const cdn = {
  css: []
  // js: ["https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js"]
};
module.exports = {
  /* production 路由hash模式配置./相对路径 history模式配置/绝对路径 */
  publicPath: process.env.NODE_ENV === "development" ? "/" : "/",
  /* 生产环境的 source map，可以将其设置为 false 以加速生产环境构建 */
  productionSourceMap: false,
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      /* 修改webpack config, 使其不打包externals下的资源 public/index.html 添加cdn */
      config.externals = {
        // "vue-router": "VueRouter"
      };
      /* gzip压缩 服务器端需要配置 */
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: "gzip",
          test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"), //匹配文件后缀
          threshold: 10240, //只有大小大于该值的资源会被处理 单位是 bytes 默认值是 0
          minRatio: 0.8, //只有压缩率小于这个值的资源才会被处理 默认值是 0.8
          deleteOriginalAssets: false //不删除源文件
        })
      );
    }
  },
  chainWebpack: config => {
    /* 
      移除 prefetch 插件 
      prefetch链接会消耗宽带，如果是在移动端，而且存在大量的chunk，那么可以关掉 prefetch 链接
      手动选择要提前获取的代码区块

      {
        path: "*",
        name: "Error",
        component: () => import(webpackPrefetch: true,"../views/Error/Error.vue"),
        meta: {
          title: "页面不存在",
          keepAlive: false
        }
      }
    */
    config.plugins.delete('prefetch')
    if (process.env.NODE_ENV === "production") {
      /* 生产环境注入cdn */
      config.plugin("html").tap(args => {
        args[0].cdn = cdn;
        return args;
      });
    }
  },
  css: {
    loaderOptions: {
      // 给 scss-loader 传递选项
      scss: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/var.sass` 这个文件
        data: `@import "~@/styles/_var.scss";`
      }
    }
  },
  /*是否启用dll
  See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode */
  //  dll: false,
  /* proxy代理跨域 */
  devServer: {
    // port: 8080, // 端口号
    // host: "localhost",
    // https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    proxy: {
      "/api": {
        target: "<url>",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};