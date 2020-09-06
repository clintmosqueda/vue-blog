import Vue from 'vue'
import Vuex from 'vuex'
import { apolloClient } from '@/vue-apollo'
import { REGISTER, AUTHENTICATE } from '@/gql/mutations'
import { GET_POSTS } from '@/gql/queries'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: null,
    authenticatedStatus: false,
    formModal: false,
    dialogModal: false,
    willRegister: false,
  },
  getters: {
    isAuthenticated (state) {
      return !!state.token
    },
    authenticatedStatus (state) {
      return state.authenticatedStatus
    },
    showForm (state) {
      return state.formModal
    },
    showDialog (state) {
      return state.dialogModal
    },
    showFormRegister (state) {
      return state.willRegister
    },
  },
  mutations: {
    loggedIn (state, credentials) {
      state.token = credentials.token
      state.authenticatedStatus = true
      state.formModal = false
    },
    logout (state) {
      state.authenticatedStatus = false
      state.user = {}
      state.token = '' && localStorage.removeItem('blog-token')
      localStorage.clear()
    },
    authenticatedStatus (state) {
      if (localStorage.getItem('blog-token')) {
        state.authenticatedStatus = true
      }
    },
    openForm (state) {
      state.formModal = !state.formModal
      if (state.formModal === false) {
        state.willRegister = false
      }
    },
    openDialog (state) {
      state.dialogModal = true
    },
    closeDialog(state) {
      state.dialogModal = false
    },
    openFormRegister (state) {
      state.willRegister = !state.willRegister
    },
  },
  actions: {
    async register({ commit, dispatch }, user) {
      try {
        const { data } = await apolloClient.mutate({ mutation: REGISTER, variables: { ...user } })
        const registered = JSON.stringify(data.register)
        if (registered) {
          const { data } = await apolloClient.mutate({ mutation: AUTHENTICATE, variables: { ...user } })
          console.log('auth', data)
          console.log('res', registered)
          const token = JSON.stringify(data.authenticate)
          commit('loggedIn', { token, user })
          localStorage.setItem('blog-token', token)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async authenticate ({ commit, dispatch }, user) {
      try {
        const { data } = await apolloClient.mutate({ mutation: AUTHENTICATE, variables: { ...user } })
        const token = JSON.stringify(data.authenticate)
        commit('loggedIn', { token, user})
        localStorage.setItem('blog-token', token)
      } catch (e) {
        console.log(e)
      }
    }
  },
  modules: {
  }
})
