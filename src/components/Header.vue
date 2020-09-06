<template>
  <div class="header">
    <div class="wrapper">
      <header class="header-block">
        <router-link to="/" class="header-logo"><img src="../assets/logo.png" alt="logo"></router-link>
        <template v-if="authenticatedStatus">
          <button @click="logout" class="header-button">LOGOUT</button>
        </template>
        <template v-else>
          <button @click="openForm" class="header-button">{{showForm ? 'CLOSE' : 'LOGIN'}}</button>
        </template>
      </header>
    </div>
  </div>
</template>

<script>

import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'Header',
  props: ['showLogin'],
  computed: {
    ...mapGetters([
      'showForm',
      'authenticatedStatus'
    ])
  },
  methods: {
    ...mapMutations([
      'openForm',
      'logout'
    ])
  }
}

</script>

<style lang="sass">
.header
  position: relative
  z-index: 10

.header-block
  height: 100px
  display: flex
  justify-content: space-between
  align-items: center

.header-logo
  display: inline-block
  margin-top: 6px

.header-button
  font-family: 'Montserrat', sans-serif
  font-size: 18px
  font-weight: bold
  letter-spacing: 0.09em
  cursor: pointer
  background: transparent
  border: none
  display: inline-block
  margin-top: 7px
</style>
