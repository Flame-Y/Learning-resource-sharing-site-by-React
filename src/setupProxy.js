const proxy = require("http-proxy-middleware"); //引入http-proxy-middleware，react脚手架已经安装

module.exports = function (app) {
  app.use(
    proxy.createProxyMiddleware("/api", {
      target: "http://119.23.54.229:8082",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    })
  );
};
