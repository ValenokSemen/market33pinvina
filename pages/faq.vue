<template>
    <section>
        <Breadcrumb pageTitle="Вопрос и ответ" />
        <div class="my-faq-area pb-80 pt-100">

        </div>
    </section>
</template>


<script>
export default {
    components: {
        TheHeaderWithTopBar: () => import('@/components/TheHeaderWithTopBar.vue'),
        Breadcrumb: () => import("@/components/Breadcrumb"),
    },
    beforeMount() {
        this.$emit("setBodyClass", 'shop-page-wrapper')
    },

    head() {
        return {
            title: "Вопросы и ответы"
        }
    }
}
</script>