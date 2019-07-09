<template>
  <div class="posts">
    <div class="left">
      <div class="left-swiper">
        <Swiper :banners=" $frontmatter.banners"/>
      </div>
      <PostsList/>
    </div>
    <div class="right">
      <AuthorCard />
      <SideCard :title="`标签云：${curTag}`">
        <div class="tags">
          <TagCloud @on-word="onWordHandler"/>
        </div>
      </SideCard>
    </div>
  </div>
</template>
<script>
import PostsList from "./PostsList";
import TagCloud from "./TagCloud";
import SideCard from "./SideCard";
import Swiper from './Swiper'
import AuthorCard from './AuthorCard'

export default {
  name: "posts",
  data: () => ({
    curTag: "all",
  }),
  components: { PostsList, TagCloud, SideCard, Swiper, AuthorCard },
  methods: {
    onWordHandler(word) {
      this.curTag = word;
      location.hash = word;
    }
  }
};
</script>

<style lang="stylus">
.posts {
  padding: $navbarHeight 2rem 1rem;
  max-width: $wrapWidth;
  margin: 0 auto;
  display: flex;
}

.left {
  width : 810px;
  background-color: #fff;
  margin-top: 15px;
  &-swiper {
    width: 100%;
    height: 226px;
    border-radius: 4px;
    overflow: hidden;
  }
}

.slide-container {
  background-color: #999;
  width: 810px;
  height: 280px;
}

.right {
  width: 280px;
  margin-left: 20px;
  // margin-top 15px
}

.tags {
  width: 100%;
  height: 200px;
}
</style>
