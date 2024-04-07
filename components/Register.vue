<template>
  <div class="register-form">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(signUp)">
        <div class="mb-30">
          <ValidationProvider rules="required" v-slot="{ errors }" name="Логин">
            <input type="text" placeholder="Логин" v-model="name" />
            <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="mb-30">
          <ValidationProvider
            rules="required"
            v-slot="{ errors }"
            name="Пароль"
          >
            <input type="password" placeholder="Пароль" v-model="password" />
            <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="mb-30">
          <ValidationProvider
            rules="required|email"
            v-slot="{ errors }"
            name="E-mail"
          >
            <input placeholder="E-mail" type="email" v-model="email" />
            <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="button-box">
          <button type="submit" :disabled="loading">
            <div class="bjhGPG" :class="{ loading: loading }">Регистрация</div>
            <InlineLoader :loading="loading" />
          </button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
// import { ValidationProvider, ValidationObserver } from "vee-validate";
import {
  ValidationProvider,
  ValidationObserver,
  localize,
} from "vee-validate/dist/vee-validate.full.esm";
import ru from "vee-validate/dist/locale/ru.json";
localize("ru", ru);

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    InlineLoader: () => import("@/components/InlineLoader"),
  },
  data: () => ({
    name: null,
    password: null,
    email: null,
    loading: false,
    authError: "",
  }),
  methods: {
    async signUp() {
      try {
        this.loading = true;
        await this.$store.dispatch('auth/signUpAction', {name: this.name, email: this.email, password: this.password})
      } catch (error) {
        this.$notify({
            type: error.type,
            title: error.error,
          });
      } finally {
        this.loading = false;
      }
    }
  },
};
</script>
