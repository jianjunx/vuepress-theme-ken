<template>
  <div class="toc">
    <h4>目录</h4>
    <ul class="toc-wrap">
      <template v-for="header in $page.headers">
        <li
          v-if="header.level === 1"
          :key="header.slug"
          :class="{current: isCurrent($route.hash, header.slug)}"
        >
          <a :href="`#${header.slug}`">{{header.title}}</a>
        </li>
        <ul v-if="header.level === 2">
          <li :key="header.slug" :class="{current: isCurrent($route.hash, header.slug)}">
            <a :href="`#${header.slug}`">{{header.title}}</a>
          </li>
        </ul>
        <ul v-if="header.level === 3">
          <ul>
            <li :key="header.slug" :class="{current: isCurrent($route.hash, header.slug)}">
              <a :href="`#${header.slug}`">{{header.title}}</a>
            </li>
          </ul>
        </ul>
        <ul v-if="header.level === 4">
          <ul>
            <ul>
              <li :key="header.slug" :class="{current: isCurrent($route.hash, header.slug)}">
                <a :href="`#${header.slug}`">{{header.title}}</a>
              </li>
            </ul>
          </ul>
        </ul>
      </template>
    </ul>
  </div>
</template>
<script>
export default {
  name: "toc",
  methods: {
    isCurrent(hash, slug) {
      return decodeURI(hash) === `#${slug}`;
    }
  }
};
</script>

<style lang="stylus">
.toc {
  position: sticky;
  height: 450px;
  width: 100%;
  top: $navbarHeight + 1rem;
  font-size: 13px;
  list-style-type: square;
  background-color: #fff;
  box-sizing: border-box;
  padding: 10px;
  overflow hidden;
  h4 {
    // line-height 0
    margin: 0;
  }

  &-wrap {
    height: 400px;
    width: 100%;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  li {
    list-style-type: square;
  }
}

a {
  color: #000;
}

.current {
  color: $accentColor;
  border-right 8px solid $accentColor
  a {
    color: $accentColor;
  }
}
</style>
