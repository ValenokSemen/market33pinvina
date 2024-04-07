<template>
    <tr>
        <td class="item-name">{{item.product}}</td>
        <td class="item-price">{{item.price}}</td>
        <td class="item-qty">{{item.qty}}</td>
        <td class="item-status">
            <span :class="`${badges}`">
                {{ item.status }}
            </span>
        </td>
    </tr>
</template>

<script>
export default {
    props: ['item'],

    computed: {
        badges() {
            let status = null;
            switch (this.item.status) {
                case 'ВЫДАНО':
                    status = 'hold';
                    break;
                case 'ГОТОВО':
                    status = 'complete';
                    break;
                default:
                    status = 'hold';
            }
            return status;
        }
    }
}
</script>