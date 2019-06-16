class Posts {
  constructor() {
    this.postList = [];
    this.current = [];
    this.tags = {};
  }
  find(f) {
    const { postList } = this;
    if (!f) {
      this.current = postList;
      return this;
    }
    const [key, val] = f;
    this.current = postList.filter(post => post[key].includes(val));
    return this;
  }
  sort() {
    this.current = this.current.sort((a, b) => {
      return b.lastUpdated - a.lastUpdated;
    });
    return this;
  }
  limit(no = 1, size = 10) {
    this.current = this.current.slice((no - 1) * size, size);
    return this;
  }
  end() {
    return this.current;
  }
  format(pages) {
    this.postList = pages.map(page => {
      const {
        lastUpdated,
        key,
        path,
        excerpt,
        title,
        frontmatter: { tags },
      } = page;
      this.formatTags(tags);
      return {
        lastUpdated,
        key,
        path,
        excerpt,
        title,
        tags: tags.join(','),
      };
    });
    return this;
  }
  formatTags(tag) {
    const { tags } = this;
    tag.forEach(t => {
      tags[t] || (tags[t] = 0);
      tags[t]++;
    });
  }
}

export default new Posts();
