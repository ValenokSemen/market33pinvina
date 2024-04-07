<template>
    <div>
        <Loader v-if="loading"/>
        <div v-if="ordersData.length > 0">
            <div class="order-wrapper">
                <div id="orders" class="panel-group" >
                    <AccauntOrderItems v-for="(data, i) in groupData" :key="i" :data="data" />
                </div>
            </div>
        </div>
        <div v-else>
            <p>
                У вас еще нет заказов на сайте!
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AccauntOrdersTable',
    components: {
        AccauntOrderItems: () => import('@/components/accaunt/AccauntOrderItems'),
        Loader: () => import('@/components/Loader'),
    },
    data() {
        return {
            loading: true,
            ordersData: [
                {id: 1, product: "Мороженное", price: 2073, qty: "2", status: "ВЫДАНО", date: "1986-09-10"},
                {id: 1, product: "Мороженное 2", price: 2074, qty: "4", status: "ГОТОВО", date: "1986-09-10"},
                {id: 1, product: "Мороженное 3", price: 2072, qty: "1", status: "ВЫДАНО", date: "1986-09-10"},
                {id: 1, product: "Мороженное 3", price: 2072, qty: "1", status: "ВЫДАНО", date: "1986-09-10"},
                {id: 1, product: "Мороженное 3", price: 2072, qty: "1", status: "ВЫДАНО", date: "1986-09-10"},
                {id: 1, product: "Мороженное 3", price: 2072, qty: "1", status: "ВЫДАНО", date: "1986-09-10"},
                {id: 8155685, product: "Мороженное", price: 2073, qty: "2", status: "ВЫДАНО", date: "1986-09-11"},
                {id: 8155685, product: "Мороженное3", price: 2072, qty: "1", status: "ВЫДАНО", date: "1986-09-11"}
            ],
            groupData: []
        }
    },

    mounted() {
       new Promise((resolve, reject) => {
            setTimeout(() => {
                let groupData = this.ordersData.reduce((group, item) => {
                    const { id } = item;
                    group[id] = group[id] ?? [];
                    group[id].push(item);
                    return group;
                }, {});
                resolve(groupData)
            }, 2000)
        }).then(res => {
            this.groupData = res
            this.loading = false
        }).catch(err => {
            console.log('error', err)
        })        
    }
}
</script>

<style lang="scss">
    .preloader {
        position: relative;
        left: 0;
        top: 100px;
        width: 100%;
        height: 100%;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.66);
        z-index: 999;
        .loader {
            position: absolute;
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
            left: 50%;
            color: #fff;

            img {
                height: 60px;
            }
        }
    }
</style>