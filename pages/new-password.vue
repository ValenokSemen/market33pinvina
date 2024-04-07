<template>
    <section>
        <Breadcrumb pageTitle="Изменение пароля" />
        <div class="new-password-area pt-80 pb-100">
            <div class="container">
                <div class="new-password-title">
                    <h3>Изменение пароля</h3>
                </div>
                <div class="row">
                    <div class="col-lg-7 col-12 ms-auto me-auto">
                        <NewPasswordForm />
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
            NewPasswordForm: () => import("@/components/NewPasswordForm.vue"),
        },
        beforeMount() {
            this.$emit("setBodyClass", 'shop-page-wrapper')
        },
        watch: {
            $route: {
                handler(to, from) {
                    this.$supabase.auth.onAuthStateChange((event, session) => {
                        if (event == "PASSWORD_RECOVERY") {
                            return this.$router.push('/new-password')
                        }
                        if (event == "INITIAL_SESSION") {
                            return this.$router.push('/new-password')
                        }
                        return this.$router.push('/')
                    })
                },
                immediate: true
            } 
        },
        head() {
            return {
                title: "New Password"
            }
        }
    }
</script>