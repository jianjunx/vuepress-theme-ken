<template>
  <div class="postlist">
    <ul>
      <li v-for="post in pageList[pageIndex]" :key="post.key">
        <span>{{post.title}}</span>
      </li>
    </ul>
    
  </div>
</template>
<script>
export default {
  name: "PostsList",
  data: () => ({
    pageIndex: 0,
    total: 0,
    allPages: []
  }),
  inject: ["posts"],
  computed: {
    pageList() {
      const { allPages } = this;
      this.total = allPages.length;
      return this.splitPages(allPages);
    }
  },
  watch: {
    $route: {
      handler: function(val) {
        this.pageIndex = 0;
        const hash = val.hash.replace("#", "");
        if (!hash) {
          this.allPages = this.posts.pageList;
          return;
        }
        this.allPages = this.posts.tags[hash] || [];
      },
      immediate: true
    }
  },
  methods: {
    splitPages(pages, i = 0) {
      const { pageSize = 10 } = this.$themeConfig;
      return pages.reduce(
        (list, p) => {
          list[i].length === pageSize && (i = i + 1);
          Array.isArray(list[i]) || (list[i] = []);
          list[i].push(p);
          return list;
        },
        [[]]
      );
    }
  }
};
</script>
<style lang="stylus" scoped>
.postlist
  margin-top 0px
</style>
