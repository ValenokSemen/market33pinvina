<template>
    <section>
        <Breadcrumb :pageTitle="product.title" :detail="{link: '/shop', name: 'Ассортимент'}"  />
        <ProductDetailsWrapper :product="product" />
        <ProductDetailsDescriptionReview :product="product"/>
        <ProductRelativeCarusel :product="product"/>
    </section>
</template>

<script>
export default {
    components: {
        ProductDetailsWrapper: () => import('@/components/product/ProductDetailsWrapper.vue'),
        ProductDetailsDescriptionReview: () => import('@/components/product/ProductDetailsDescriptionReview.vue'),
        ProductRelativeCarusel: () => import('@/components/product/ProductRelativeCarusel.vue'),
    },
    data() {
        return {
            slug: this.$route.params.slug
        }
    },
    computed: {
        product() {
            return this.$store.getters.getProducts.find(product => this.slugify(product.title) == this.slug)
        }
    },
    beforeMount() {
        this.$emit("setBodyClass", 'product-detail-page-wrapper')
        if (process.client) {
            this.$store.commit("UPDATE_SEARCH", false);
        }
    },

    head() {
        return {
            title: this.product.title
        }
    },
    methods: {
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
    }
}
</script>