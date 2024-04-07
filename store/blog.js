import Vue from 'vue'

export const state = () => ({
    blog: [],
})

// your root getters
export const getters = {
  getBlogData(state) {
      return state.blog
  },
  tagList: state => {
        return [...new Set(state.blog.map((list) => list.category).flat())]
    },
}

export const mutations = {
    SET_BLOG(state, payload) {
        state.blog = payload
    },
    GET_BLOG_DATA(state, payload) {
        return state.blog?.find((el) => el.id === payload)
    },
}

export const actions = {
    getBlogDataByID({commit}, payload) {
        commit('GET_BLOG_DATA', payload)
    },
    async setBlogData({ commit }) {
        try {
            const { data, error } = await this.$supabase
                .from('blog')
                .select('*')
                .order('inserted_at', { ascending: true })
            if (error) throw error
            commit('SET_BLOG', data)
        } catch (error) {
            throw { type: 'error', error: error.message };
        }
      },
}