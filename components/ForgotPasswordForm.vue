<template>
    <div class="forgot-password-form">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(sendResetPassword)">
          <div class="mb-30">
            <ValidationProvider
              rules="required|email"
              v-slot="{ errors }"
              name="E-mail"
            >
            <input type="email" name="e-mail" placeholder="E-mail" v-model="email" />
            <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
          </div>
          <div class="button-box text-center">
            <button type="submit" :disabled="loading">
              <div class="bjhGPG" :class="{ loading: loading }">Запросить</div>
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
          components: {
            ValidationProvider,
            ValidationObserver,
            InlineLoader: () => import('@/components/InlineLoader') 
          },
          data: () => ({
            email: null,
            loading: false
          }),

          methods: {
            async sendResetPassword() {
              try {
                this.loading = true;
                const { data, error } = await this.$supabase.auth.resetPasswordForEmail(this.email, {
                  redirectTo: 'http://10.1.1.10:8000/new-password',
                });
                if (error) throw error
                this.$notify({
                  type: 'success',
                  title: "Письмо со ссылкой для сброса пароля направлено на почту: " + this.email,
                });
              } catch (error) {
                this.$notify({
                  type: 'error',
                  title: "Ошибка:" + error.message,
                });
              } finally {
                this.loading = false;
              }
            }
          }
      }
  </script>
  