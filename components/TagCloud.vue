<template>
  <div class="tagcloud">
    <vue-word-cloud
      :words="tagsWords"
      :color="([], i) => i%2 === 1 ? '#403030' : '#12904f'"
      font-family="Anton"
      :rotation="([],i)=> i%2 === 1 ? 90 : 0"
      rotation-unit="deg"
    >
      <template slot-scope="{text, weight, word}">
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
