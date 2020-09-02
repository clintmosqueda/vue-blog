<template>
  <button :type="type" class="button">{{text}}</button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: {
      type: String,
      default: "Text Here"
    },
    type: {
      type: String,
      default: "button"
    }
  }
}
</script>

<style lang="sass">
.button
  color: #fff
  background-color: #101010
  font-size: 20px
  font-weight: bold
  font-family: 'Montserrat', sans-serif
  width: 100%
  display: flex
  justify-content: center
  align-items: center
  height: 70px
  border: none
  cursor: pointer
  letter-spacing: 0.09em
  position: relative
  z-index: 2
  transform-origin: center
</style>