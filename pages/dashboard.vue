<template>
  <section>
    <Breadcrumb pageTitle="Аккаунт" />
    <div class="dashboard-area pb-80 pt-100">
      <div class="container">
        <div class="row">
          <div class="text-center section-title-3 mb-50">
            <h2>Мой аккаунт</h2>
          </div>
          <div class="tab tab-vertical gutter-lg">
            <div class="row gutter-lg w-100">
              <ul
                class="nav nav-tabs mb-4 col-lg-3 col-md-4"
                id="nav-tab"
                role="tablist"
              >
                <li class="nav-item" role="presentation">
                  <a
                    class="nav-link" :class="{ active: isActive('home') }"
                    id="home-tab"
                    @click.prevent="setActive('home')"
                    href="#home"
                    >Панель управления</a
                  >
                </li>
                <li class="nav-item" role="presentation">
                  <a
                    class="nav-link" :class="{ active: isActive('profile') }"
                    id="profile-tab"
                    @click.prevent="setActive('profile')"
                    href="#profile"
                    >Профиль</a
                  >
                </li>
                <li class="nav-item" role="presentation">
                  <a
                    class="nav-link" :class="{ active: isActive('contact') }"
                    id="contact-tab"
                    @click.prevent="setActive('contact')"
                    href="#contact"
                    >Адрес</a
                  >
                </li>
                <li class="nav-item" role="presentation">
                  <a
                    class="nav-link" :class="{ active: isActive('order') }"
                    id="contact-tab"
                    @click.prevent="setActive('order')"
                    href="#order"
                    >Список заказов</a
                  >
                </li>
                <li class="nav-item" role="presentation">
                  <a class="nav-link" @click.prevent="signOut">Выйти</a>
                </li>
              </ul>
              <div class="tab-content col-lg-9 col-md-8">
                <div
                  class="tab-pane fade"
                  id="home"
                  :class="{ 'active show': isActive('home') }"
                >
                  <p class="mb-2">
                    Добро пожаловать,  <span>{{getActiveUser ? getActiveUser.user.user_metadata.username : 'Username'}}</span> (вы <span>{{getActiveUser ? getActiveUser.user.user_metadata.username : 'Username'}}</span>?
                    <a @click.prevent="signOut" class="link-to-tab">Выйти</a>)
                  </p>
                  <p class="mb-8">
                    Из главной страницы аккаунта вы можете посмотреть ваши
                    <a @click.prevent="setActive('order')" class="link-to-tab"
                      >недавние заказы</a
                    >, настроить
                    <a @click.prevent="setActive('contact')" class="link-to-tab"
                      >платежный адрес и адрес доставки</a
                    >, а также изменить
                    <a @click.prevent="setActive('profile')" class="link-to-tab"
                      >пароль и основную информацию</a
                    >.
                  </p>
                </div>
                <div
                  class="tab-pane fade"
                  :class="{ 'active show': isActive('profile') }"
                  id="profile"
                >
                  <AccauntProfileForm />
                </div>
                <div
                  class="tab-pane fade"
                  :class="{ 'active show': isActive('contact') }"
                  id="contact"
                >
                    <AccauntAddress />
                </div>
                <div
                  class="tab-pane fade"
                  :class="{ 'active show': isActive('order') }"
                  id="order"
                >
                  <AccauntOrdersTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AddressModal />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  middleware: 'auth',
  components: {
    TheFooter: () => import("@/components/TheFooter.vue"),
    AccauntOrdersTable: () => import("@/components/accaunt/AccauntOrdersTable.vue"),
    AccauntProfileForm: () => import("@/components/accaunt/AccauntProfileForm.vue"),
    AccauntAddress: () => import("@/components/accaunt/AccauntAddress.vue"),
    AddressModal: () => import("@/components/accaunt/modal/AddressModal.vue"),
  },
  data() {
    return {
        activeItem: 'home'
    }
  },
  beforeMount() {
        this.$emit("setBodyClass", 'shop-page-wrapper')
    },

  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        if (!this.getActiveUser) {
          return this.$router.push('/login-register');
        }
      }
    }
  },

  computed: {
      ...mapGetters({
        getActiveUser: 'auth/getActiveUser',
      })
    
  },
  methods: {
    isActive (menuItem) {
      return this.activeItem === menuItem
    },
    setActive(tab) {        
        this.activeItem = tab
    },
    signOut(){
      this.$store.dispatch("auth/signOutAction");
    }
  },
  head() {
    return {
      title: "Аккаунт",
    };
  },
};
</script>
