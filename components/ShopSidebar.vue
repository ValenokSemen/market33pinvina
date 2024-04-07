<template>
  <div class="sidebar-shop mr-30">
    <div class="sidebar-widget mt-30">
      <h4 class="sidebar-title">Цена товара</h4>
      <div class="range-slider-area mb-50 mt-25">
        <div class="price-amount">
          <span id="minAmount">{{ value[0] }}</span>
          <span id="maxAmount">{{ value[1] }}</span>
        </div>
        <vue-slider
          v-model="value"
          :min="0"
          :max="800"
          :lazy="true"
          :tooltip="'none'"
          :process-style="{ backgroundColor: '#0c8f98' }"
          ref="slider"
          @change="sliderChange($refs.slider.getValue())"
        >
          <template v-slot:dot="{ value, focus }">
            <div :class="['custom-dot', { focus }]"></div>
          </template>
        </vue-slider>
      </div>
    </div>
    <div class="sidebar-widget mt-30">
      <h4 class="sidebar-title">Категории</h4>
      <ul class="sidebar-list mt-20">
        <li
          class="sidebar-list-item"
          v-for="(cat, index) in catSidebarList"
          :key="index"
        >
          <input
            type="checkbox"
            class="custom-control-input"
            :value="cat"
            :id="slugify(cat)"
            v-model="applyFilter"
            @change="catFilters()"
          />
          <label class="custom-control-label" :for="slugify(cat)"
            ><span>{{ cat }}</span></label
          >
        </li>
      </ul>
    </div>

    <div class="sidebar-widget mt-30">
      <h4 class="sidebar-title">Форма выпуска</h4>
      <ul class="sidebar-list mt-20">
        <li
          class="sidebar-list-item"
          v-for="(size, index) in sizeList"
          :key="index"
        >
          <input
            type="checkbox"
            class="custom-control-input"
            :value="size"
            :id="slugify(size)"
            v-model="sizeFilter"
            @change="sizeFilters(size)"
          />
          <label class="custom-control-label" :for="slugify(size)"
            ><span>{{ size }}</span></label
          >
          <!-- <nuxt-link :to="`?color=${slugify(color)}`">
            <span class="check-mark"></span>
            {{ color }}
          </nuxt-link> -->
        </li>
      </ul>
    </div>
    <div class="sidebar-widget mt-30">
      <button class="submit" type="submit" @click="clearFilter()">Сброс фильтра</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShopSidebar",
  data() {
    return {
      value: [50, 550],
      applyFilter: [],
      sizeFilter: [],
    };
  },
  computed: {
    catSidebarList() {
      return this.$store.getters.categoryList;
    },
    sizeList() {
      return this.$store.getters.sizeList;
    },
    prices() {
      return this.$store.getters.priceList;
    },
  },
  mounted() {
    this.$emit("catFilters", this.applyFilter);
    this.$emit("sizeFilters", this.sizeFilter);
    this.uddateValueData();
    this.$emit("priceVal", this.value);
  },
  methods: {
    clearFilter() {
      this.applyFilter = []
      this.sizeFilter = []
      this.$emit('catFilters', [])
      this.$emit('sizeFilters', [])
      this.uddateValueData();
      this.$emit("priceVal", this.value);
    },
    sliderChange(event) {
      this.$emit("priceVal", event);
    },
    catFilters() {
      this.$emit('catFilters', this.applyFilter)
    },
    sizeFilters(val) {
      this.$emit('sizeFilters', this.sizeFilter)
    },
    uddateValueData() {
      this.value = [Math.min(...this.prices), Math.max(...this.prices)];
    },
    slugify(text) {
      return (
        text
          .toString()
          .toLowerCase()
          .replace(/\s+/g, "-") // Replace spaces with -
          // .replace(/[^\w-]+/g, "") // Remove all non-word chars
          .replace(/--+/g, "-") // Replace multiple - with single -
          .replace(/^-+/, "") // Trim - from start of text
          .replace(/-+$/, "")
      ); // Trim - from end of text
    },
  },
};
</script>

<style>
.custom-dot {
  width: 100%;
  box-sizing: border-box;
  transition-property: box-shadow, border-color;
  transition-duration: 0.3s, 0.3s;
  transition-timing-function: ease, ease;
  transition-delay: 0s, 0s;
  height: 100%;
  border-radius: 50%;
  border: 2px solid #39c7d1;
  background-color: #fff;
  transition: all 0.3s;
}
.custom-dot.focus {
  border-radius: 50%;
  border-color: #0c8f98;
  box-shadow: 0 0 0 5px rgba(54, 252, 255, 0.2);
}
</style>
