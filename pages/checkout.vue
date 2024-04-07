<template>
    <section>
        <Breadcrumb pageTitle="оформление заказа" />
        <div class="checkout-area pt-80 pb-100">
            <!-- Checkout content -->
            <div class="container">
                <div class="row" v-if="products.length > 0" >
                    <div class="col-lg-7">
                        <div class="info-detail">
                            <h3>Контактная информация</h3>
                            <div class="row">
                                <div class="col-lg-6 col-md-6">
                                    <div class="contact-info mb-20">
                                        <label for="">Имя</label>
                                        <input type="text">
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="contact-info mb-20">
                                        <label for="">Фамилия</label>
                                        <input type="text">
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="contact-select mb-20">
                                        <label>Город</label>
                                        <select>
                                            <option>Санкт-Петербург</option>
                                            <option>Москва</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="contact-info mb-20">
                                        <label>Адрес доставки</label>
                                        <input class="contact-address" placeholder="Улица и номер дома" type="text">
                                        <input placeholder="Номер квартиры, подъезд и этаж" type="text">
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="contact-info mb-20">
                                        <label>Телефон</label>
                                        <input type="text">
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="contact-info mb-20">
                                        <label>Email</label>
                                        <input type="text">
                                    </div>
                                </div>
                                <div class="additional-info-wrapper">
                                <h4>Дополнительная информация</h4>
                                <div class="additional-info">
                                    <label>Детали заказа</label>
                                    <textarea placeholder="Укажите дополнительные детали к вашему заказу..." name="message"></textarea>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="order-detail">
                            <h3>Детали заказа</h3>
                            <div class="order-wrap">
                                <div class="order-product-info">
                                    <div class="order-top">
                                        <ul>
                                            <li>Товар</li>
                                            <li>Итого</li>
                                        </ul>
                                    </div>
                                    <div class="order-middle">
                                        <ul>
                                            <li v-for="(product, index) in products" :key="index">
                                                <span class="order-middle-left">{{ product.title }} X {{ product.cartQuantity }} шт</span>
                                                <span class="order-price">{{ product.total.toFixed(2) }}</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="order-total">
                                        <ul>
                                            <li class="li-order-total">Итого</li>
                                            <li>{{ total.toFixed(2) }}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="place-order mt-35">
                                    <button class="btn-hover" @click="createOrder()">Разместить заказ</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" v-else>
                    <div class="col-12">
                        <div class="empty-cart text-center">
                            <div class="icon"><i class="pe-7s-cart"></i></div>
                            <h4>Нет доступных доваров для оформления</h4>
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
        createOrder(){
            this.$router.push('order-success')
        }
    },
    head() {
            return {
                title: "Оформление заказа"
            }
        },
    
}
</script>