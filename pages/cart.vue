<template>
    <section>
        <Breadcrumb pageTitle="Корзина" />
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
                                        <th>Кол-во</th>
                                        <th>Итого</th>
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
                                        <td class="product-quantity">
                                            <div class="cart-plus-minus">
                                                <button @click="decrementProduct(product)" class="dec qtybutton">-</button>
                                                <input class="cart-plus-minus-box" type="text" :value="product.cartQuantity" readonly>
                                                <button @click="incrementProduct(product)" class="inc qtybutton">+</button>
                                            </div>
                                        </td>
                                        <td class="product-subtotal">{{ product.total.toFixed(2) }}</td>
                                        <td class="product-remove">
                                            <button @click="removeProduct(product)"><i class="fa fa-times"></i></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="cart-shipping-wrapper">
                                    <div class="cart-shipping">
                                        <n-link to="/shop">Продолжить покупки</n-link>
                                    </div>
                                    <div class="cart-clear">
                                        <button @click="clearCart()">Очистить корзину</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-4 col-md-6"></div>
                            <div class="col-lg-4 col-md-6">
                                <div class="coupon-wrapper">
                                    <div class="title-wrap">
                                        <h4 class="cart-bottom-title section-bg-gray">Применить купон</h4>
                                    </div>
                                    <div class="coupon-form">
                                        <p>Введите номер купона, если он в у вас есть</p>
                                        <form action="">
                                            <input type="text" required="" name="name">
                                            <button class="cart-btn-2" type="submit">Применить Купон</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                                <div class="total-wrapper">
                                    <div class="title-wrap">
                                        <h4 class="cart-bottom-title section-bg-gray">Итоговая цена</h4>
                                    </div>
                                    <h5>Стоимость товара <span>{{ total.toFixed(2) }}</span></h5>
                                    <h4 class="total-title">Итоговая стоимость  <span>{{ total.toFixed(2) }}</span></h4>
                                    <n-link to="/checkout">Продолжить оформление</n-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12" v-else>
                        <div class="empty-cart text-center">
                            <div class="icon"><i class="pe-7s-cart"></i></div>
                            <h4>Нет доступных доваров в корзине</h4>
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
    data() {
            return {
                singleQuantity: 1
            }
        },
    computed: {
        products() {
            return this.$store.getters.getCart
        },

        total() {
            return this.$store.getters.getTotalCart
        },
    },
    beforeMount() {
        this.$emit("setBodyClass", 'cart-page-wrapper')
    },
    methods: {
        incrementProduct(product) {
            const prod = { ...product, cartQuantity: 1 }
            if (product.cartQuantity < product.quantity) {
                this.$store.dispatch('addToCartItem', prod)
            }
        },

        decrementProduct(product) {
            const prod = { ...product, cartQuantity: 1 }
            if (product.cartQuantity > 1) {
                this.$store.dispatch('decreaseProduct', prod)
            }
        },
        discountedPrice(product) {
                return product.price - (product.price * product.discount / 100)
            },
        removeProduct(product) {
                // for notification
                this.$notify({type: 'success', title: 'Товар удален из корзины!'})
                this.$store.dispatch('removeProductFromCart', product)
            },
        clearCart() {
            if (confirm("Вы уверенны, что хотите очистить корзину")) {
                // for notification
                this.$notify({type: 'success', title: 'Корзина успешно очищенна!'})
                this.$store.commit('CLEAR_CART')
            }
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
    head() {
        return {
            title: "Корзина"
        }
    },
}
</script>