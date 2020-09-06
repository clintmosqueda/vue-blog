<template>
  <div class="modal">
    <div class="modal-body">
      <p class="modal-text">Are you sure?</p>
      <div class="modal-buttons">
        <button class="modal-button" @click="onConfirm">Ok</button>
        <button class="modal-button" @click="closeDialog">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
methods: {
  onConfirm() {
    this.$router.go(-1)
    this.closeDialog()
  },
    ...mapMutations(['closeDialog']),
},
}
</script>

<style lang="sass">
.modal
  position: fixed
  top: 0
  left: 0
  width: 100vw
  height: 100vh
  display: flex
  justify-content: center
  align-items: center
  z-index: 10
  background-color: rgba(#000,0.2)

.modal-body
  width: 350px
  background-color: #fff
  border-radius: 5px
  padding: 10px
  box-shadow: 0 7px 20px 3px rgba(#000, 0.2)

.modal-text
  padding: 20px 0
  text-align: center
  margin-bottom: 10px
  font-size: 16px

.modal-buttons
  display: flex
  width: 100%
  justify-content: space-around

.modal-button
  padding: 15px 0
  display: block
  width: 45%
  text-transform: uppercase
  font-weight: bold
  background-color: #F5F5F5
  transition: background-color 300ms ease-out

  &:hover
    background-color: #e9e9e9
  
</style>