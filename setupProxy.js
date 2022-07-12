const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://Cellabor-env.eba-zfztyyws.ap-northeast-2.elasticbeanstalk.com',
      changeOrigin: true,
    })
  );
};