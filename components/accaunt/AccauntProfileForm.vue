<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(updatePassword)" class="form profile-form">
      <div class="row">
        <div class="col-sm-6">
          <label for="">Имя *</label>
          <ValidationProvider
              rules="required"
              v-slot="{ errors }"
              name="Имя"
            >
            <span class="text-danger">{{ errors[0] }}</span>
            <input class="billing-info" type="text"  placeholder="Имя пользователя" v-model="form.name" />
          </ValidationProvider>
        </div>
        <div class="col-sm-6">
          <label for="">Фамилия *</label>
          <ValidationProvider
              rules="required"
              v-slot="{ errors }"
              name="Фамилия"
            >
            <span class="text-danger">{{ errors[0] }}</span>
            <input class="billing-info" type="text"  placeholder="Фамилия пользователя" v-model="form.surname" />
          </ValidationProvider>
        </div>
      </div>
      <label for="">Отображаемое имя</label>
      <input class="billing-info mb-0" type="text" placeholder="Отображаемое имя"  v-model="form.login" />
      <small class="d-block form-text mb-30"
        >Так ваше имя будет отображаться в разделе аккаунта</small
      >
      <label for="">E-mail *</label>
      <ValidationProvider
            rules="required|email"
            v-slot="{ errors }"
            name="E-mail"
          >
            <span class="text-danger">{{ errors[0] }}</span>
            <input class="billing-info mb-50" type="email" placeholder="E-mail" v-model="form.email" />
          </ValidationProvider>
      

      <fieldset>
        <legend>Смена пароля</legend>
        <label for="">Пароль</label>
        <input class="billing-info" type="password" name="current_password" v-model="form.old_password" />
        <label for="">Новый пароль</label>
        <input class="billing-info" type="password" name="new_password" v-model="form.new_password" />
        <label for="">Подтвердить пароль</label>
        <input class="billing-info" type="password" name="confirm_password" v-model="form.confirm_password" />
      </fieldset>

      <div class="billing-back-btn">
        <div class="billing-back">
          <a href="#" @click="scrollTop"
            ><i class="fa fa-arrow-up"></i> Вверх</a
          >
        </div>
        <div class="billing-btn">
          <button type="submit" :disabled="loading">
            <div class="bjhGPG" :class="{ loading: loading }">Сохранить</div>
            <InlineLoader :loading=loading />
          </button>
        </div>
      </div>
    </form>
  </ValidationObserver>

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
  name: "AccauntProfileForm",
  components: {
    ValidationProvider,
    ValidationObserver,
    InlineLoader: () => import('@/components/InlineLoader'), 
  },
  data() {
    return {
      form: {
        name: null,
        surname: null,
        login: null,
        email: null,
        new_password: null,
        old_password: null,
        confirm_password: null
      },
      loading: false
    }
  },
  async fetch() {
    this.form.email = this.user.user.email
    this.form.login = this.profile.username
    this.form.name = this.profile.name
    this.form.surname = this.profile.surname
  },
  computed: {
    user(){
      return this.$store.getters['auth/getActiveUser']
    },
    profile(){
      return this.$store.getters['auth/getProfile']
    }
  },
  methods: {
    scrollTop() {
        window.scrollTo({ top: 200, behavior: 'smooth' });
    },
    async updatePassword() {
      try {
        this.loading = true
        const result = await this.$store.dispatch('auth/updateProfile', this.form)
        if (result) {
          this.$notify({
            type: 'success',
            title: "Профиль обновлен успешно",
          });
        }
      } catch (error) {
        this.$notify({
            type: 'error',
            title: "Ошибка:" + error.message,
          });
      } finally {
        this.loading = false
      }
    }
  }
};
</script>
