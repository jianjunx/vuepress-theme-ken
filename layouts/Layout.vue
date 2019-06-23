<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <Navbar 
      v-if="shouldShowNavbar" 
      :isHome="curComponent === 'Home'" 
      :class="{homestyle: curComponent === 'Home'}" 
      @toggle-sidebar="toggleSidebar"/>

    <div class="sidebar-mask" @click="toggleSidebar(false)"></div>

    <Sidebar :items="sidebarItems" @toggle-sidebar="toggleSidebar">
      <slot name="sidebar-top" slot="top"/>
      <slot name="sidebar-bottom" slot="bottom"/>
    </Sidebar>
    <keep-alive>
      <component v-bind:is="curComponent" :sidebar-items="sidebarItems">
      </component>
    </keep-alive>
    <FooteBar />
  </div>
</template>

<script>
import Posts from "@theme/components/Posts.vue";
import Home from "@theme/components/Home.vue";
import Navbar from "@theme/components/Navbar.vue";
import Page from "@theme/components/Page.vue";
import Sidebar from "@theme/components/Sidebar.vue";
import FooteBar from "@theme/components/FooteBar.vue"
import { resolveSidebarItems } from "../util";
import iconfont from '../icons/iconfont'

export default {
  components: { Posts, Home, Page, Sidebar, Navbar, FooteBar },

  data() {
    return {
      isSidebarOpen: false
    };
  },

  computed: {
    curComponent() {
      const _switch = this.$page.frontmatter
      switch (true) {
        case _switch.home:
          return 'Home'
        case _switch.postList:
          return 'Posts'
        default :
          return 'Page'
      }
    },
    shouldShowNavbar() {
      const { themeConfig } = this.$site;
      const { frontmatter } = this.$page;
      if (frontmatter.navbar === false || themeConfig.navbar === false) {
        return false;
      }
      return (
        this.$title ||
        themeConfig.logo ||
        themeConfig.repo ||
        themeConfig.nav ||
        this.$themeLocaleConfig.nav
      );
    },

    shouldShowSidebar() {
      const { frontmatter } = this.$page;
      return (
        !frontmatter.home &&
        frontmatter.sidebar !== false &&
        this.sidebarItems.length
      );
    },

    sidebarItems() {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      );
    },

    pageClasses() {
      const userPageClass = this.$page.frontmatter.pageClass;
      return [
        {
          "no-navbar": !this.shouldShowNavbar,
          "sidebar-open": this.isSidebarOpen,
          "no-sidebar": !this.shouldShowSidebar
        },
        userPageClass
      ];
    }
  },

  mounted() {
    iconfont(window);
    this.$router.afterEach(() => {
      this.isSidebarOpen = false;
    });
  },

  methods: {
    toggleSidebar(to) {
      this.isSidebarOpen = typeof to === "boolean" ? to : !this.isSidebarOpen;
    },

    // side swipe
    onTouchStart(e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      };
    },

    onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x;
      const dy = e.changedTouches[0].clientY - this.touchStart.y;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true);
        } else {
          this.toggleSidebar(false);
        }
      }
    }
  }
};
</script>

<style src="prismjs/themes/prism-tomorrow.css"></style>
<style lang="stylus">
.theme-container .homestyle {
  background-color: transparent;
  border-bottom 0
  color #fff

  .links {
    visibility hidden  
  }
  .nav-link:hover {
      color #fff !important
  }
}
</style>

