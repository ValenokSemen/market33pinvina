<template>
    <div class="contact-are pt-80 pb-100">
        <div class="container">
            <div class="row" v-for="(contact, index) in contactData" :key="index" :class="{'mb-70': index != Object.keys(contactData).length - 1}">
                <div class="col-lg-6 col-md-6 col-12">
                    <div class="contact-info-block">
                        <div class="contact-address">
                            <h5>{{ contact.title }}</h5>
                            <div class="info-box">
                                <div class="contact-address-wrapper">
                                <div class="icon-box flex-shrink-0">
                                    <i class="pe-7s-map-marker"></i>
                                </div>
                                <div class="icon-box-content">
                                    <p class="icon-box-title">Адрес</p>
                                    <p class="icon-box-description">{{contact.address}}</p>
                                </div>
                            </div>
                            <div class="contact-address-wrapper">
                                <div class="icon-box flex-shrink-0">
                                    <i class="pe-7s-phone"></i>
                                </div>
                                <div class="icon-box-content">
                                    <p class="icon-box-title">Контактный телефон</p>
                                    <p class="icon-box-description">{{contact.phone}}</p>
                                </div>
                            </div>
                            <div class="contact-address-wrapper">
                                <div class="icon-box flex-shrink-0">
                                    <i class="pe-7s-clock"></i>
                                </div>
                                <div class="icon-box-content">
                                    <p class="icon-box-title">Время работы</p>
                                    <p class="icon-box-description">
                                        Понедельник - Пятница:    09:30 - 17:30 <br>
                                        Суббота и Воскресенье:    10:00 - 15:00
                                    </p>
                                </div>

                            </div>
                            <div class="contact-address-wrapper">
                                <div class="icon-box flex-shrink-0">
                                    <i class="pe-7s-mail-open"></i>
                                </div>
                                <div class="icon-box-content">
                                    <p class="icon-box-title">Почта для связи</p>
                                    <p class="icon-box-description">{{contact.email}}</p>
                                </div>

                            </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                    <div class="contact-map">
                        <iframe class="map-size" :src="contact.map" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import contactData from "@/data/contact.json";
export default {
    data() {
        return {
            contactData
        }
    },
}
</script>