<template>
    <section>
        <Breadcrumb pageTitle="Восстановление пароля" />
        <div class="forgot-password-area pt-80 pb-100">
            <div class="container">
                <div class="forgot-password-title">
                    <h3>Восстановление пароля</h3>
                </div>
                <div class="row">
                    <div class="col-lg-7 col-12 ms-auto me-auto">
                        <ForgotPasswordForm />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


<script>
    export default {
        components: {
            TheFooter: () => import("@/components/TheFooter.vue"),
            ForgotPasswordForm: () => import("@/components/ForgotPasswordForm.vue"),
        },
        beforeMount() {
            this.$emit("setBodyClass", 'shop-page-wrapper')
        },
        head() {
            return {
                title: "Forgot Password"
            }
        }
    }
</script>