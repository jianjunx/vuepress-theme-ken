<template>
  <div class="plist">
    <ul>
      <li class="plist-card" v-for="post in pages" :key="post.key">
        <a :href="post.path">
          <h3 class="themecolor">{{post.title}}</h3>
          <p v-if="post.excerpt">{{post.excerpt | getPText}}</p>
        </a>
        <div class="plist-foot">
          <span>{{$themeConfig.author && $themeConfig.author.name || ''}}</span>
          <span class="dot">·</span>
          <span>{{post.lastUpdated | relativeTime}}</span>
          <span class="dot">·</span>
          <template v-for="tag in post.tags.split(',')">
            <a class="themecolor" :key="tag" :href="`#${tag}`">#{{tag}}</a>
          </template>
        </div>
      </li>
    </ul>
    <div class="plist-pages">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :current-page.sync="pageIndex"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import PostBus from "../util/post-bus";
import { relativeTime, date } from "../util/date";

export default {
  name: "PostsList",
  data: () => ({
    pageIndex: 1,
    total: 50,
    pages: [],
    condition: null
  }),
  watch: {
    $route: {
      handler: function(val) {
        this.pageIndex = 1;
        const hash = val.hash.replace("#", "");
        this.condition =
          !hash || hash == "all" ? null : ["tags", decodeURI(hash)];
        this.pages = this.findPageData();
      },
      immediate: true
    }
  },
  filters: {
    relativeTime(t) {
      return relativeTime(date(t));
    },
    getPText(txt) {
      if (!txt) return txt;
      const start = txt.indexOf("<p>");
      const end = txt.indexOf("</p>");
      return txt.slice(start + 3, end);
    }
  },
  methods: {
    findPageData() {
      const { pageIndex, condition } = this;
      const _list = PostBus.find(condition)
        .sort()
        .limit(pageIndex)
        .end();
      this.total = PostBus.postList.length;
      return _list;
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

  &-pages {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    text-align: center;
  }
}

.plist-card {
  padding: 10px 20px 20px;
  border-bottom: 1px solid $borderColor;

  h3 {
    font-size: 18px;
    line-height: 0.5;
    color: #333;
  }

  p {
    font-size: 13px;
    color: #888;
  }

  .plist-foot {
    font-size: 13px;
  }
}

.dot {
  color: #999;
  font-weight: normal;
  padding: 0 5px;
}

.themecolor:hover {
  color: $accentColor;
}
</style>
<style lang="stylus">
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: $accentColor;
}

.el-pagination.is-background .el-pager li:hover {
  color: $accentColor;
}
</style>
