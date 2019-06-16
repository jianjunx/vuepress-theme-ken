<template>
  <div class="posts">
    <div class="left">
      <PostsList/>
    </div>
    <div class="right">
      <div class="right-tag">
        <h4 class="right-tag_title">
          标签云：
          <span>{{curTag}}</span>
        </h4>
        <div class="right-tag_tc">
          <TagCloud @on-word="onWordHandler" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PostsList from "./PostsList";
import TagCloud from "./TagCloud";

export default {
  name: "posts",
  data: () => ({
    curTag: "all"
  }),
  components: { PostsList, TagCloud },
  methods: {
    onWordHandler(word) {
      this.curTag = word
      location.hash = word
    }
  }
};
</script>

<style lang="stylus">
.posts {
  padding: $navbarHeight 2rem 0;
  max-width: 1110px;
  margin: 0 auto;
  display: flex;
}

.left {
  flex: 1;
}

.right {
  width: 280px;
  margin-left: 20px;
}

.right-tag {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 280px;
  padding: 10px;
  box-sizing: border-box;
  background-color: #f5f7f4;
  border-radius: 6px;
  box-shadow: 0 2px 8px 0 rgba(28, 31, 33, 0.1);

  &_title {
    font-size: 14px;
    line-height: 0;
  }

  &_tc {
    flex 1
    border-top 1px solid #f1f1f1
    box-sizing border-box
    padding 10px
  }
}
</style>
