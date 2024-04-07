<template>
    <div v-if="errorMsg">
        <div class="toast align-items-center text-alert alert-danger border-0 mb-25" :class="{'show': errorMsg}" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">{{errorMsg}}</div>
                <button type="button" class="btn-close btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" @click="closeToast"></button>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        props: ['errorMsg'],
        methods: {
            closeToast(){
                this.$emit('clearError', '')
            }
        }
    }
</script>

<style lang="scss">
    .toast{
        width: auto;
        &.alert-danger {
            background-color: #fededa;
            border-color: #fed1cb;
        }
        &.text-alert{
            color: #822e23;
        }
    }
</style>