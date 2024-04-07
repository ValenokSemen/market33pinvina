<template>
    <div class="breadcrumb-area pt-35 pb-35 bg-gray-3">
        <div class="container">
            <div class="breadcrumb-content text-center">
                <ul>
                    <li>
                        <n-link to="/">Главная</n-link>
                    </li>
                    <li v-if="detail"><n-link :to="`${detail.link}`">{{detail.name}}</n-link></li>
                    <li class="active">{{ pageTitle }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["pageTitle", "detail"]
    };
</script>