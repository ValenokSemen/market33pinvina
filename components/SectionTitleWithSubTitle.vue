<template>
    <div class="text-center" :class="classes">
        <h2>{{ title }}</h2>
        <p v-if="subTitle">{{ subTitle }}</p>
    </div>
</template>

<script>
    export default {
        props: ['title', 'subTitle', 'classes']
    };
</script>