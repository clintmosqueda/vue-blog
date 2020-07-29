import Vue from 'vue'
import App from './App.vue'
import router from './router/route'
import store from './store/store'
import { createProvider } from './vue-apollo'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  beforeCreate() { this.$store.commit('authenticatedStatus'); },
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
