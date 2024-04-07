<template>
  <div class="product-relative-area pb-60 position-relative">
    <div class="container">
      <div class="section-title-2 mb-50">
        <h2>Похожие товары</h2>
      </div>
      <div
        class="product-carousel product-carousel-nav-center position-relative"
      >
        <swiper :options="sliderRelativeCarusel">
          <div
            class="swiper-slide"
            v-for="(product, index) in relatedProducts(product.category[0], product.id).slice(0,8)"
            :key="index"
          >
            <ProductGridItem :product="product" :layout="layout" />
          </div>
        </swiper>
        <div class="product-relative-carousel-nav swiper-button-prev">
          <i class="pe-7s-angle-left"></i>
        </div>
        <div class="product-relative-carousel-nav swiper-button-next">
          <i class="pe-7s-angle-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  props: ["product"],
  data() {
    return {
      layout: "threeColumn",
      sliderRelativeCarusel: {
        // loop: true,
        speed: 750,
        spaceBetween: 30,
        slidesPerView: 4,
        autoplay: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },

        // Responsive breakpoints
        breakpoints: {
          320: {
            slidesPerView: 1,
          },
          480: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          992: {
            slidesPerView: 4,
          },
        },
      },
    };
  },
  computed: {
    products() {
      return this.$store.getters.getProducts;
    },
  },

  methods: {
    relatedProducts(cat, id) {
        return this.products.filter((item) => {
            if(item.category.find(i => i === cat)) {
                if(item.id !== id && item.best === true) {
                    return item
                }
            }
        })
    }
  }
};
</script>
