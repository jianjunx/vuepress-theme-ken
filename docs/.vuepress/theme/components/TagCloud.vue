<template>
  <div class="tagcloud">
    <vue-word-cloud
      :words="tagsWords"
      :color="([], i) => i%2 === 1 ? '#403030' : '#f97a7a'"
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

export default {
  name: "TagCloud",
  inject: ["posts"],
  components: {
    [VueWordCloud.name]: VueWordCloud
  },
  computed: {
    tagsWords() {
      const { tags } = this.posts;
      return Object.keys(tags).map(tag => [tag, tags[tag].length]);
    }
  },
  methods: {
    onWordClick(word) {
      console.log(word)
    }
  }
};
</script>
<style lang="stylus">
.tagcloud {
  width: 280px;
  height: 280px;
  border: 1px solid #000;
}
</style>
