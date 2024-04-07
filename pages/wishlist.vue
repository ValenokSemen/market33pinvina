<template>
    <section>
        <Breadcrumb pageTitle="Избранное" />
        <div class="cart-area pt-80 pb-100">
            <div class="container">
                <div class="row">
                    <div class="col-12" v-if="products.length > 0">
                        <h3 class="cart-page-title">Товары в вашей корзине</h3>
                        <div class="table-content table-responsive cart-table-content">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Изображение</th>
                                        <th>Наименование</th>
                                        <th>Цена, шт</th>
                                        <th>Добавить в корзину</th>
                                        <th>Действие</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(product, index) in products" :key="index">
                                        <td class="product-tmb">
                                            <n-link :to="`/product/${slugify(product.title)}`">
                                                <img :src="product.images[0]" :alt="product.title">
                                            </n-link>
                                        </td>
                                        <td class="product-name">
                                            <n-link :to="`/product/${slugify(product.title)}`">{{ product.title }}</n-link>
                                        </td>
                                        <td class="product-price-cart">
                                            <span class="amount">{{ discountedPrice(product).toFixed(2) }}</span>
                                            <del class="old">{{ product.price.toFixed(2) }}</del>
                                        </td>
                                       
                                        <td class="product-wishlist-cart"><button @click="addToCart(product)">Добавить в корзину</button></td>
                                        <td class="product-remove">
                                            <button @click="removeProductFromWishlist(product)"><i class="fa fa-times"></i></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="col-12" v-else>
                        <div class="empty-cart text-center">
                            <div class="icon"><i class="pe-7s-like"></i></div>
                            <h4>Нет доступных доваров в избранном</h4>
                            <n-link to="/shop" class="empty-cart_button">В магазин</n-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    beforeMount() {
        this.$emit("setBodyClass", 'cart-page-wrapper')
    },
    computed: {
        products() {
            return this.$store.getters.getWishlist
        },
    },
    methods: {
            
            removeProductFromWishlist(product) {
                // for notification
                this.$notify(
                    {
                        type: 'success', 
                        title: 'Товар удален из избранного!'
                    }
                )
                
                this.$store.dispatch('removeProductFromWishlist', product)
            },
            addToCart(product) {
                const prod = { ...product, cartQuantity: 1 };
                // for notification
                if (this.$store.state.cart.find((el) => product.id === el.id)) {
                    this.$notify({ type: 'warn', title: "Товар в корзине успешно обновлен!" });
                } else {
                    this.$notify({ type: 'success', title: "Товар добавлен в корзину!" });
                }
                this.$store.dispatch("addToCartItem", prod);
            },

            discountedPrice(product) {
                return product.price - (product.price * product.discount / 100)
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
            }
        },
    head() {
        return {
        title: "Избранное",
        };
    },
}
</script>