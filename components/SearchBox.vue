<template>
  <div class="search-parts">
    <div class="search-eveland box-search" :class="{ active: search }">
      <div class="drawer-search-top">
        <h3 class="drawer-search-title">Поиск по названию товара в каталоге</h3>
      </div>
      <form class="search-form">
        <input type="hidden" name="type" value="product" />
        <input
          type="text"
          name="q"
          v-model="searchString"
          @keyup="searchProduct"
          placeholder="Поиск товара"
          class="search-input"
        />
        <button class="set-20-svg" @click.prevent="searchProduct()">
          <!--?xml version="1.0" encoding="UTF-8" standalone="no"?-->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 400 400"
            height="400"
            width="400"
            id="svg2"
            version="1.1"
            xmlns:dc="http://purl.org/dc/elements/1.1/"
            xmlns:cc="http://creativecommons.org/ns#"
            xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
            xmlns:svg="http://www.w3.org/2000/svg"
            xml:space="preserve"
          >
            <metadata id="metadata8">
              <rdf>
                <work rdf:about="">
                  <format>image/svg+xml</format>
                  <type
                    rdf:resource="http://purl.org/dc/dcmitype/StillImage"
                  ></type>
                </work>
              </rdf>
            </metadata>
            <defs id="defs6"></defs>
            <g transform="matrix(1.3333333,0,0,-1.3333333,0,400)" id="g10">
              <g transform="scale(0.1)" id="g12">
                <path
                  id="path14"
                  style="fill-opacity: 1; fill-rule: nonzero; stroke: none"
                  d="m 1312.7,795.5 c -472.7,0 -857.204,384.3 -857.204,856.7 0,472.7 384.504,857.2 857.204,857.2 472.7,0 857.3,-384.5 857.3,-857.2 0,-472.4 -384.6,-856.7 -857.3,-856.7 z M 2783.9,352.699 2172.7,963.898 c 155.8,194.702 241.5,438.602 241.5,688.302 0,607.3 -494.1,1101.4 -1101.5,1101.4 -607.302,0 -1101.399,-494.1 -1101.399,-1101.4 0,-607.4 494.097,-1101.501 1101.399,-1101.501 249.8,0 493.5,85.5 687.7,241 L 2611.7,181 c 23,-23 53.6,-35.699 86.1,-35.699 32.4,0 63,12.699 86,35.699 23.1,22.801 35.8,53.301 35.8,85.898 0,32.602 -12.7,63 -35.7,85.801"
                ></path>
              </g>
            </g>
          </svg>
        </button>
      </form>
      <div class="drawer_back">
        <button class="modal-close" @click="setSearchForm(false)">
          <i class="fa fa-times"></i>
        </button>
      </div>
      <div class="result_prod">
        <div class="row search_results" v-if="!searchItems.length">
          <div class="col-12">
            <p :class="{'pl-30': loading}">{{ msg }}</p>
            <InlineLoader :loading=loading />
          </div>
        </div>
        <div class="row search_results" v-else>
          <div class="col-lg-4 col-sm-6 col-md-6" v-for="(product, index) in searchItems" :key="index">
            <ul class="prod_sidebar">
              <li class="product_info">
                <n-link :to="`/product/${slugify(product.title)}`"
                  ><img
                    :src="product.images[0]"
                    class="img-responsive w-100"
                /></n-link>
                <h4 class="title-product">
                  <n-link :to="`/product/${slugify(product.title)}`"
                    >{{product.title}}</n-link>
                </h4>
                <span
                  ><p class="price-product mb-0">
                    <span class="price">{{discountedPrice(product)}}</span
                    ><s class="price-old">{{product.price}}</s>
                  </p></span
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="bg_box-search" :class="{ active: search }"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchString: '',
      loading: false,
      msg: "Введите более двух букв для поиска."
    };
  },
  computed: {
    searchItems() {
      return this.$store.state.searchProduct
    },
    search() {
      return this.$store.getters.isSearch;
    },
  },
  methods: {
    setSearchForm(val) {
      this.$store.commit("UPDATE_SEARCH", val);
    },
    searchProduct(){
      try {
        this.msg = "Идет поиск ..."
        this.loading = true
        this.$store.dispatch('searchProduct', this.searchString)
      } catch (error) {
        this.msg = error
      } finally {
        this.loading = false
        this.msg = "Введите более двух букв для поиска."
      }
    },
    slugify(text){
        return (
            text
            .toString()
            .toLowerCase()
            .replace(/\s+/g, "-") // Replace spaces with -
            .replace(/--+/g, "-") // Replace multiple - with single -
            .replace(/^-+/, "") // Trim - from start of text
            .replace(/-+$/, "")
        ); // Trim - from end of text
    },
    discountedPrice(product) {
        return product.price - (product.price * product.discount / 100)
    },
  },
};
</script>
