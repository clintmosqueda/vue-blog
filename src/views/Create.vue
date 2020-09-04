<template>
  <div class="create">
    <Breadcrumbs title="Create New Post"/>
    <div class="wrapper">
      <form @submit.prevent="addPost" method="post" class="create-form">
        <div class="create-actions">
          <button class="create-action" type="submit">Save Post</button>
          <router-link class="create-action" tag="span" to="/">Cancel</router-link>
        </div>
        <textarea class="create-title" placeholder="Title" v-model="title"></textarea>
        <div class="create-image-wrap" :style="{backgroundImage: `url('${uploadImage}')`}">
          <label class="create-button" for="file-upload">UPLOAD IMAGE</label>
          <input class="create-file-upload" id="file-upload" type="file" @change="onImageSelected">
        </div>
        <textarea class="create-content" placeholder="Content" v-model="content"></textarea>
      </form>
    </div>
  </div>
</template>

<script>
import imageUpload from '@/mixins/ImageUpload'
import { ADD_POST } from '@/gql/mutations'
import { GET_POSTS } from '@/gql/queries'
import Breadcrumbs from '@/components/Breadcrumbs'
import Button from '@/components/Button'

export default {
  name: 'Create',
  components: {
    Breadcrumbs,
    Button
  },
  mixins: [imageUpload],
  data() {
    return {
      addPostMutation: ADD_POST,
      title: '',
      content: '',
      image: null,
    }
  },
  computed: {
    uploadImage() {
      return this.image
    }
  },
  methods: {
    addPost() {
      this.$apollo
      .mutate({
        mutation: ADD_POST,
        variables: {
          title: this.title,
          content: this.content,
          image: this.image
        },
        update: (store, {data: {addPost}}) => {
          const data = store.readQuery({query: GET_POSTS})
          data.posts.push(addPost)
          store.writeQuery({query: GET_POSTS, data})
        }
      })
      .then(response => {
        this.$router.replace('/')
      })
    }
  },
}
</script>

<style lang="sass">
.create
  margin-bottom: 160px

.create-actions
  display: flex
  align-items: center
  justify-content: flex-end
  height: 150px

.create-action
  display: inline-block
  font-size: 20px
  font-weight: bold
  margin-left: 46px
  text-decoration: underline
  letter-spacing: 0.15em
  cursor: pointer
  background-color: transparent

.create-title
  font-size: 40px
  font-family: "游ゴシック", "Yu Gothic", "游ゴシック体", YuGothic, sans-serif
  font-weight: bold
  color: #101010
  border: 1px solid #707070
  height: 150px
  display: block
  width: 100%
  resize: none
  padding: 20px 18px
  letter-spacing: 0.09em
  margin-bottom: 31px

.create-image-wrap
  background-color: #D6D6D6
  height: 540px
  position: relative
  display: flex
  align-items: flex-end
  margin-bottom: 36px

.create-file-upload
  display: none

.create-button
  background-color: #101010
  color: #fff
  font-size: 20px
  font-weight: bold
  font-family: 'Montserrat', sans-serif
  width: 260px
  display: flex
  justify-content: center
  align-items: center
  height: 70px
  border: none
  cursor: pointer
  letter-spacing: 0.09em

.create-content
  height: 394px
  border: 1px solid #707070
  font-size: 18px 
  font-family: "游ゴシック", "Yu Gothic", "游ゴシック体", YuGothic, sans-serif
  padding: 19px 25px
  width: 100%
  display: block
  letter-spacing: 0.09em
  resize: none
</style>
