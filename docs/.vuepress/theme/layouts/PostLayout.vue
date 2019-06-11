<template>
  <div>
    <Navbar v-if="shouldShowNavbar"/>
    <Posts/>
  </div>
</template>
<script>
import Navbar from "@theme/components/Navbar.vue";
import Posts from "@theme/components/Posts.vue";
export default {
  name: "PostLayout",
  components: { Navbar, Posts },
  provide() {
    return { posts: this.postsData }
  },
  computed: {
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
    postsData() {
      const { pages } = this.$site;
      const pageList = pages.filter(p => /\/post\//.test(p.path) && p);
      const tags = this.formatTags(pageList);
      return { pageList, tags };
    }
  },
  methods: {
    formatTags(pageList) {
      return pageList.reduce((tag, p) => {
        const tags = p.frontmatter.tags || [];
        tags.forEach(t => {
          Array.isArray(tag[t]) || (tag[t] = []);
          tag[t].push(p);
        });
        return tag;
      }, {});
    }
  }
};
</script>
