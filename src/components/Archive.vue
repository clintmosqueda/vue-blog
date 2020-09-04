<template>
  <section class="archive">
    <div class="archive-header">
      <h2 class="archive-heading">NEWS</h2>
      <router-link class="archive-create" to="/news/new" v-if="authenticatedStatus">Create New Post</router-link>
    </div>
    <div class="archive-content">
      <router-link 
        class="archive-link" 
        v-for="post in limitPost" 
        :to="`/news/${post.id}`"
        :key="post.id"
        >
        <Article 
          :image="post.image"
          :date="post.createdAt"
          :title="post.title"
          />
      </router-link>
    </div>
    <div class="archive-button">
      <button class="button" :class="{isDisable : hideButton }" @click="loadMore()">LOAD MORE</button>
    </div>
  </section>
</template>

<script>


import { mapGetters } from 'vuex'
import { GET_POSTS } from "@/gql/queries.js";
import Article from '@/components/Article'
import Button from '@/components/Button' 

export default {
  name: 'Archive',
  props: ['articles'],
  components: {
    Article,
    Button,
  },
  data() {
    return {
      posts: [],
      initPost: 6
    }
  },
  apollo: {
    posts: {
      query: GET_POSTS,
    }
  },
  computed: {
    ...mapGetters([
      'authenticatedStatus'
    ]),
    totalPost() {
      return this.posts.length;
    },
    limitPost() {
      return this.posts.slice(0,this.initPost)
    },
    hideButton() {
      return this.initPost >= this.totalPost ? true : false
    }
  },
  methods: {
    loadMore () {
      this.initPost += 6
    },
  },
}
</script>

<style lang="sass">
.archive
  padding: 98px 0 150px

.archive-header
  display: flex
  align-items: center
  justify-content: space-between
  margin-bottom: 65px

.archive-heading
  font-size: 50px
  font-weight: bold
  font-family: 'Montserrat', sans-serif
  letter-spacing: 0.09em

.archive-create
  font-size: 20px
  font-weight: bold
  font-family: 'Montserrat', sans-serif
  letter-spacing: 0.09em
  color: #000

.archive-content
  display: flex
  flex-wrap: wrap
  margin: 0 -20px
  padding-bottom: 30px
  transition: all 500ms ease-out

.archive-link
  width: calc((100%/3) - 40px)
  margin: 0 20px 40px
  display: block
  color: #101010
  text-decoration: none

.archive-button
  margin: 0 auto
  width: 340px

.card-enter,
.card-leave-to
  opacity: 0
  transform: translateY(100px)

.card-enter-active,
.card-leave-active
  transition: all 400ms ease-out


</style>