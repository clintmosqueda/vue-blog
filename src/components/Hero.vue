<template>
  <div class="hero">
    <ApolloQuery :query="query" :variables="{limit: maxSlides}">
      <template slot-scope="{result: {loading, error, data}}">
        <div v-if="loading">Loading...</div>
        <div v-if="error">something goes wrong</div>
        <div class="hero-inner" v-if="data">
          <div class="hero-block" 
            v-for="(bannerArticle, index) in data.posts" 
            :key="index" 
            :class="slide == index+1 ? 'is-active' : ''">
            <section 
              class="hero-image"
              :style="`backgroundImage: url(${dummyImage})`">
              <div class="wrapper">
                <div class="hero-content">
                  <div class="hero-content-inner">
                    <h2 class="hero-heading">{{bannerArticle.title}}</h2>
                    <time class="hero-time" v-bind:dateTime="bannerArticle.createdAt">{{bannerArticle.createdAt}}</time>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </template>
    </ApolloQuery>

    <div class="hero-dots">
      <span class="hero-dot" 
        v-for="(n, index) in maxSlides"
        :id="index+1" 
        :key="index"
        :class="slide == index+1 ? 'is-active' : ''"
        @click="handlePagination(index+1)"
      >
      </span>
    </div>
    <div class="hero-arrows">
      <button class="hero-arrow hero-prev" @click="handlePrev">&lt;</button>
      <button class="hero-arrow hero-next" @click="handleNext">&gt;</button>
    </div>
  </div>
</template>

<script>
import dummyImage from '@/assets/mv.jpg'
import { LIMIT_POSTS } from "@/gql/queries.js";

export default {
  name: 'Hero',
  data() {
    return {
      slide: 1,
      dummyImage,
      query: LIMIT_POSTS,
      maxSlides: 3,
    }
  },
  methods: {
    handlePrev() {
      if(this.slide <= 1) {
        this.slide = this.maxSlides;
      } else {
        this.slide -= 1
      }
    },
    handleNext() {
      if (this.slide >= this.maxSlides ) {
        this.slide = 1
      } else {
        this.slide ++
      }
    },
    handlePagination(index) {
      this.slide = index;
    }
  },
}
</script>

<style lang="sass">
.hero
  position: relative
  height: 666px

.hero-block
  position: absolute
  top: 0
  left: 0
  width: 100%
  opacity: 0
  transition: opacity 500ms ease-in-out

  &.is-active
    opacity: 1

.hero-image
  background-position: center
  background-repeat: no-repeat
  background-size: cover

.hero-content
  height: 666px
  display: flex
  flex-direction: column
  justify-content: center
  align-items: flex-end
  flex-shrink: 0

.hero-content-inner
  width: 560px
  text-align: right

.hero-heading
  font-size: 60px
  color: #fff
  background-color: #000
  box-decoration-break: clone
  box-shadow: 0.50em 0 0 #000,-0.50em 0 0 #000
  display: inline
  padding: 8px 0
  line-height: 1.56
  word-break: break-all

.hero-time
  font-size: 28px
  font-family: 'Montserrat', sans-serif
  letter-spacing: 0.2em
  margin-top: 24px
  display: block

.hero-dots
  position: absolute
  bottom: 51px
  left: 0
  width: 100%
  display: flex
  justify-content: center
  align-items: center

.hero-dot
  display: inline-block
  background-color: #707070
  width: 15px
  height: 15px
  border-radius: 50%
  margin: 0 5px
  cursor: pointer

  &.is-active
    background-color: #000

.hero-arrows
  position: absolute
  left: 0
  top: 50%
  transform: translateY(-50%)
  width: 100%
  display: flex
  justify-content: space-between
  z-index: 1
  padding: 0 30px

.hero-arrow
  appearance: none
  border: none
  background: transparent
  font-size: 30px
  font-family: 'Montserrat', sans-serif
  font-weight: bold
  cursor: pointer

  &:focus,
  &:active
    outline: none

</style>