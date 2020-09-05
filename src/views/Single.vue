<template>
  <div class="single">
    <Breadcrumbs :title="post.title"/>
    <div class="wrapper">
      <div class="single-actions" v-if="authenticatedStatus">
        <span class="single-action" @click="onEdit">Edit Post</span>
      </div>
      <div class="single-header">
        <time class="single-time">{{post.createdAt | dateFormat}}</time>
        <h1 class="single-title">{{post.title}}</h1>
        <div class="single-image" :style="`backgroundImage: url(${featureImage})`"></div>
      </div>
      <div class="single-content">
        <p>{{post.content}}</p>
      </div>
      <div class="single-comment">
        <h2 class="single-comment-heading">COMMENT</h2>
        <template v-if="post.comments">
          <Comments :comments="post.comments"/>
        </template>
      </div>
    </div>
    <div class="wrapper">
      <ApolloMutation
        :mutation="addCommentMutation"
        :variables="{postId: id, content: contents}"
        :update="updateCacheComment"
        @done="onComment"
      >
        <template slot-scope="{ mutate, loading, error }">
          <form class="single-form" @submit.prevent="mutate">
            <textarea class="single-form-textarea" placeholder="Write comment" v-model="contents"></textarea>
            <Button class="single-button" type="submit" text="Submit"/>
            <span v-if="loading">posting...</span>
            <span v-if="error">something went wrong</span>
          </form>
        </template>
      </ApolloMutation>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { GET_POST_BY_ID } from '@/gql/queries'
import { ADD_COMMENT } from '@/gql/mutations'
import Comments from '@/components/Comments'
import Breadcrumbs from '@/components/Breadcrumbs'
import Button from '@/components/Button'
import dummyImage from '@/assets/mv.jpg'

export default {
  name: 'Single',
  components: {
    Breadcrumbs,
    Comments,
    Button
  },
  data () {
    return {
      dummyImage,
      getPostQuery: GET_POST_BY_ID,
      addCommentMutation: ADD_COMMENT,
      id: null,
      contents: '',
      post: ''
    }
  },
  beforeMount () {
    this.id = Number(this.$route.params.id)
  },
  apollo: {
    post: {
      query: GET_POST_BY_ID,
      variables () {
        return {
          id: this.id
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'authenticatedStatus'
    ]),
    featureImage() {
      if(this.post.image) {
        return this.post.image
      }
    }
  },
  watch: {
    '$route' (to, from) {
      this.id = Number(to.params.id)
    }
  },
  methods: {
    onEdit() {
      this.$router.push(`/news/${this.id}/edit`)
    },
    onComment () {
      this.contents = ''
    },
    updateCacheComment (store, { data: { addComment } }) {
      const { post } = store.readQuery({ 
        query: GET_POST_BY_ID, 
        variables: { id: this.id } 
      })
      store.writeQuery({
        query: GET_POST_BY_ID,
        data: {
          post: post.comments.unshift(addComment)
        }
      })
    }
  }
}
</script>

<style lang="sass">
.single
  min-height: 100vh

.single-loading
  min-height: 200px
  display: flex
  justify-content: center 
  align-items: center

.single-actions
  display: flex
  align-items: center
  justify-content: flex-end
  margin-bottom: 63px

.single-action
  display: inline-block
  font-size: 20px
  font-weight: bold
  margin-left: 46px
  text-decoration: underline
  letter-spacing: 0.15em
  cursor: pointer

.single-header
  // padding: 120px 0 0
  margin-bottom: 50px

.single-time
  font-size: 20px
  font-family: 'Montserrat', sans-serif
  display: block
  margin-bottom: 33px
  letter-spacing: 0.2em

.single-title
  font-size: 40px
  font-weight: 600
  margin-bottom: 47px
  letter-spacing: 0.1em

.single-image
  height: 540px
  background-position: center
  background-repeat: no-repeat
  background-size: cover
  margin-bottom: 10px
  background-color: #f1f1f1

.single-content
  padding-bottom: 82px

  p
    font-size: 18px
    line-height: 2.2
    margin-bottom: 43px

.single-comment
  border-top: 1px solid #707070
  padding: 59px 0 10px

.single-comment-heading
  font-size: 50px
  color: #000
  font-weight: bold
  font-family: 'Montserrat', sans-serif
  margin-bottom: 40px
  letter-spacing: 0.1em

.single-form
  margin-bottom: 139px

.single-form-textarea
  display: block
  height: 100%
  width: 100%
  resize: none
  font-size: 19px
  border: 1px solid #000
  font-family: 'Montserrat', sans-serif
  font-style: italic
  padding: 20px
  height: 200px
  margin-bottom: 40px

  &:not(:placeholder-shown)
    & + .single-button
      pointer-events: auto
      background-color: rgba(#000, 1)

.single-button
  display: block
  width: 210px
  margin-left: auto
  pointer-events: none
  background-color: rgba(#000, 0.3)

</style>
