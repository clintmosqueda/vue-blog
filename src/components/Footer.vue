<template>
  <footer class="footer">
    <div class="wrapper">
      <div class="footer-content">
        <router-link to="/"><img class="footer-logo" src="../assets/logo-alt.png" alt=""/></router-link>
        <p class="footer-copy">サンプルテキストサンプル ルテキストサンプルテキストサ<br/>ンプルテキストサンプル ルテキスト</p>
      </div>
    </div>
    <div class="footer-copyright">
      <small>Copyright©2007-2019 Blog Inc.</small>
      <span @click="scrollTop()" class="footer-back2top"><span :style="`backgroundImage: url(${arrowTopIcon})`" class="footer-back2top-icon"></span> TOP</span> 
    </div>
  </footer>
</template>

<script>
import arrowTopIcon from '@/assets/arrow-top.png'

export default {
  data() {
    return {
      arrowTopIcon
    }
  },
  methods: {
    scrollTop() {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  },
}
</script>

<style lang="sass">
.footer
 background-color: #292929
 color: #fff

.footer-content
  padding: 78px 0 66px

.footer-logo
  display: block
  margin-bottom: 40px

.footer-copy
  font-size: 16px
  font-weight: bold
  line-height: 1.98

.footer-copyright
  background-color: #101010
  display: flex
  justify-content: center
  padding: 34px 0
  position: relative

  small
    font-size: 16px
    font-family: 'Montserrat', sans-serif
    letter-spacing: 0.1em

.footer-back2top
  position: absolute
  top: -70px
  right: 122px
  width: 70px
  height: 70px
  background-color: #fff
  color: #000
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  font-size: 16px
  font-weight: bold
  font-family: 'Montserrat', sans-serif
  letter-spacing: 0.09em
  cursor: pointer

.footer-back2top-icon
  display: inline-block
  width: 17px
  height: 28px
  background-position: center
  background-repeat: no-repeat
</style>
