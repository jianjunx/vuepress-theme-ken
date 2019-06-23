<template>
  <div class="swiper">
    <el-carousel height="220px">
      <el-carousel-item v-for="sw in banners" :key="sw.src">
        <a class="swiper-content" :style="{backgroundImage: `url('${sw.src}')`}" :href="sw.target"></a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  name: "swiper",
  props: {
    banners: {
      type: Array,
      default: () => [{}]
    }
  }
};
</script>
<style lang="stylus" scoped>
.swiper {
  width: 100%;
  height: 100%;

  &-content {
    display: block;
    width: 100%;
    height: 100%;
    background-color: skyblue;
    background-position: center;
    background-size: cover;
  }
}
</style>
