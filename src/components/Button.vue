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
  background-color: #fff
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

  &:before
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: #101010
    z-index: -1
    content: ''
    transform-origin: center
    display: block
    transition: transform 300ms ease-out
    pointer-events: none
  
  &:hover
    &:before
      transform: rotateX(180deg)
</style>