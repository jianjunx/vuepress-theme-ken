<template>
  <div class="author" @click="goto">
    <SideCard title="作者">
      <div class="author-content">
        <img :src="author.avatar_url" :alt="author.login" />
        <div class="author-content_title">
          <h3>{{author.name}}</h3>
          <span>{{author.login}}</span>
        </div>
      </div>
      <div class="author-foot">
        <span>Repos: {{author.public_repos}}</span>
        <span>Follow: {{author.following}}</span>
      </div>
    </SideCard>
  </div>
</template>
<script>
import SideCard from "./SideCard";
import request from "../util/request";

export default {
  name: "AuthorCard",
  data: () => ({
    author: {}
  }),
  components: { SideCard },
  created() {
    this.getAuthor();
  },
  methods: {
    async getAuthor() {
      const { github = "jaykenxie" } = this.$themeConfig.author;
      try {
        const res = await request.get("/users/" + github);
        this.author = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    goto() {
      const { html_url = "/" } = this.author;
      window.open(html_url);
    }
  }
};
</script>
<style lang="stylus" scoped>
.author {
  cursor: pointer;
}

.author-content {
  display: flex;

  img {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    margin-right: 16px;
  }

  &_title {
    h3 {
      margin: 0;
    }
  }
}

.author-foot {
  display: flex;
  width: 100%;
  border-top: 1px solid #f1f1f1;
  margin-top: 20px;

  span {
    text-align: center;
    width: 50%;
    height: 32px;
    line-height: 32px;
    margin-top: 10px;
  }

  span:first-child {
    border-right: 1px solid #f1f1f1;
  }
}
</style>
