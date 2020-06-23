const { modifyVars } = require('less')

module.exports = {
  devServer: {
    //自动打开浏览器
    open: true,
  },
  //配置px转rem的比例大小
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUint: 37.5,
          }),
        ],
      },
    },
  },
}
