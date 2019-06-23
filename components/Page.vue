<template>
  <main class="page">
    <div class="page-left">
      <!-- <slot name="top"/> -->
      <div class="page-content">
        <div class="page-title">
          <h3>{{$frontmatter.title}}</h3>
          <div class="page-title_info">
            <span class="page-title_author">
            <img class="page-title_avatar" :src="$themeConfig.author.avatar" alt="">
            <span>{{$themeConfig.author.name}}</span>
          </span>
          <span class="page-title_time">
            <Icon type="time" size="16px"/>
            <span>{{lastUpdated | formatDate}}</span>
          </span>
          </div>
        </div>
        <Content class="theme-content"/>
        <div class="page-foot">
          <span v-for="tag in $frontmatter.tags" :key="tag">
            <a :href="`/post/#${tag}`">#{{tag}}</a>
          </span>
        </div>
      </div>

      <div class="page-comment"><Vssue :title="$page.title" /></div>
      
      <div class="page-nav" v-if="prev || next">
        <p class="inner">
          <span v-if="prev" class="prev">
            ←
            <router-link v-if="prev" class="prev" :to="prev.path">{{ prev.title || prev.path }}</router-link>
          </span>

          <span v-if="next" class="next">
            <router-link v-if="next" :to="next.path">{{ next.title || next.path }}</router-link>→
          </span>
        </p>
      </div>

      <slot name="bottom"/>
    </div>
    <div class="page-right">
      <toc/>
    </div>
  </main>
</template>

<script>
import { resolvePage, outboundRE, endingSlashRE } from "../util";
import Icon from './Icon'
import Toc from "./Toc";
import { date } from '../util/date'

export default {
  props: ["sidebarItems"],
  components: { Toc, Icon },
  computed: {
    lastUpdated() {
      return this.$page.lastUpdated;
    },

    lastUpdatedText() {
      if (typeof this.$themeLocaleConfig.lastUpdated === "string") {
        return this.$themeLocaleConfig.lastUpdated;
      }
      if (typeof this.$site.themeConfig.lastUpdated === "string") {
        return this.$site.themeConfig.lastUpdated;
      }
      return "Last Updated";
    },

    prev() {
      const prev = this.$page.frontmatter.prev;
      if (prev === false) {
        return;
      } else if (prev) {
        return resolvePage(this.$site.pages, prev, this.$route.path);
      } else {
        return resolvePrev(this.$page, this.sidebarItems);
      }
    },

    next() {
      const next = this.$page.frontmatter.next;
      if (next === false) {
        return;
      } else if (next) {
        return resolvePage(this.$site.pages, next, this.$route.path);
      } else {
        return resolveNext(this.$page, this.sidebarItems);
      }
    },

    editLink() {
      if (this.$page.frontmatter.editLink === false) {
        return;
      }
      const {
        repo,
        editLinks,
        docsDir = "",
        docsBranch = "master",
        docsRepo = repo
      } = this.$site.themeConfig;

      if (docsRepo && editLinks && this.$page.relativePath) {
        return this.createEditLink(
          repo,
          docsRepo,
          docsDir,
          docsBranch,
          this.$page.relativePath
        );
      }
    },

    editLinkText() {
      return (
        this.$themeLocaleConfig.editLinkText ||
        this.$site.themeConfig.editLinkText ||
        `Edit this page`
      );
    }
  },

  methods: {
    createEditLink(repo, docsRepo, docsDir, docsBranch, path) {
      const bitbucket = /bitbucket.org/;
      if (bitbucket.test(repo)) {
        const base = outboundRE.test(docsRepo) ? docsRepo : repo;
        return (
          base.replace(endingSlashRE, "") +
          `/src` +
          `/${docsBranch}/` +
          (docsDir ? docsDir.replace(endingSlashRE, "") + "/" : "") +
          path +
          `?mode=edit&spa=0&at=${docsBranch}&fileviewer=file-view-default`
        );
      }

      const base = outboundRE.test(docsRepo)
        ? docsRepo
        : `https://github.com/${docsRepo}`;
      return (
        base.replace(endingSlashRE, "") +
        `/edit` +
        `/${docsBranch}/` +
        (docsDir ? docsDir.replace(endingSlashRE, "") + "/" : "") +
        path
      );
    }
  },

  filters: {
    formatDate(t) {
      return date(t).format('YYYY-MM-DD HH:mm:ss')
    }
  }
};

function resolvePrev(page, items) {
  return find(page, items, -1);
}

function resolveNext(page, items) {
  return find(page, items, 1);
}

function find(page, items, offset) {
  const res = [];
  flatten(items, res);
  for (let i = 0; i < res.length; i++) {
    const cur = res[i];
    if (cur.type === "page" && cur.path === decodeURIComponent(page.path)) {
      return res[i + offset];
    }
  }
}

function flatten(items, res) {
  for (let i = 0, l = items.length; i < l; i++) {
    if (items[i].type === "group") {
      flatten(items[i].children || [], res);
    } else {
      res.push(items[i]);
    }
  }
}
</script>

<style lang="stylus">
@require '../styles/wrapper.styl';
.page {
  padding-bottom: 2rem;
  width: $wrapWidth;
  display: flex;
  margin: $navbarHeight auto 0;
  &-content{
    background-color #fff  
    margin-top 15px
    a {
      color $accentColor
    }
  }
  &-title {
    border-bottom 1px solid $borderColor
    margin 0 30px  
    box-sizing border-box
    padding 20px 0
    font-size 14px
    &_info {
      display flex
      align-items center
      justify-content space-between  
    }
    &_author{
      display flex
      align-items center  
    }
    &_avatar{
      width 26px
      height 26px  
      border-radius 50%
      margin-right 10px
    }
  }

  &-foot{
    padding 0 30px 20px
    span {
      padding-right 10px
    }
    a {
      color #333
      &:hover {
        color $accentColor
      }
    }
  }
    
  &-comment{
    background-color #fff
    margin-top 10px
    padding 0 20px
  }
}

.page-left {
  flex: 1px;
}

.page-right {
  width: 265px;
  margin-left 15px
}

.page-edit {
  @extend $wrapper;
  padding-top: 1rem;
  padding-bottom: 1rem;
  overflow: auto;

  .edit-link {
    display: inline-block;

    a {
      color: lighten($textColor, 25%);
      margin-right: 0.25rem;
    }
  }

  .last-updated {
    float: right;
    font-size: 0.9em;

    .prefix {
      font-weight: 500;
      color: lighten($textColor, 25%);
    }

    .time {
      font-weight: 400;
      color: #aaa;
    }
  }
}

.page-nav {
  @extend $wrapper;
  padding-top: 1rem;
  padding-bottom: 0;

  .inner {
    min-height: 2rem;
    margin-top: 0;
    border-top: 1px solid $borderColor;
    padding-top: 1rem;
    overflow: auto; // clear float
  }

  .next {
    float: right;
  }
}

@media (max-width: $MQMobile) {
  .page-edit {
    .edit-link {
      margin-bottom: 0.5rem;
    }

    .last-updated {
      font-size: 0.8em;
      float: none;
      text-align: left;
    }
  }
}
</style>
