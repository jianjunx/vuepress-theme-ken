<template>
  <header class="navbar">
    <div class="navbar-wrap">
      <div>
        <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')"/>
        <router-link :to="$localePath" class="home-link">
          <img
            class="logo"
            v-if="$site.themeConfig.logo"
            :src="$withBase($site.themeConfig.logo)"
            :alt="$siteTitle"
          >
          
          <div class="default-logo" v-if="!$site.themeConfig.logo">
            <Icon size="40px" :type="isHome?'shuye2-copy':'shuye1'"/>
          </div>
        </router-link>
        <NavLinks class="can-hide"/>
      </div>
      <div
        class="links"
        :style="linksWrapMaxWidth ? {
        'max-width': linksWrapMaxWidth + 'px'
      } : {}"
      >
        <AlgoliaSearchBox v-if="isAlgoliaSearch" :options="algolia"/>
        <SearchBox
          v-else-if="$site.themeConfig.search !== false && $page.frontmatter.search !== false"
        />
      </div>
    </div>
  </header>
</template>

<script>
import AlgoliaSearchBox from "@AlgoliaSearchBox";
import SearchBox from "@SearchBox";
import SidebarButton from "@theme/components/SidebarButton.vue";
import NavLinks from "@theme/components/NavLinks.vue";
import Icon from './Icon'

export default {
  components: { SidebarButton, NavLinks, SearchBox, AlgoliaSearchBox, Icon },

  data() {
    return {
      linksWrapMaxWidth: null
    };
  },
  props: {
    isHome: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    const MOBILE_DESKTOP_BREAKPOINT = 719; // refer to config.styl
    const NAVBAR_VERTICAL_PADDING =
      parseInt(css(this.$el, "paddingLeft")) +
      parseInt(css(this.$el, "paddingRight"));
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.linksWrapMaxWidth = null;
      } else {
        this.linksWrapMaxWidth =
          this.$el.offsetWidth -
          NAVBAR_VERTICAL_PADDING -
          ((this.$refs.siteName && this.$refs.siteName.offsetWidth) || 0);
      }
    };
    handleLinksWrapWidth();
    window.addEventListener("resize", handleLinksWrapWidth, false);
  },

  computed: {
    algolia() {
      return (
        this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
      );
    },

    isAlgoliaSearch() {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName;
    }
  }
};

function css(el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView;
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property];
}
</script>

<style lang="stylus">
$navbar-vertical-padding = 0.7rem;
$navbar-horizontal-padding = 1.5rem;

.navbar
  padding $navbar-vertical-padding $navbar-horizontal-padding
  line-height $navbarHeight - 1.4rem
  a, span, img
    display inline-block
  .logo
    height $navbarHeight - 1.4rem
    min-width $navbarHeight - 1.4rem
    margin-right 2rem
    vertical-align top
  .site-name
    font-size 1.3rem
    font-weight 600
    color $textColor
    position relative
  .links
    padding-left 1.5rem
    box-sizing border-box
    background-color white
    white-space nowrap
    font-size 0.9rem
    right $navbar-horizontal-padding
    top $navbar-vertical-padding
    display flex
    .search-box
      flex: 0 0 auto
      vertical-align top
.navbar-wrap
  width $wrapWidth
  display flex
  justify-content space-between
  margin 0 auto

.default-logo
  position relative
  width 40px
  height 1px
  margin-right 20px
  margin-left 10px
  &>svg{
    position absolute
    top -22px
    left 0  
  }
@media (max-width: $MQMobile)
  .navbar
    padding-left 4rem
    .can-hide
      display none
    .links
      padding-left 1.5rem
</style>
