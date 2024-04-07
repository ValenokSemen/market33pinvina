<template>
    <section>
        <Breadcrumb pageTitle="Ваш Заказ" />
        <div class="order-success-area pt-80 pb-100">
            <!-- Order Success -->
            <div class="container">
                <div class="row pb-70" v-if="order">
                    <div class="col-12">
                        <div class="succes-order-wrapper text-center">
                            <div class="icon"><i class="pe-7s-check"></i></div>
                            <h3>Спасибо за заказ</h3>
                            <p>
                                Платеж успешно обработан и ваш заказ <span>{{ order.token }}</span> уже собирается.
                            </p>
                            <p>
                                Статус заказа можно посмотреть в 
                                <nuxt-link :to="{ path: '/dashboard'}"> личном кабинете</nuxt-link>
                            </p>
                            <n-link to="/shop" class="succes-order-wrapper_button mt-25">Продолжить покупки</n-link>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6">
                        <div class="product-order">
                            <h3>Детали вашего заказа</h3>
                            <div class="row product-order-detail">
                                <div class="col-3">
                                    <img src="/img/product/icecream/1.png" alt="" class="img-fluid" />
                                </div>
                                <div class="col-3 order_detail-1">
                                <div>
                                    <h4>Название</h4>
                                    <h5>Стильная рубашка</h5>
                                </div>
                                </div>
                                <div class="col-3 order_detail-1">
                                <div>
                                    <h4>Кол-во</h4>
                                    <h5>4 шт.</h5>
                                </div>
                                </div>
                                <div class="col-3 order_detail-1">
                                <div>
                                    <h4>Цена</h4>
                                    <h5 class="amount">818</h5>
                                </div>
                                </div>
                            </div>
                            <div class="row product-order-detail">
                                <div class="col-3">
                                    <img src="/img/product/icecream/1.png" alt="" class="img-fluid" />
                                </div>
                                <div class="col-3 order_detail-1">
                                <div>
                                    <h4>Название</h4>
                                    <h5>Стильная рубашка</h5>
                                </div>
                                </div>
                                <div class="col-3 order_detail-1">
                                <div>
                                    <h4>Кол-во</h4>
                                    <h5>4 шт.</h5>
                                </div>
                                </div>
                                <div class="col-3 order_detail-1">
                                <div>
                                    <h4>Цена</h4>
                                    <h5 class="amount">818</h5>
                                </div>
                                </div>
                            </div>
                            <div class="total-sec">
                                <ul>
                                    <li>
                                        Итого
                                        <span>515</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="row order-success-sec">
                            <div class="col-sm-6">
                                <h4>Информация о заказе</h4>
                                <ul class="order-detail-1">
                                    <li>ID заказа: {{order.token}}</li>
                                    <li>Дата доставки: October 18, 2020</li>
                                </ul>
                            </div>
                            <div class="col-sm-6">
                                <h4>Информация о заказе</h4>
                                <ul class="order-detail-1">
                                    <li>Санкт-Петербург</li>
                                    <li>Невский пр. 88, кв. 64</li>
                                    <li>Индекс, 235153</li>
                                    <li>Контактный номер: 987456321</li>
                                </ul>
                            </div>
                            <div class="col-sm-12 payment-mode">
                                <h4>Метод оплаты</h4>
                                <p>Оплата при доставке</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'OrderSucces',
    data() {
        return {
            order: {
                token: '23d93cac-000f-5000-8000-126628f15141'
            }
        }
    },
    beforeMount() {
        this.$emit("setBodyClass", 'cart-page-wrapper')
    },
    head(){
        return {
            title: "Успешный заказ"
        }
    }
}
</script>