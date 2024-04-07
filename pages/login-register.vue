<template>
    <section>
        <Breadcrumb pageTitle="Вход/Регистрация" />
        <div class="login-register-area pt-80 pb-100">
            <div class="container">
                <div class="login-register-tab-list nav">
                    <button @click="comA('Login')" :class="{active: isActive === 'Login'}">Вход</button>
                    <button @click="comA('Register')" :class="{active: isActive === 'Register'}">Регистрация</button>
                </div>
                <div class="row">
                    <div class="col-lg-7 col-12 ms-auto me-auto">
                        <component :is="isActive" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        components: {
            TheFooter: () => import("@/components//TheFooter.vue"),
        },
        data() {
            return {
                isActive: 'Login'
            }
        },
        beforeMount() {
            this.$emit("setBodyClass", 'shop-page-wrapper')
        },
        mounted() {
            this.updateData()
        },
        watch: {
            $route(to, from) {
                this.isActive = this.$route.query.plan;  
            }
        },
        methods: {
            updateData(){
                if( Object.keys(this.$route.query).length === 0){
                    this.isActive = 'Login';
                } else {
                    this.isActive = this.$route.query.plan;
                }
            },
            comA(item) {
                this.isActive = item
            }
        },
        head() {
            return {
                title: "Login / Register"
            }
        }
    }
</script>