<template>
    <div>
        <div class="product-area pt-100 pb-90">
            <div class="container">
                <SectionTitleWithSubTitle title="Новые поступления" classes="section-title" v-if="isHeaderTitle ? true : false" />
                <ul class="nav product-tab-list pt-30 pb-50 justify-content-center">
                    <li v-for="(cat, index) in uniqFilterCategory" :key="index" class="nav-item" >
                        <button class="nav-link" :class="{'active': cat === selectedCat}" role="tab">{{ cat }}</button>
                    </li>
                </ul>
                <div class="row">
                    <div class="col-xl-3 col-lg-4 col-sm-6" v-for="(product, index) in filterData.slice(0,8)" :key="index">
                        <ProductGridItem :product="product" />
                    </div>
                </div>
                <div class="discover-more-btn btn-hover text-center mt-20 col-12">
                    <n-link :to="`/shop`">Больше товаров</n-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['isHeaderTitle'],

    data () {
        return {
            filterData: [],
            selectedCat: 'all'
        }
    },
 
    components: {
        SectionTitleWithSubTitle: () => import('@/components/SectionTitleWithSubTitle'),
        ProductGridItem: () => import('@/components/product/ProductGridItem')
    },

    computed: {
        products() {
                return this.$store.getters.getProducts
        },
        uniqFilterCategory() {
            return ['all', ...new Set(this.products.map((el) => el.category).flat())]
        }
    },
    mounted () {
        this.filterData.push(...this.products)
    }
}
</script>