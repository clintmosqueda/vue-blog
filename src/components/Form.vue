<template>
  <section class="form">
    <div class="form-block" v-if="showForm">
      <div class="form-content">
        <div class="form-login" v-if="showFormRegister">
          <Register />
        </div>
        <div class="form-register" v-else>
          <Login />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

import Login from '@/components/Login'
import Register from '@/components/Register'

export default {
  name: 'Form',
  components: {
    Login,
    Register
  },
  computed: {
    ...mapGetters([
      'showForm',
      'showFormRegister'
    ])
  },
}
</script>

<style lang="sass">
.form
  position: relative

.form-block
  position: fixed
  width: 100%
  top: 0
  left: 0
  height: 100vh
  background-color: #fff
  display: flex
  align-items: center
  justify-content: center
  z-index: 5

.form-content
  width: 460px

</style>
