<template>
    <section>
        <Breadcrumb :pageTitle="blog.title" :detail="{link: '/blog', name: 'Блог'}" />
        <div class="blog-details-inner pb-80 pt-100">
            <div class="container">
                <div class="row flex-row-reverse">
                    <div class="col-lg-9">
                        <div class="blog-details-wrapper">
                            <div class="blog-details-top">
                                <div class="blog-details-img">
                                    <img :src="blog.imgsrc" :alt="blog.title">
                                </div>
                                <div class="blog-details-content">
                                    <div class="blog-meta-2">
                                        <ul>
                                            <li> {{  dateFormat(blog.inserted_at) }}</li>
                                            <li><i class="fa fa-user-o"></i> {{ blog.author }}</li>
                                        </ul>
                                    </div>
                                    <h3>{{ blog.title }}</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprhendit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qei officia deser mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam. </p>
                                    <blockquote>Lorem ipsum dolor sit amet, consecte adipisicing elit, sed do eiusmod tempor incididunt labo dolor magna aliqua. Ut enim ad minim veniam quis nostrud.</blockquote> 
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehendrit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                </div>
                            </div>
                            <div class="tag-share">
                                <div class="dec-tag">
                                    <ul>
                                        <li v-for="(cat, index) in blog.category" :key="index">
                                            <n-link :to="`/blog?${slugify(cat)}`">{{cat}}</n-link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="next-previous-post" :class="{'justify-content-end': !prevLink, 'justify-content-start': !nextLink} ">
                                <n-link :to="`/blog/${slugify(prevLink.title)}`" v-if="prevLink"> <i class="fa fa-angle-left"></i> предыдущий</n-link>
                                <n-link :to="`/blog/${slugify(nextLink.title)}`" v-if="nextLink">следующий <i class="fa fa-angle-right"></i></n-link>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <BlogSidebar />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import BlogSidebar from '../../components/blog/BlogSidebar'
export default {
    components: {
        BlogSidebar
    },
    async asyncData({ params }) {
        const slug = params.slug
        return { slug }
    },
    computed: {
        blog(){
            return this.$store.getters['blog/getBlogData'].find(blog => this.slugify(blog.title) === this.slug);
        },
        nextLink(){
            return this.$store.getters['blog/getBlogData'].find(el => el.id === this.blog.id + 1);
        },
        prevLink(){
            return this.$store.getters['blog/getBlogData'].find(el => el.id === this.blog.id - 1);
        }
    },

    beforeMount() {
        this.$emit("setBodyClass", 'product-detail-page-wrapper')
    },

    async fetch() {
        await this.$store.dispatch('blog/setBlogData')
    },
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
                // .replace(/[^\w-]+/g, "") // Remove all non-word chars
                .replace(/--+/g, "-") // Replace multiple - with single -
                .replace(/^-+/, "") // Trim - from start of text
                .replace(/-+$/, "")
                ); // Trim - from end of text
            },
        },
    head() {
        return {
            title: this.blog.title
        }
    },
}
</script>