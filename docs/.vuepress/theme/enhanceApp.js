import PostBus from './util/post-bus';
export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData, // 站点元数据
}) => {
  // 加载elementui
  const {
    themeConfig: { postPath = 'post' },
    pages,
  } = siteData;
  // 过滤文章列表
  const reg = new RegExp(`/${postPath}/\.`);
  PostBus.format(pages.filter(page => reg.test(page.path)));
};
