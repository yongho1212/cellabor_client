const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://Cellabor-env.eba-zfztyyws.ap-northeast-2.elasticbeanstalk.com/ad/getAdInfo',
      changeOrigin: true,
    })
  );
};

