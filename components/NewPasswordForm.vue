<template>
    <div class="new-password-form">
      <FormError :errorMsg="formError" @clearError="clearError"/>
      <form @submit.prevent="updatePassword()">
        <div class="mb-30">
          <input type="password" name="new-password" placeholder="Пароль"  v-model="form.password" />
        </div>
        <div class="mb-30">
            <input type="password" name="retype-password" placeholder="Повторить пароль"  v-model="form.passwordConfirm"/>
        </div>
        <div class="button-box text-center">
          <button type="submit" :disabled="loading">
            <div class="bjhGPG" :class="{ loading: loading }">Изменить</div>
            <InlineLoader :loading=loading />
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
      export default {
        components: {
            InlineLoader: () => import('@/components/InlineLoader'), 
            FormError: () => import('@/components/accaunt/FormError') 
          },
          data: () => ({
              loading: false,
              form: {
                password: null,
                passwordConfirm: null,
              },
              formError: ''
          }),

          methods: {
            async updatePassword(){
              if (this.form.password !== this.form.passwordConfirm) {
                return this.formError = 'Пароли не совпадают';
              }
              this.loading = true
              const { data, error } = await supabase.auth.updateUser({ password: this.form.password })

              if (error) {
                this.loading = false
                this.formError = error.message;
                setTimeout(() => {
                  this.formError = ''
                }, 5000)
              }
              if (data) {
                this.loading = false
                this.$notify({
                  type: 'success',
                  title: "Пароль успешно изменен",
                });
                await this.$router.push({ path: "/login-register" })
              }
            },

            clearError(item) {
              this.formError = item;
            }
          }
      }
  </script>
  