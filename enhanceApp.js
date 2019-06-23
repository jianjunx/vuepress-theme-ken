import PostBus from './util/post-bus';
import { Carousel, CarouselItem, Pagination } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

export default ({
  Vue,
  siteData, // 站点元数据
}) => {
  // element ui
  Vue.component(Carousel.name, Carousel);
  Vue.component(CarouselItem.name, CarouselItem);
  Vue.component(Pagination.name, Pagination);

  // post
  const {
    themeConfig: { postPath = 'post' },
    pages,
  } = siteData;
  // 过滤文章列表
  const reg = new RegExp(`/${postPath}/\.`);
  PostBus.format(pages.filter(page => reg.test(page.path)));
};
