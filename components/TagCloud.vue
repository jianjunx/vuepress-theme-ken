<template>
  <div class="tagcloud">
    <vue-word-cloud
      :words="tagsWords"
      :color="([], i) => i%2 === 1 ? '#403030' : '#1781b5'"
      font-family="Anton"
      :rotation="([],i)=> i%2 === 1 ? 45 : -45"
      rotation-unit="deg"
      :font-size-ratio="3"
    >
      <template slot-scope="{text, weight}">
        <div :title="weight" style="cursor: pointer;" @click="onWordClick(text)">{{ text }}</div>
      </template>
    </vue-word-cloud>
  </div>
</template>
<script>
import VueWordCloud from "vuewordcloud";
import PostBus from "../util/post-bus";

export default {
  name: "TagCloud",
  components: {
    [VueWordCloud.name]: VueWordCloud
  },
  computed: {
    tagsWords() {
      const _tags = Object.entries(PostBus.tags)
      return [['all', 0], ..._tags]
    }
  },
  methods: {
    onWordClick(word) {
      this.$emit('on-word', word)
    }
  }
};
</script>
<style lang="stylus">
.tagcloud {
  width: 100%;
  height: 100%;
}
</style>
