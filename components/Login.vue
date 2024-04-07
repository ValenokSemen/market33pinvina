<template>
  <div class="login-form">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(signIn)">
        <div class="mb-30">
          <ValidationProvider rules="required" v-slot="{ errors }" name="E-mail">
            <input type="text" name="email" placeholder="E-mail" v-model="email" />
            <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="mb-30">
          <ValidationProvider
            rules="required"
            v-slot="{ errors }"
            name="Пароль"
          >
            <input type="password" name="user-password" placeholder="Пароль" v-model="password" />
            <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="button-box">
          <div class="login-toggle-btn">
            <input type="checkbox" />
            <label>Запомнить меня</label>
            <n-link to="/forgot-password">Забыли пароль?</n-link>
          </div>
  
          <button type="submit" :disabled="loading">
            <div class="bjhGPG" :class="{ loading: loading }">Вход</div>
            <InlineLoader :loading=loading />
          </button>
        </div>
      </form>
    </ValidationObserver>
  </div>
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
      name: "LoginForm",
      components: {
        ValidationProvider,
        ValidationObserver,
        InlineLoader: () => import('@/components/InlineLoader') 
      },
      data: () => ({
        email: null,
        password: null,
        loading: false
      }),

      methods: {
        async signIn() {
          try {
            this.loading = true;
            await this.$store.dispatch('auth/signInAction', {email: this.email, password: this.password})
          } catch (error) {
            if (error?.error === "Invalid login credentials") {
              this.$notify({
                type: error.type,
                title: "Неправильные учетные данные",
              });
            }
          } finally {
            this.loading = false;
          }
        }
      }
    }
</script>
