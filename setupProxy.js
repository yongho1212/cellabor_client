const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://cellabor.ap-northeast-2.elasticbeanstalk.com',
      changeOrigin: true,
    })
  );
};

