<template>
  <ul class="toc">
        <template v-for="header in $page.headers">
          <li v-if="header.level === 1" :key="header.slug">
            <a :href="`#${header.slug}`">{{header.title}}</a>
          </li>
          <ul v-if="header.level === 2">
            <li :key="header.slug">
              <a :href="`#${header.slug}`">{{header.title}}</a>
            </li>
          </ul>
          <ul v-if="header.level === 3">
            <ul>
              <li :key="header.slug">
                <a :href="`#${header.slug}`">{{header.title}}</a>
              </li>
            </ul>
          </ul>
          <ul v-if="header.level === 4">
            <ul>
              <ul>
                <li :key="header.slug">
                  <a :href="`#${header.slug}`">{{header.title}}</a>
                </li>
              </ul>
            </ul>
          </ul>
          <ul v-if="header.level === 4">
            <ul>
              <ul>
                <ul>
                  <li :key="header.slug">
                    <a :href="`#${header.slug}`">{{header.title}}</a>
                  </li>
                </ul>
              </ul>
            </ul>
          </ul>
        </template>
      </ul>
</template>
<style lang="stylus">

  .toc {
    position: sticky;
    height: 450px;
    width: 100%;
    top: $navbarHeight + 2rem;
    overflow-y: scroll;
    font-size: 13px;
    list-style-type: square;

    li {
      list-style-type: square;
    }
  }

  a {
    color: #000;
  }
</style>
