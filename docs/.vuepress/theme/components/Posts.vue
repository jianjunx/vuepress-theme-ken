<template>
  <div class="posts">
    <div class="left">
      <PostsList />
    </div>
    <div class="right">
      <TagCloud />
    </div>
  </div>
</template>
<script>
import PostsList from './PostsList'
import TagCloud from './TagCloud'

export default {
  name: 'posts',
  components: { PostsList, TagCloud }  
}
</script>

<style lang="stylus">
.posts
  padding $navbarHeight 2rem 0
  max-width 1110px
  margin 0 auto
</style>
