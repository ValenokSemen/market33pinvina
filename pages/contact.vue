<template>
    <section>
        <Breadcrumb pageTitle="контакты" />
        <ContactInfo />
        <TheFooter />
    </section>
</template>

<script>
export default {
    components: {
        ContactInfo: () => import('@/components/ContactInfo')
    },
    beforeMount() {
        this.$emit("setBodyClass", 'shop-page-wrapper')
    },
    head() {
            return {
                title: "Контакты"
            }
        }
}
</script>