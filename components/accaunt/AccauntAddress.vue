<template>
  <div class="accaunt-address-wrapper">
    <div class="accaunt-address-title">
      <p>
        По умолчанию на странице оформления заказа будут использоваться
        следующие акутальные адреса.
      </p>
    </div>
    <div class="entries-wrapper" v-if="address">
      <div class="row">
        <div class="col-md-6 d-flex align-items-center justify-content-center">
          <div class="entries-info text-center">
            <p>{{address.city}},</p>
            <p>{{address.address}},</p>
            <p>Индекс: {{address.index}}</p>
          </div>
        </div>
        <div class="col-md-6 d-flex align-items-center justify-content-center">
          <div class="entries-edit-delete text-center">
            <button class="edit" @click="onClick()">Изменить</button>
            <button @click="onDelete()">Удалить</button>
          </div>
        </div>
      </div>
    </div>
    <div class="null-wrraper" v-else>
      <div class="row">
        <p>
          В данный момент у вас нет актуальных адресов.
        </p>
        <div class="entries-edit-delete">
          <button @click="onClick()">Добавить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccauntAddress",
  computed: {
    address(){
      return this.$store.getters['auth/getAddress']
    }
  },
  methods: {
    onClick(){
        this.$modal.show('addressmodal');
    },
    async onDelete(){
      try {
        await this.$store.dispatch('auth/deleteAddressFromDB')
        this.$notify({
          type: 'success',
          title: 'Адрес успешно удален',
        });
      } catch (error) {
        this.$notify({
          type: 'error',
          title: error,
        });
      }
    }
  }
};
</script>
