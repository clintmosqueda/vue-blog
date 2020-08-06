<template>
  <div class="login">
    <form class="login-form" @submit.prevent="authenticateUser" action="POST">
      <h2 class="login-title">LOGIN</h2>
      <div class="login-holder">
        <label class="login-label">Email</label>
        <input class="login-input" type="email" v-model="user.email">
      </div>
      <div class="login-holder">
        <label class="login-label">Password</label>
        <input class="login-input" type="password" v-model="user.password">
      </div>
      <Button type="submit" text="LOGIN"/>
      <p class="login-copy">No account yet? <span @click="openFormRegister">REGISTER HERE</span></p>
    </form>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

import Button from '@/components/Button'

export default {
  name: 'login',
  components: {
    Button
  },
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
    }
  },
  methods: {
    ...mapMutations([
      'openFormRegister'
    ]),
    ...mapActions([
      'authenticate'
    ]),
    authenticateUser () {
      this.authenticate(this.user)
        .then(() => {
          console.log('login')
        })
    }
  }
}
</script>

<style lang="sass">
.login-holder
  margin-bottom: 20px

.login-title
  font-weight: bold
  font-size: 30px
  font-family: 'Montserrat', sans-serif
  margin-bottom: 50px
  letter-spacing: 0.09em

.login-label
  display: block
  font-size: 18px
  font-family: 'Montserrat', sans-serif
  margin-bottom: 5px
  letter-spacing: 0.11em

.login-input
  border: 1px solid #101010
  height: 60px
  background-color: #fff
  display: block
  width: 100%
  padding: 0 10px

.login-copy
  font-size: 18px
  font-family: 'Montserrat', sans-serif
  letter-spacing: 0.11em
  text-align: center
  margin-top: 38px

  span
    font-weight: bold
    cursor: pointer

</style>
