<template>
  <div id="app" :style="[showForm ? {'overflow' : 'hidden', 'height' : '100vh'} : '']">
    <Header/>
    <Form/>
    <router-view :key="$route.fullPath"/>
    <Footer/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Header from '@/components/Header'
import Form from '@/components/Form'
import Footer from '@/components/Footer'

export default {
  components: {
    Header,
    Form,
    Footer
  },
  computed: {
    ...mapGetters([
      'showForm'
    ])
  },
  methods: {
    handleLogin () {
      this.showLogin = !this.showLogin
    }
  }
}
</script>

<style lang="sass">

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap')

*
  padding: 0
  margin: 0
  box-sizing: border-box

body
  margin: 0
  font-family: "游ゴシック", "Yu Gothic", "游ゴシック体", YuGothic, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale

.wrapper
  margin: 0 auto
  width: 1100px

button
  cursor: pointer
  border: none
  appearance: none

  &:focus,
  &:active
    outline: none

</style>
