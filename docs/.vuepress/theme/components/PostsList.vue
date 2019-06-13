<template>
  <div class="plist">
    <ul>
      <li class="plist-list" v-for="post in pageList[pageIndex - 1]" :key="post.key">
        <span>{{post.title}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "PostsList",
  data: () => ({
    pageIndex: 1,
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
        this.pageIndex = 1;
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
ul, li
  list-style none 
  margin 0
  padding 0
.plist
  width 100%
</style>
