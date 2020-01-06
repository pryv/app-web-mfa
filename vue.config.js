module.exports = {
  assetsDir: 'static',
  publicPath: process.env.NODE_ENV === 'production'
    ? '/app-web-mfa/'
    : '/',
  transpileDependencies: [
    'vuetify',
  ],
};
