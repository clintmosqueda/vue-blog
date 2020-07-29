import Vue from 'vue'
import Vuex from 'vuex'
import { apolloClient } from '@/vue-apollo'
import { REGISTER, AUTHENTICATE } from '@/gql/mutations'
import { GET_POST_BY_ID } from '@/gql/queries'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: null,
    authenticatedStatus: false,
    counter: 0,
    formModal: false,
    willRegister: false,
    cachedPost: {},
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
    showFormRegister (state) {
      return state.willRegister
    },
    cachedPost (state) {
      return state.cachedPost
    },
    doubleCounter (state) {
      return state.counter * 2
    },
    clickCounter (state) {
      return `${state.counter} clicks`
    }
  },
  mutations: {
    setCachedPost (state, payload) {
      state.cachedPost = payload
    },
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
    openFormRegister (state) {
      state.willRegister = !state.willRegister
    },
    countUp (state) {
      return state.counter++
    },
    countDown (state) {
      return state.counter--
    }
  },
  actions: {
    async setCachedPost({commit}, id) {
      try {
        const { data } = await apolloClient.query({
          query: GET_POST_BY_ID,
          variables: {
            id: id
          }
        })
        console.log(data.post)
        commit('setCachedPost', data.post)
      } catch (error) {
        console.log(error)
      }
    },
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
