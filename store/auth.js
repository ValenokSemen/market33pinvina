// import createPersistedState from "vuex-persistedstate";
import Vue from "vue";

// export const plugins = [createPersistedState]

export const state = () => ({
  user: null,
  profile: {},
  address: null,
});

// your root getters
export const getters = {
  getActiveUser(state) {
    return state.user;
  },
  getProfile(state) {
    return state.profile;
  },
  getAddress: (state) => {
    return state.address;
  },
};

export const mutations = {
  SET_USER(state, payload) {
    state.user = payload;
  },
  SET_PROFILE(state, payload) {
    if (payload === null) {
      return (state.profile = {});
    }
    state.profile = Object.assign({}, payload.shift());
  },
  SET_ADDRESS(state, data) {
    if (data === null) {
      return (state.address = null);
    }
    state.address = data.length > 0 ? Object.assign({}, data.shift()) : null;
  },
};

export const actions = {
  async signInAction({ commit, dispatch }, form) {
    try {
      const { data, error } = await this.$supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });
      if (error) throw error;
      Vue.notify({
        type: "success",
        title: "Вы успешно вошли в личный кабинет",
      });
      const { data: profile, er } = await this.$supabase
        .from("profiles")
        .select("id, username, surname, name")
        .eq("id", data.user.id);
      if (er) throw error;
      commit("SET_PROFILE", profile);
      commit("SET_USER", data);
      await dispatch("getAddressFromDB");
      await this.$router.push({ path: "/dashboard" });
    } catch (error) {
      throw { type: "error", error: error.message };
    }
  },
  async signUpAction({ dispatch }, form) {
    try {
      const { data, error } = await this.$supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            username: form.name,
          },
        },
      });
      if (error) throw error;
      Vue.notify({
        type: "success",
        title: "Пользователь " + form.name + " успешно зарегистрирован!",
      });
      await dispatch("signInAction", form);
    } catch (error) {
      if (error?.message === "User already registered") {
        throw {
          type: "warn",
          error:
            "Пользователь уже заригистрирован. Войдите со своими учетными данными",
        };
      }
      if (error) {
        throw { type: "error", error: error.message };
      }
    }
  },
  async signOutAction({ commit }) {
    try {
      const { error } = await this.$supabase.auth.signOut();
      if (error) throw error;
      commit("SET_USER", null);
      commit("SET_PROFILE", null);
      Vue.notify({
        type: "success",
        title: "Успешный выход из учетной записи",
      });
      await this.$router.push({ path: "/login-register" });
    } catch (error) {
      Vue.notify({
        type: "error",
        title: "Ошибка:" + error.message,
      });
    }
  },

  async updateProfile({ commit, getters }, payload) {
    try {
      let user = getters.getActiveUser.user;
      if (payload.email !== user.email) {
        const { data, error } = await this.$supabase.auth.updateUser({
          email: payload.email,
        });
        if (error) throw new Error("Ошибка обновления e-mail");
        commit("SET_USER", data);
      }
      if (payload.new_password) {
        const { data, error } = await this.supabase.auth.updateUser({
          password: payload.new_password,
        });
        if (error) throw new Error("Ошибка обновления пароля");
        commit("SET_USER", data);
      }
      const { data, error } = await this.$supabase
        .from("profiles")
        .upsert({
          id: user.id,
          name: payload.name,
          surname: payload.surname,
          username: payload.login,
          updated_at: new Date(),
        })
        .select("id, username, surname, name");
      if (error) throw new Error("Ошибка обновления профиля");
      commit("SET_PROFILE", data);
    } catch (error) {
      throw error.message;
    }
  },

  async updateAddress({ commit, getters }, payload) {
    try {
      let user = getters.getActiveUser.user;
      const { data, error } = await this.$supabase
        .from("address")
        .upsert({
          user_id: user.id,
          city: payload.city,
          address: payload.address,
          index: payload.index,
          updated_at: new Date(),
        })
        .select("city, address, index");
      if (error) throw new Error("Ошибка обновления адреса");
      await commit("SET_ADDRESS", data);
    } catch (error) {
      throw error.message;
    }
  },
  async getAddressFromDB({ commit, getters }) {
    try {
      let user = getters.getActiveUser.user;
      const { data, error } = await this.$supabase
        .from("address")
        .select("city, address, index")
        .eq("user_id", user.id)
        .limit(1);
      if (error) {
        throw new Error("Ошибка получения данных");
      }
      commit("SET_ADDRESS", data);
    } catch (error) {
      throw error.message;
    }
  },
  async deleteAddressFromDB({ commit, getters }) {
    try {
      let user = getters.getActiveUser.user;
      const { error } = await this.$supabase
        .from("address")
        .delete()
        .eq("user_id", user.id);
      if (error) {
        throw new Error("Ошибка удаления");
      }
      commit("SET_ADDRESS", null);
    } catch (error) {
      throw error.message;
    }
  },
};
