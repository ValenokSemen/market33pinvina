<template>
  <section>
    <SliderOne />
    <ProductWrapper :isHeaderTitle=true />
    <BlogWrapper :isHeaderTitle=true />
  </section>
</template>

<script>

export default {
  name: 'HomePage',
  components: {
    TheHeaderWithTopBar: () => import('@/components/TheHeaderWithTopBar.vue'),
    SliderOne: () => import('@/components/slider/SliderOne.vue'),
    ProductWrapper: () => import('@/components/product/ProductWrapper.vue'),
    BlogWrapper: () => import('@/components//BlogWrapper.vue'),
    TheFooter: () => import('@/components//TheFooter.vue'),
  },
  beforeMount() {
    this.$emit("setBodyClass", 'home-page-wrapper')
  }
};
</script>
