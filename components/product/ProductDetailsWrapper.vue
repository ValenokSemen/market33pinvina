<template>
  <div class="shop-area pt-80 pb-80">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="product-detail-slider">
            <div class="product-detail-img">
              <div class="product-bages">
                <span class="product-label green" v-if="product.new"
                  >Новый</span
                >
                <span class="product-label gold" v-if="product.discount"
                  >-{{ product.discount }}%</span
                >
              </div>
              <swiper :options="swiperOptionImage" ref="swiperImg">
                <div
                  class="large-img swiper-slide"
                  v-for="(image, index) in product.images"
                  :key="index"
                >
                  <img class="img-fluid" :src="image" :alt="product.title" />
                </div>
                <div class="quickview-nav swiper-button-prev">
                  <i class="pe-7s-angle-left"></i>
                </div>
                <div class="quickview-nav swiper-button-next">
                  <i class="pe-7s-angle-right"></i>
                </div>
              </swiper>
              <swiper
                class="mt-2"
                :options="swiperOptionThumbs"
                ref="swiperThumbs"
              >
                <div
                  class="thumb-img swiper-slide"
                  v-for="(image, index) in product.images"
                  :key="index"
                >
                  <img class="img-fluid" :src="image" :alt="product.title" />
                </div>
              </swiper>
            </div>
          </div>
        </div>
        <div class="col lg-6 col-md-6">
          <div class="product-details-content ml-70">
            <h2>{{ product.title }}</h2>
            <div class="product-details-price">
              <span>{{ discountedPrice(product).toFixed(2) }}</span>
              <span class="old" v-if="product.discount > 0">{{
                product.price.toFixed(2)
              }}</span>
            </div>
            <p>
              {{ product.description }}
            </p>
            <div class="mt-2 link-inherit fs-xs">
              <p>
                <strong class="text-title me-3">Доступность :</strong
                ><i
                  class="fa me-2 ms-1"
                  :class="[
                    product.stock > 0 ? 'fa-check-square-o' : 'fa-square-o',
                  ]"
                ></i
                >{{
                  product.stock > 0
                    ? "В наличии " + product.stock
                    : "Нет в наличии"
                }}
              </p>
            </div>
            <div class="pro-details-variation">
              <div class="pro-details-size-wrap">
                <h6 class="label">Размер упаковки:</h6>
                <div class="pro-details-size-content">
                  <label
                    class="radio"
                    v-for="(item, index) in product.variation.sizes"
                    :key="index"
                  >
                    <input type="radio" name="sizeGroup" />
                    <span class="check-mark" @click="slideTo(index)">{{
                      item
                    }}</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="pro-details-quality">
              <div class="cart-plus-minus">
                <button @click="decreaseQuantity()" class="dec qtybutton">
                  -
                </button>
                <input
                  class="cart-plus-minus-box"
                  type="text"
                  :value="singleQuantity"
                  readonly
                />
                <button @click="increaseQuantity()" class="inc qtybutton">
                  +
                </button>
              </div>
              <div class="pro-details-add-cart btn-hover">
                <button @click="addToCart(product)">Добавить в корзину</button>
              </div>
              <div class="pro-details-wishlist">
                <button @click="addToWishlist(product)" title="wishlist">
                  <i :class="isLike(product)"></i>
                </button>
              </div>
              <div class="pro-details-compare"></div>
            </div>
            <div class="pro-details-meta">
              <span class="label">Категория:</span>
              <ul>
                <li v-for="(category, index) in product.category" :key="index">
                  <span>{{ category }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductDetailWrapper",
  props: ["product"],

  data() {
    return {
      singleQuantity: 1,

      swiperOptionImage: {
        loop: false,
        // speed: 750,
        slidesPerView: 1,
        spaceBetween: 10,
        // loopedSlides: 5,
        // autoplay: {
        //   delay: 6000,
        // },
        effect: "fade",
        fadeEffect: {
          crossFade: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      swiperOptionThumbs: {
        loop: false,
        spaceBetween: 10,
        slidesPerView: "auto",
        centeredSlides: true,
        // freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        slideToClickedSlide: true,
        // loopedSlides: 5, // looped slides should be the same
      },
    };
  },
  mounted() {
    this.$nextTick(() => {
      const swiperImg = this.$refs.swiperImg.$swiper;
      const swiperThumbs = this.$refs.swiperThumbs.$swiper;
      swiperImg.controller.control = swiperThumbs;
      swiperThumbs.controller.control = swiperImg;
      setTimeout(() => swiperImg.navigation.update(), 0)
    });
  },
  methods: {
    increaseQuantity() {
      if (this.product.quantity > this.singleQuantity) this.singleQuantity++;
    },
    addToCart(product) {
      const prod = { ...product, cartQuantity: this.singleQuantity };
      // for notification
      if (this.$store.state.cart.find((el) => product.id === el.id)) {
        this.$notify({ title: "Товар в корзине успешно обновлен!" });
      } else {
        this.$notify({ title: "Товар добавлен в корзину!" });
      }
      this.$store.dispatch("addToCartItem", prod);
    },
    isLike(product){
        return this.$store.getters.getWishlist.find((item) => item.id === product.id)? 'fa fa-heart' : 'fa fa-heart-o'
    },

    decreaseQuantity() {
      if (this.singleQuantity > 1) this.singleQuantity--;
    },
    discountedPrice(product) {
      return product.price - (product.price * product.discount) / 100;
    },
    addToWishlist(product) {
      // for notification
      if (this.$store.state.wishlist.find((el) => product.id === el.id)) {
        this.$notify({ type: 'warn', title: "Товар уже присутствует в избранное!" });
      } else {
        this.$notify({ type: 'success', title: "Товар успешно добавлен в избранное!" });
      }
      this.$store.dispatch("addToWishlist", product);
    },
    slideTo(id) {
      this.$nextTick(() => {
        this.$refs.swiperImg.$swiper.slideTo(id, 1000, true);
      });
    },
    slugify(text) {
      return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/[^\w-]+/g, "") // Remove all non-word chars
        .replace(/--+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, ""); // Trim - from end of text
    },
  },
};
</script>
