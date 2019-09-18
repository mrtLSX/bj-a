module.exports = {
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.scss` 这个文件
        data: '@import "./src/assets/style/main.scss";'
        // data: `@import "./src/lib/hotcss/px2rem.scss";`
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8889',
        ws: true,
        changeOrigin: true,
        // 路由重写
        pathRewrite: {
          '^/api': '/api', // rewrite path
          '^/server': '/server' // remove base path
        }
      }
    }
  }
  // configureWebpack: config => {
  //   config.externals = {
  //     vue: 'Vue',
  //     'vue-router': 'VueRouter',
  //     lodash: {
  //       commonjs: 'lodash',
  //       umd: 'lodash',
  //       root: '_'
  //     }
  //   };
  // }
};
