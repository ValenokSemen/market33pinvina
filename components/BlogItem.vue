<template>
    <div class="blog-wrap">
        <div class="blog-img">
            <n-link :to="`/blog/${slugify(blog.title)}`">
                <img :src="blog.imgsrc" :alt="blog.title">
            </n-link>
            <span>{{ blog.category[0] }}</span>
        </div>
        <div class="blog-content-wrap">
            <div class="blog-content text-center">
                <div class="date">
                    <span>{{dateFormat(blog.inserted_at)}}</span>
                </div>
                <h3>
                    <n-link :to="`/blog/${slugify(blog.title)}`">{{ blog.title }}</n-link>
                </h3>
                <span>{{ blog.descriptions }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BlogItem",
        props: ['blog'],

        methods: {
            dateFormat(item) {
                return new Date(item).toLocaleDateString('ru-RU');
            },
            slugify(text) {
                return text
                    .toString()
                    .toLowerCase()
                    .replace(/\s+/g, "-") // Replace spaces with -
                    .replace(/[^\w-]+/g, "") // Remove all non-word chars
                    .replace(/--+/g, "-") // Replace multiple - with single -
                    .replace(/^-+/, "") // Trim - from start of text
                    .replace(/-+$/, ""); // Trim - from end of text
            }
        }
    }
</script>