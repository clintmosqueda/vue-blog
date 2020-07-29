<template>
  <div class="breadcrumbs">
    <div class="wrapper">
      <div class="breadcrumbs-wrap">
        <ul class="breadcrumbs-list">
          <router-link class="breadcrumbs-item" tag="li" to="/" exact>HOME</router-link>
          <router-link class="breadcrumbs-item" tag="li" active-class="is-active" to="/">{{title}}</router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumbs',
  props: ['title']
}
</script>

<style lang="sass">
.breadcrumbs
  background-color: #F5F5F5
  margin-bottom: 63px

.breadcrumbs-wrap
  padding: 31px 0 30px

.breadcrumbs-list
  list-style-type: none

.breadcrumbs-item
  display: inline-block
  font-size: 16px
  letter-spacing: 0.09em
  position: relative
  margin-right: 36px
  cursor: pointer

  &.is-active
    pointer-events: none

  &:not(:last-of-type)
    &::after
      content: '>'
      position: absolute
      top: 0
      right: -23px
</style>