<template>
    <section>
        <Breadcrumb pageTitle="Блог" />
        <div class="blog-area pb-80 pt-100">    
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="ml-20">
                            <div class="row">
                                <div class="col-lg-4 col-md-6 col-12" v-for="(blog, index) in getItems" :key="index">
                                    <BlogItem :blog="blog"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="getPaginateCount > 1">
                        <pagination
                            class="pro-pagination-style shop-pagination mt-30"
                            v-model="currentPage"
                            :per-page="perPage"
                            :records="getBlogData.length"
                            @paginate="paginateClickCallback"
                            :options="options"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>      
</template>


<script>
export default {
    components: {
        Breadcrumb: () => import("@/components/Breadcrumb"),
        BlogItem: () => import("@/components/blog/BlogItem")
    },

    data() {
        return {
            currentPage: 1,
            filterItems: [],
            prevSelectedCategoryName: '',
            perPage: 6,
            options: {
                theme: "bootstrap4",
                // edgeNavigation: false,
                chunksNavigation: "scroll",
                texts: {
                prevPage: <i class="fa fa-angle-left" aria-hidden="true"></i>,
                nextPage: <i class="fa fa-angle-right" aria-hidden="true"></i>,
                },
            },
        }
    },

    beforeMount() {
        this.$emit("setBodyClass", 'blog')
    },

    computed: {
        getItems() {
                let start = (this.currentPage - 1) * this.perPage;
                let end = this.currentPage * this.perPage;
                return this.filterItems.slice(start, end);
            },
        getPaginateCount() {
            return Math.ceil(this.filterItems.length / this.perPage);
        },
        getBlogData(){
            return this.$store.getters['blog/getBlogData']
        }
    },
    methods: {
        paginateClickCallback(pageNum) {
            this.currentPage = Number(pageNum);
        },
        updateBlogData(){
            const categoryName = this.$route.params.category
            if( Object.keys(this.$route.params).length === 0){
                this.filterItems = this.getBlogData
            }
            if(categoryName && this.prevSelectedCategoryName !== categoryName){
                if(Boolean(categoryName) === false){
                    this.filterItems = this.getBlogData
                }
                else {
                    const resultData = this.getBlogData.filter((item) => this.slugify(item.category).includes(categoryName));
                    this.filterItems = [];
                    this.filterItems.push(...resultData);
                }
            }
            this.prevSelectedCategoryName = categoryName;

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
    async fetch() {
        await this.$store.dispatch('blog/setBlogData')
        this.updateBlogData()
    },
    fetchOnServer: false,
    watch: {
        $route(){
            this.updateBlogData()
        },
    },
    head() {
        return {
            title: "Блог"
        }
    }
}
</script>