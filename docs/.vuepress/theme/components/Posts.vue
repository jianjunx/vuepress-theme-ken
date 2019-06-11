<template>
  <div class="posts">
    <div class="left">
      <PostsList />
    </div>
  </div>
</template>
<script>
import PostsList from './PostsList'

export default {
  name: 'posts',
  components: { PostsList }  
}
</script>

<style lang="stylus">
.posts
  padding $navbarHeight 2rem 0
  max-width 1110px
  margin 0 auto
</style>
