const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://flixshare-application-backend.onrender.com', // Replace with your production backend server's URL
      changeOrigin: true,
    })
  );
};
