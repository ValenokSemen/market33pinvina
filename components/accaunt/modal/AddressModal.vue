<template>
  <client-only>
    <modal name="addressmodal" width="50%" height="auto" :scrollable="true">
      <div class="addressmodal-wrapper row">
        <div slot="top-right">
          <button @click="$modal.hide('addressmodal')" class="modal-close">
            <i class="fa fa-times"></i>
          </button>
        </div>
        <div class="col-lg-8 col-12 ms-auto me-auto">
          <div class="address-change-form">
            <h2>Изменить адрес доставки</h2>
            <ValidationObserver v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(updateAddress)">
                <div class="mb-30">
                  <ValidationProvider
                    rules="required"
                    v-slot="{ errors }"
                    name="city"
                  >
                    <input
                      type="text"
                      name="city"
                      placeholder="Населенный пункт"
                      v-model="form.city"
                    />
                    <span class="text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="mb-30">
                  <ValidationProvider
                    rules="required"
                    v-slot="{ errors }"
                    name="address"
                  >
                    <input
                      type="text"
                      name="address"
                      placeholder="Адрес (улица, дом, офис или кв.)"
                      v-model="form.address"
                    />
                    <span class="text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="mb-30">
                  <ValidationProvider
                    rules="required|digits:6"
                    v-slot="{ errors }"
                    name="index"
                  >
                    <input
                      type="text"
                      name="index"
                      placeholder="Почтовый индекс"
                      v-model="form.index"
                    />
                    <span class="text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="button-box text-right">
                  <button type="submit" :disabled="loading">
                    <div class="bjhGPG" :class="{ loading: loading }">
                      Запросить
                    </div>
                    <InlineLoader :loading="loading" />
                  </button>
                </div>
              </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </modal>
  </client-only>
</template>

<script>
import {
  ValidationProvider,
  ValidationObserver,
  localize,
} from "vee-validate/dist/vee-validate.full.esm";
import ru from "vee-validate/dist/locale/ru.json";
localize("ru", ru);
export default {
  name: "AddressModal",
  components: {
    ValidationProvider,
    ValidationObserver,
    InlineLoader: () => import("@/components/InlineLoader"),
  },
  data() {
    return {
      form: {
        city: "",
        address: "",
        index: null,
      },
      item: "",
      loading: false,
    };
  },
  computed: {
    address() {
      return this.$store.getters["auth/getAddress"];
    },
  },

  mounted() {
    if (this.address !== null) {
      this.form = Object.assign({}, this.form, this.address);
    }
  },

  methods: {
    async updateAddress() {
      try {
        this.loading = true;
        await this.$store.dispatch("auth/updateAddress", this.form);
        this.$notify({
          type: "success",
          title: "Адрес успешно добавлен",
        });
      } catch (error) {
        this.$notify({
          type: "error",
          title: error,
        });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss">
.address-change-form {
  padding: 40px 0;
  text-align: left;
  @media only screen and (max-width: 992px) {
    padding: 40px;
  }
  h2 {
    color: #010101;
    margin-bottom: 40px;
    line-height: 1;
  }
}

.vm--overlay {
  background-color: rgba($dark, 0.8);
}

.vm--container.scrollable .vm--modal {
  width: 800px !important;
  left: 50% !important;
  transform: translateX(-50%);
  overflow: unset;
  @media #{$md-layout} {
    width: 700px !important;
  }
  @media #{$xs-layout} {
    width: 320px !important;
    top: 30px !important;
  }
  @media only screen and (min-width: 480px) and (max-width: 579px) {
    width: 420px !important;
  }
  @media #{$sm-layout} {
    width: 500px !important;
  }
}

.vm--modal {
  padding: 15px;
  overflow-y: auto;
}
.modal-close {
  top: 8px;
  right: 8px;
  width: 35px;
  height: 35px;
  color: $white;
  font-size: 20px;
  border-radius: 50%;
  position: absolute;
  border: 1px solid $theme-color;
  background-color: $theme-color;
}
</style>
