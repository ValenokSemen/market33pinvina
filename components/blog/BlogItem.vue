<template>
    <div class="blog-wrap-2 mb-30">
        <div class="blog-img-2">
            <n-link :to="`/blog/${slugify(blog.title)}`">
                <img :src="blog.imgsrc" :alt="blog.title">
            </n-link>
        </div>
        <div class="blog-content-2">
            <div class="blog-meta-2">
                <ul>
                    <li> {{  dateFormat(blog.inserted_at) }}</li>
                    <li><i class="fa fa-user-o"></i> {{ blog.author }}</li>
                </ul>
            </div>
            <h4>
                <nuxt-link :to="`/blog/${slugify(blog.title)}`">{{ blog.title }}</nuxt-link>
            </h4>
            <p>{{ blog.descriptions }}</p>
            <div class="blog-share">
                <div class="blog-btn-2">
                    <nuxt-link :to="`/blog/${slugify(blog.title)}`">Далее</nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    props:['blog'],
    methods: {
        dateFormat(item) {
            return new Date(item).toLocaleDateString('ru-RU');
        },
        slugify(text) {
            return (
                text
                .toString()
                .toLowerCase()
                .replace(/\s+/g, "-") // Replace spaces with -
                .replace(/--+/g, "-") // Replace multiple - with single -
                .replace(/^-+/, "") // Trim - from start of text
                .replace(/-+$/, "")
            ); // Trim - from end of text
        },
    }
}
</script>