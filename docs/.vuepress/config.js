const path = require('path');
function resolve(p) {
  return path.resolve(__dirname, '../', p);
}

module.exports = {
  title: 'Jayken',
  description: '  Jayken的个人博客',
  themeConfig: {
    logo: 'https://cn.vuejs.org/images/logo.png',
    nav: [
      { text: '首页', link: '/' },
      { text: 'BLOG', link: '/post/' },
      { text: 'GitHub', link: 'https://google.com' },
    ],
    pageSize: 10,
    postPath: 'post',
    comment: {
      owner: 'jaykenxie',
      repo: 'jaykenxie.github.io',
      // test
      clientId: "e4007a4eb776489e4d70",
      clientSecret: "55928e4e5e9a083c5880bd2dd6d7e7aaf00b9f04"
      // prod
      // clientId: '54bb290f84655f1609e2',
      // clientSecret: '9725a7efd555d42d7c6a965d86924a64dce589ce',
    },
    footer: {
      info:
        '接触前端以来一直想自己设计开发一个博客，用于分想和记录工作、生活和学习中遇到的问题，与解决问题的思路和感悟。 (^o^)/~。',
      beian: '粤ICP备18012800号-2',
      links: [
        {name: '关于我', target: '/'},
        {name: 'GitHub', target: 'https://github.com/jaykenxie'},
        {name: '微博', target: 'https://weibo.com/autoshun'},
      ]
    },
  },
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
  evergreen: true,
  plugins: {
    '@vssue/vuepress-plugin-vssue': {
      locale: 'zh',
      // 设置 `platform` 而不是 `api`
      platform: 'github',

      // 其他的 Vssue 配置
      owner: 'jaykenxie',
      repo: 'jaykenxie.github.io',
      // test
      clientId: "e4007a4eb776489e4d70",
      clientSecret: "55928e4e5e9a083c5880bd2dd6d7e7aaf00b9f04"
      // prod
      // clientId: '54bb290f84655f1609e2',
      // clientSecret: '9725a7efd555d42d7c6a965d86924a64dce589ce',
    },
  },
}