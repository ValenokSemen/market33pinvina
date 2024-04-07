<template>
    <div class="product-wrap-2 mb-25">
        <div class="product-img">
            <n-link :to="`/product/${slugify(product.title)}`">
                <img class="default-img" :src="product.images[0]" :alt="product.title">
                <img class="hover-img" :src="product.images[1]" :alt="product.title">
            </n-link>
            <div class="product-badges">
                <span class="product-label green" v-if="product.new">Новый</span>
                <span class="product-label gold" v-if="product.discount">-{{ product.discount }}%</span>
            </div>
            <div class="product-action" v-if="layout === 'threeColumn' || layout === 'twoColumn'">
                <div class="product-item-action cart">
                    <n-link :to="`/product/${slugify(product.title)}`" class="btn" v-if="product.variation">
                        Выбрать варианты
                    </n-link>
                    <button class="btn" title="Add to Cart" @click="addToCart(product)" v-else>
                        <i class="pe-7s-cart"></i> 
                        Добавить в корзину
                    </button>
                </div>
                <div class="product-item-action quickview">
                    <button class="btn" title="Quick View" @click="onClick()"> 
                        <i class="pe-7s-look"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="product-content-2">
            <div class="product-title-wrap-2">
                <h3>
                    <n-link :to="`/product/${slugify(product.title)}`">{{ product.title }}</n-link>
                </h3>
                <div class="price-2">
                    <span>{{ discountedPrice(product).toFixed(2) }}</span>
                    <span class="price" v-if="product.discount > 0">{{ product.price.toFixed(2) }}</span>
                </div>
            </div>
            <div class="product-whishlist-2">
                <button @click="addToWishlist(product)"><i :class="isLike(product)"></i></button>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        props: ["product", "layout"],
        methods: {
            addToCart(product){
                const prod = {...product, cartQuantity: 1}
                // for notification
                if (this.$store.state.cart.find(el => product.id === el.id)) {
                    this.$notify({type: 'warn', title: 'Товар уже добавлен в корзину' })
                } else {
                    this.$notify({type: 'success', title: 'Товар успешно добавлен в корзину!'})
                }

                this.$store.dispatch('addToCartItem', prod)
            },
            isLike(product){
                return this.$store.getters.getWishlist.find((item) => item.id === product.id)? 'fa fa-heart' : 'fa fa-heart-o'

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
            discountedPrice(product) {
                return product.price - (product.price * product.discount / 100)
            },
            slugify(text) {
                return text
                    .toString()
                    .toLowerCase()
                    .replace(/\s+/g, "-") // Replace spaces with -
                    // .replace(/[^\w-]+/g, "") // Remove all non-word chars
                    .replace(/--+/g, "-") // Replace multiple - with single -
                    .replace(/^-+/, "") // Trim - from start of text
                    .replace(/-+$/, ""); // Trim - from end of text
            },
            onClick() {
                this.$notify({
                    title: "Товар добавлен в корзину"
                });
            },
        }
    }
</script>