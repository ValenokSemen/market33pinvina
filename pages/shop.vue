<template>
  <section>
    <Breadcrumb pageTitle="Ассортимент" />
    <div class="my-shop-area pb-80 pt-100">
      <div class="container">
        <div class="row flex-row-reverse">
          <div class="col-lg-9">
            <div class="shop-top-bar">
              <div class="sort-selected">
                <div class="shop-select">
                  <select v-model="selectedPrice">
                    <option value="default">Без сортировки</option>
                    <option value="low2high">Цена - По возрастанию</option>
                    <option value="high2low">Цена - По уменьшению</option>
                  </select>
                </div>
                <p>
                  Отображается от {{ perPage * currentPage - perPage + 1 }} до
                  {{
                    perPage * currentPage > filterItems.length
                      ? filterItems.length
                      : perPage * currentPage
                  }}
                  из {{ filterItems.length }} товаров
                </p>
              </div>
              <div class="shop-viewer">
                <button :class="{ active: layout === 'twoColumn' }">
                  <i class="fa fa-th-large"></i>
                </button>
                <button :class="{ active: layout === 'threeColumn' }">
                  <i class="fa fa-th"></i>
                </button>
                <button :class="{ active: layout === 'list' }">
                  <i class="fa fa-list-ul"></i>
                </button>
              </div>
            </div>
            <div class="shop-bottom-area mt-35">
              <div
                class="row product-layout"
                :class="{
                  list: layout === 'list',
                  'grid three-column': layout === 'threeColumn',
                  'grid two-column': layout === 'twoColumn',
                }"
              >
                <div
                  class="col-xl-4 col-sm-6"
                  v-for="(product, index) in getItems"
                  :key="index"
                >
                  <ProductGridItem :product="product" :layout="layout" />
                </div>
              </div>
            </div>
            <div v-if="getPaginateCount > 1">
              <pagination
                class="pro-pagination-style shop-pagination mt-30"
                v-model="currentPage"
                :per-page="perPage"
                :records="filterItems.length"
                @paginate="paginateClickCallback"
                :options="options"
              />
            </div>
          </div>
          <div class="col-lg-3">
            <ShopSidebar @catFilters="catfilter" @sizeFilters="sizefilter" @priceVal="pricefilterArray" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  components: {
    TheHeaderWithTopBar: () => import("@/components/TheHeaderWithTopBar.vue"),
    Breadcrumb: () => import("@/components/Breadcrumb"),
    TheFooter: () => import("@/components//TheFooter.vue"),
    ProductGridItem: () => import("@/components/product/ProductGridItem"),
  },

  data() {
    return {
      perPage: 9,
      currentPage: 1,
      layout: "threeColumn",
      filterItems: [],
      catArray: [],
      priceArray: [],
      sizeArray: [],
      selectedPrice: "default",
      options: {
        theme: "bootstrap4",
        // edgeNavigation: false,
        chunksNavigation: "scroll",
        texts: {
          prevPage: <i class="fa fa-angle-left" aria-hidden="true"></i>,
          nextPage: <i class="fa fa-angle-right" aria-hidden="true"></i>,
        },
      },
    };
  },
  beforeMount() {
      this.$emit("setBodyClass", 'shop-page-wrapper')
  },
  computed: {
    products() {
      return this.$store.getters.getProducts;
    },
    getItems() {
      let start = (this.currentPage - 1) * this.perPage;
      let end = this.currentPage * this.perPage;
      return this.filterItems.slice(start, end);
    },
    getPaginateCount() {
      return Math.ceil(this.filterItems.length / this.perPage);
    },
  },
  mounted() {
    this.updateProductData();
  },

  methods: {

    updateFilterData() {
      this.filterItems = []
      this.products.filter((product) => {
        if (this.discountedPrice(product) >= this.priceArray[0] && this.discountedPrice(product) <= this.priceArray[1]) {
          this.filterItems.push(product)
        }
      })

      if (typeof this.catArray !== 'undefined' && this.catArray.length > 0){
        const resultData = this.filterItems.filter((product) => 
          product.category.find((category) => this.catArray.includes(category))
        )
        this.filterItems = [];
        this.filterItems.push(...resultData);
      }
      
      if (typeof this.sizeArray !== 'undefined' && this.sizeArray.length > 0){
        const resultData = this.filterItems.filter((product) => 
          product.variation.sizes.find((category) => this.sizeArray.includes(category))
        )
        this.filterItems = [];
        this.filterItems.push(...resultData);
      }       
    },

    catfilter(selectedVal) {
      this.catArray = selectedVal
      this.updateFilterData()
    },

    sizefilter(selectedVal) {
      this.sizeArray = selectedVal
      this.updateFilterData()
    },

    pricefilterArray(payload) {
      this.priceArray = payload
      this.updateFilterData()
      
    },
    discountedPrice(product) {
      return product.price - (product.price * product.discount / 100)
    },

    paginateClickCallback(page) {
      this.currentPage = Number(page);
    },
    updateProductData() {
      this.paginateClickCallback(1);

      const categoryName = this.$route.query.cat;
      const colorName = this.$route.query.color;

      if (Object.keys(this.$route.query).length === 0) {
        this.filterItems = [...this.products];
      }
    },
    discountedPrice(product) {
      return product.price - (product.price * product.discount) / 100;
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
  watch: {
    selectedPrice() {
      switch (this.selectedPrice) {
        case "low2high":
          this.filterItems = this.filterItems.sort(
            (a, b) => this.discountedPrice(a) - this.discountedPrice(b)
          );
          break;
        case "high2low":
          this.filterItems = this.filterItems.sort(
            (a, b) => this.discountedPrice(b) - this.discountedPrice(a)
          );
          break;
        default:
          this.filterItems = [...this.products];
      }
    },
  },

  head() {
    return {
      title: "Ассортимент мороженного",
    };
  },
};
</script>
