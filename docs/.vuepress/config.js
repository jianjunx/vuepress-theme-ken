const path = require('path');
function resolve(p) {
  return path.resolve(__dirname, '../', p);
}

module.exports = {
  title: 'Jayken',
  description: '  Jayken的个人博客',
  configureWebpack: {
    resolve: {
      alias: {
        img: resolve('images'),
      },
    },
  },
  markdown: {
    lineNumbers: true, //是否开启文章代码左边的行号显示
  },
  evergreen: true
}