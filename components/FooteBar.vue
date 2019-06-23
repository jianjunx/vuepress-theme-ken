<template>
  <footer class="footer">
    <div class="footer-ctx">
      <div class="footer-ctx-l">
        <h5>自述</h5>
        <p>{{$themeConfig.footer.info}}</p>
      </div>
      <div class="footer-ctx-m">
        <h5>相关链接</h5>
        <ul class="flink">
          <li class="flink-wrap" v-for="link in $themeConfig.footer.links || []">
            <a class="dedline" :href="link.target">{{link.name}}</a>
          </li>
        </ul>
      </div>
      <div class="footer-ctx-r">
        <img 
          v-if="$themeConfig.logo" 
          class="footer-ctx-r_logo" 
          :src="$withBase($themeConfig.logo)" 
          :alt="$siteTitle">
        <Icon v-if="!$themeConfig.logo" type="shuye" size="60px"/>
      </div>
    </div>
    <div class="footer-info">
      <a href="/">&copy;{{$themeConfig.copyRight}}</a>
      <i>&nbsp;·&nbsp;</i>
      <a href="https://v1.vuepress.vuejs.org">Vuepress</a>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <a
        class="dedline"
        href="http://www.miitbeian.gov.cn/publish/query/indexFirst.action"
        target="_blank"
      >{{$themeConfig.footer.beian}}</a>
    </div>
  </footer>
</template>
<script>
import Icon from './Icon'

export default {
  name: "xfooter",
  components: { Icon },
  methods: {
    jumpTo(to) {
      this.$router.push(to);
    }
  }
};
</script>

<style lang="stylus" scoped>
ul,li{
  list-style none 
}
.footer {
  width: 100%;
  background-color: #333;
  box-shadow: 0 0 5px rgba(0,0,0,.25)
  &-ctx {
    max-width: $wrapWidth;
    display: flex;
    color: #999;
    margin: 0 auto;
    border-bottom: 1px solid #666;
    padding-top: 20px;
    padding-bottom: 10px;
    font-size: 14px;
    h5 {
      color: #666;
    }
    &-l {
      height: 100%;
      width: 40%;
      padding-right: 60px;
      p {
        line-height: 24px;
      }
    }
    &-m {
      width: 40%;
      // display: flex;
      padding-left: 100px;
      ul,
      li {
        padding: 0;
        margin: 0;
      }
      li {
        line-height: 28px;
      }
    }
    &-r {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      &_logo {
        width: 80px;
        height: 80px;
      }
    }
  }
  &-info {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    font-size: 14px;
    color: #999;
    a {
      color #999
    }
  }
}
.flink {
  display: flex;
  flex-wrap: wrap;
  &-wrap {
    width: 110px;
    a {
      color #999
    }
  }
}
.dedline:hover
  border-bottom 1px solid $accentColor
</style>