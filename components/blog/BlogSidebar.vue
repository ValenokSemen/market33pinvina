<template>
    <div class="blog-sidebar">
        <div class="sidebar-widget">
            <h4 class="sidebar-title">Категории</h4>
            <div class="sidebar-tag mt-25">
                <ul>
                    <li v-for="(cat, index) in getTag" :key="index">
                        <n-link :to="{ name: 'blog', params: { category: slugify(cat) }}">{{ cat }}</n-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        getTag(){
            return this.$store.getters['blog/tagList']
        }
    },
    methods: {
        slugify(text) {
            return (
                text
                .toString()
                .toLowerCase()
                .replace(/\s+/g, "-") // Replace spaces with -
                // .replace(/[^\w-]+/g, "") // Remove all non-word chars
                .replace(/--+/g, "-") // Replace multiple - with single -
                .replace(/^-+/, "") // Trim - from start of text
                .replace(/-+$/, "")
                ); // Trim - from end of text
            },
        },
}
</script>