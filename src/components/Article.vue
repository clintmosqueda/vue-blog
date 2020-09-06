<template>
  <article class="article">
    <div class="article-image-wrap">
      <div class="article-image" :style="`backgroundImage: url(${thumbnail})`"></div>
    </div>
    <time class="article-date">{{date | dateFormat | replaceDot}}</time>
    <h3 class="article-title">{{title}}</h3>
  </article>
</template>

<script>
import dummyImage from '@/assets/no-image.png'
export default {
  name: 'Article',
  props: ['image', 'date', 'title'],
  data() {
    return {
      dummyImage 
    }
  },
  computed: {
    thumbnail() {
      if(this.image) {
        return this.image
      } else {
        return dummyImage
      }
    }
  },
}
</script>

<style lang="sass">
.article
  border: 1px solid #101010
  padding: 38px 29px 40px
  position: relative

  &:hover
    .article-image
      transform: scale(1.2) translateY(-14px)

.article-image-wrap
  height: 200px
  margin-bottom: 25px
  position: relative

.article-image
  height: 100%
  background-position: center
  background-repeat: no-repeat
  background-size: cover
  background-color: #f1f1f1
  transition: all 300ms ease-out

.article-date
  font-family: 'Montserrat', sans-serif
  font-size: 16px
  font-weight: bold
  letter-spacing: 0.09em
  display: block
  margin-bottom: 13px

.article-title
  letter-spacing: 0.064em
  line-height: 1.66
</style>