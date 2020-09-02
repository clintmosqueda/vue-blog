<template>
  <div class="register">
    <form class="register-form" action="POST" @submit.prevent="registerUser">
      <h2 class="register-title">REGISTER</h2>
      <div class="register-holder">
        <label class="register-label" for="">Email</label>
        <input class="register-input" type="email" v-model="user.email">
      </div>
      <div class="register-holder">
        <label class="register-label" for="">Password</label>
        <input class="register-input" type="password" v-model="user.password">
      </div>
      <Button type="submit" text="REGISTER"/>
      <p class="register-copy">Already have an account? <span @click="openFormRegister">LOGIN HERE</span></p>
    </form>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

import Button from '@/components/Button'

export default {
  name: 'register',
  components: {
    Button
  },
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      confirmPassword: ''
    }
  },
  methods: {
    ...mapActions([
      'register'
    ]),
    ...mapMutations([
      'openFormRegister'
    ]),
    registerUser () {
      console.log(this.user.email)
      console.log(this.user.password)
      this.register(this.user)
        .then(() => {
          console.log('register')
        })
    }
  }
}
</script>

<style lang="sass">
.register-holder
  margin-bottom: 20px

.register-title
  font-weight: bold
  font-size: 30px
  font-family: 'Montserrat', sans-serif
  margin-bottom: 50px
  letter-spacing: 0.09em

.register-label
  display: block
  font-size: 18px
  font-family: 'Montserrat', sans-serif
  margin-bottom: 5px
  letter-spacing: 0.11em

.register-input
  border: 1px solid #101010
  height: 60px
  background-color: #fff
  display: block
  width: 100%
  padding: 0 10px

.register-copy
  font-size: 18px
  font-family: 'Montserrat', sans-serif
  letter-spacing: 0.11em
  text-align: center
  margin-top: 38px

  span
    font-weight: bold
    cursor: pointer

</style>
