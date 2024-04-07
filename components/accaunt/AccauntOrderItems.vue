<template>
  <div class="panel panel-default order-accaunt">
    <div class="panel-heading order-title">
      <h3 class="panel-title">
        <span>
          {{ data[0].date }}
        </span>
        <a
          data-bs-toggle="collapse"
          :href="`#order-${data[0].id}`"
          role="button"
          aria-expanded="false"
          :aria-controls="`#order-${data[0].id}`"
          >Заказ {{ data[0].id }} ({{ data.length }} позиции)
        </a>
      </h3>
    </div>
    <div
      :id="`order-${data[0].id}`"
      class="panel-collapse collapse"
      data-bs-parent="#orders"
    >
      <div class="panel-body">
        <div class="table-responsive-sm">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Продукт</th>
                <th>Цена</th>
                <th>Кол-во</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              <SingleOrderItem
                v-for="(item, j) in data"
                :key="j"
                :item="item"
              />
            </tbody>
          </table>
          <table>
              <tfoot><tr><td>Итог:</td><td><h2>{{ getTotalPrice(data) }}</h2></td></tr></tfoot>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccauntOrderItems",
  props: ["data"],

  components: {
    SingleOrderItem: () => import("@/components/accaunt/SingleOrderItem"),
  },

  methods: {
    getTotalPrice(data) {
      let total = 0;
      data.forEach((item) => {
        total += item.price * item.qty;
      });
      return total;
    },
  },
};
</script>
