<template>
  <div class="plist">
    <ul>
      <li class="plist-card" v-for="post in pages" :key="post.key">
        <a :href="post.path">
          <h3>{{post.title}}</h3>
          <p v-if="post.excerpt" v-html="post.excerpt"></p>
        </a>
        <div class="plist-foot">
          <span>雨夜</span>
          <span class="dot">·</span>
          <span>{{post.lastUpdated | relativeTime}}</span>
          <span class="dot">·</span>
          <template v-for="tag in post.tags.split(',')">
            <a :key="tag" :href="`#${tag}`">#{{tag}}</a>
          </template>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import PostBus from "../util/post-bus";
import { relativeTime, date } from '../util/date'

export default {
  name: "PostsList",
  data: () => ({
    pageIndex: 1,
    total: 0,
    pages: [],
    condition: null
  }),
  watch: {
    $route: {
      handler: function(val) {
        this.pageIndex = 1;
        const hash = val.hash.replace("#", "");
        this.condition = !hash || hash == "all" ? null : ["tags", decodeURI(hash)];
        this.pages = this.findPageData();
      },
      immediate: true
    }
  },
  filters: {
    relativeTime(t) {
      return relativeTime(date(t))
    }
  },
  methods: {
    findPageData() {
      const { pageIndex, condition } = this;
      return PostBus.find(condition)
        .sort()
        .limit(pageIndex)
        .end();
    }
  }
};
</script>
<style lang="stylus" scoped>
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}

.plist {
  width: 100%;
}

.plist-card {
  // boxsi
  padding: 10px 20px;
  background-color: #f5f7f4;
  border-radius: 6px;
  box-shadow: 0 2px 8px 0 rgba(28, 31, 33, 0.1);
  margin-top: 10px;

  h3 {
    line-height: 0.5;
    // color #444
  }

  p {
    font-size: 13px;
    color #888
  }

  .plist-foot {
    font-size: 14px;
  }
}

.dot {
  color: #999;
  font-weight: normal;
  padding: 0 5px;
}
</style>
