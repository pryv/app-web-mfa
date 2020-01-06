module.exports = {
  assetsDir: 'static',
  publicPath: process.env.NODE_ENV === 'production'
    ? ''
    : '/',
  transpileDependencies: [
    'vuetify',
  ],
};
