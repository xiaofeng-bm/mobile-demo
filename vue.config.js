const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: false,
  outputDir: '../zailab_trial',
  publicPath:
    // process.env.NODE_ENV === "production" ? "/static/zailab_trial/" : "/",
  publicPath: process.env.NODE_ENV === "production" ? "/mobile-demo/" : "/",
  productionSourceMap: false,
  devServer: {
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        // target: "http://192.168.0.174:8899/",
        // target: "http://localhost:3001/",
        target: "https://stg.incentivepower.cn/",
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: "",
        },
      },
    },
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
};
