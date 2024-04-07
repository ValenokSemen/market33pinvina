<template>
    <div>
        <div :class="bodyClass">
            <TheHeaderWithTopBar containerClass="container" />
            <LazySearchBox />
            <Nuxt @setBodyClass="actionHandler"/>
            <TheFooter />
        </div>
        <client-only>
            <notifications position="bottom left" classes='vue-notification' />
        </client-only>
        <button class="scroll-top" @click="scrollToTop" :class="{'show': isVisible}">
            <i class="fa fa-angle-double-up"></i>
        </button>
    </div>
</template>


<script>

export default {
    name: "default",
    data() {
        return {
            isVisible: false,
            bodyClass: 'home-page-wrapper'
        }
    },
    methods: {
        scrollToTop() {
            window.scroll({
                top: 0,
                behavior: "smooth",
            });
        },
        actionHandler(val){
            this.bodyClass = val
        }
    },
    mounted() {
        window.addEventListener("scroll", () => {
            let scroll = window.scrollY;
            if (scroll >= 500) {
                this.isVisible = true;
            } else {
                this.isVisible = false;
            }
        })
    }
}
</script>