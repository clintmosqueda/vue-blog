import Vue from 'vue'
import App from './App.vue'
import router from './router/route'
import store from './store/store'
import { createProvider } from './vue-apollo'

Vue.config.productionTip = false

Vue.filter('dateFormat', function(date) {
  if (date) {
    return date.slice(0, 11)
  }
  return
})

new Vue({
  router,
  store,
  beforeCreate() { this.$store.commit('authenticatedStatus'); },
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
