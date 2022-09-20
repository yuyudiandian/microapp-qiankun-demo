const { name } = require('./package');
module.exports = {
  publicPath: '//localhost:20000',
  devServer: {
    port:20000,
    headers: {
      // 允许CORS跨域
      'Access-Control-Allow-Origin': '*',
    },
  },
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
    },
  },
};