<template>
  <div class="blog-area pb-55">
    <div class="container">
      <SectionTitleWithSubTitle
        title="Блог Пингвинов"
        classes="section-title mb-55"
        v-if="isHeaderTitle ? true : false"
      />
      <div class="row">
        <div
          class="col-lg-4 col-sm-6"
          v-for="(blog, index) in getItems"
          :key="index"
        >
          <BlogItem :blog="blog" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isHeaderTitle"],
  components: {
    BlogItem: () => import("@/components/BlogItem"),
  },
  computed: {
    getItems() {
      return this.getBlogData.slice(0, 3);
    },
    getBlogData() {
      return this.$store.getters["blog/getBlogData"];
    },
  },
  async fetch() {
    if (!this.$store.state.blog.blog.length) {
      await this.$store.dispatch("blog/setBlogData");
    }
  },
};
</script>
