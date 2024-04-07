<template>
  <header class="header-area">
    <div class="header-top-area d-none d-lg-block">
      <div :class="containerClass">
        <div class="header-top-inner">
          <div class="topheader-wrap">
            <div class="some-topheader use-welcome">
              <p>Добро пожаловь на сайт <span>33пингвина</span></p>
            </div>
            <div class="some-topheader">
              <i class="pe-7s-phone"></i>Телефон: +7 (999) 123-45-56
            </div>
          </div>
          <div class="header-offer">
            <div class="same-style account-setting d-none d-lg-block">
              <button
                class="account-setting-active"
                @click="isOpenAccountSettings = !isOpenAccountSettings"
              >
                <i class="pe-7s-user-female"></i>
                <span>Мой аккаунт</span>
              </button>
              <div
                class="account-dropdown"
                :class="{ active: isOpenAccountSettings }"
              >
                <ul>
                  <li v-if="!isLogin" ><n-link :to="{path: '/login-register', query: { plan: 'Register' }}" class="">Регистрация</n-link></li>
                  <li v-if="isLogin"><n-link to="/dashboard" class="">Мой аккаунт</n-link></li>
                  <li>
                    <a v-if="isLogin" @click="logout" class="">Выход</a>
                    <nuxt-link v-if="!isLogin" :to="{ path: '/login-register', query: { plan: 'Login' }}"
                      >Войти</nuxt-link
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="header-padding header-res-padding sticky-bar clearfix"
      :class="{ 'is-sticky': isSticky }"
    >
      <div :class="containerClass">
        <div class="row">
          <div class="col-lg-2 col-md-6 col-4 d-flex align-items-center">
            <div class="logo">
              <n-link to="/">
                <img src="/img/logo/logo.png" alt="33pingvina logo main" />
              </n-link>
            </div>
          </div>
          <div class="col-lg-8 d-none d-lg-block">
            <div class="main-menu">
              <nav>
                <Navigation />
              </nav>
            </div>
          </div>
          <div class="col-lg-2 col-md-6 col-8 d-flex align-items-center">
            <div class="header-right-wrap">
              <div class="some-style header-search d-none d-lg-block">
                <button class="search-active" @click="setSearchForm()"><i class="pe-7s-search"></i></button>
              </div>
              <div class="some-style header-whishlist">
                <n-link to="/wishlist"><i class="pe-7s-like"></i></n-link>
                <span class="count-style">{{ wishlistItemCount }}</span>
              </div>
              <div class="some-style cart-wrap">
                <button class="icon-cart" @click="openCart = !openCart">
                  <i class="pe-7s-shopbag"></i>
                  <span class="count-style">{{ cartItemCount }}</span>
                </button>
                <MiniCart
                  :miniCart="{ visible: openCart }"
                  @minicartClose="openCart = !openCart"
                />
              </div>
              <div class="some-style mobile-menu-toggler d-block d-lg-none">
                <button class="mobile-aside-button" @click="navOpen = !navOpen">
                  <i class="pe-7s-menu"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  name: "NuxtHeaderWithTopBar",
  props: ["containerClass"],
  components: {
    Navigation: () => import("@/components/Navigation"),
    MiniCart: () => import("@/components/MiniCart"),
  },
  data() {
    return {
      isSticky: false,
      isOpenAccountSettings: false,
      openCart: false,
      navOpen: false,
    };
  },
  computed: {
    isLogin(){
      return this.$store.state.auth.user;
    },
    wishlistItemCount() {
      return this.$store.getters.wishlistItemCount;
    },
    cartItemCount() {
      return this.$store.getters.cartItemCount;
    },
  },
  beforeMount() {
    window.addEventListener('click', this.close)
  },

  beforeDestroy() {
    window.removeEventListener('click', this.close)
  },
  mounted() {
    window.addEventListener("scroll", () => {
      let scroll = window.scrollY;
      if (scroll >= 200) {
        this.isSticky = true;
      } else {
        this.isSticky = false;
      }
    });
  },
  methods: {
    close(e) {
      if (! this.$el.querySelector(".cart-wrap").contains(e.target)) {
        this.openCart = false
      }
      if (! this.$el.querySelector(".account-setting-active").contains(e.target)) {
        this.isOpenAccountSettings = false
      }
    },
    logout: function () {
      this.$store.dispatch("auth/signOutAction");
    },
    setSearchForm() {                    
      this.$store.commit('UPDATE_SEARCH', true)
    }
  },
};
</script>
