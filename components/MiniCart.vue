<template>
    <div class="minicart-wrapper" :class="miniCart">
        <div class="shopping-cart-content" v-if="products.length > 0">
            <ul>
                <li class="single-shopping-item" v-for="(product, index) in products" :key="index">
                    <div class="shopping-item-img">
                        <n-link :to="`/product/${slugify(product.title)}`">
                            <img :src="product.images[0]" :alt="product.title">
                        </n-link>
                    </div>
                    <div class="shopping-item-title">
                        <h4>
                            <n-link :to="`/product/${slugify(product.title)}`">{{ product.title }}</n-link>
                        </h4>
                        <h6>Количество: {{ product.cartQuantity }}</h6>
                    </div>
                </li>
            </ul>
            <div class="shopping-cart-total">
                <h4>Всего товара : <span class="shop-total">${{ total.toFixed(2) }}</span></h4>
            </div>
            <div class="shopping-cart-btn btn-hover text-center">
                <n-link to="/cart" class="default-btn" @click="$emit('minicartClose')">Корзина</n-link>
                <n-link to="/checkout" class="default-btn" @click="$emit('minicartClose')">Проверка</n-link>
            </div>
        </div>
        <div class="shopping-cart-content text-center" v-else>
            <p>Корзина покупок пуста</p>
        </div>
    </div>
</template>
<script>
    export default {
        props: ["miniCart"],

        computed: {
            cartsItem() {
                return this.$store.getters.cartItemCount
            },
            products() {
                return this.$store.getters.getCart
            },
            total() {
                return this.$store.getters.getTotalCart
            }
        },
        methods: {
            slugify(text) {
                return text
                    .toString()
                    .toLowerCase()
                    .replace(/\s+/g, "-") // Replace spaces with -
                    // .replace(/[^\w-]+/g, "") // Remove all non-word chars
                    .replace(/--+/g, "-") // Replace multiple - with single -
                    .replace(/^-+/, "") // Trim - from start of text
                    .replace(/-+$/, ""); // Trim - from end of text
            }
        },
    }
</script>