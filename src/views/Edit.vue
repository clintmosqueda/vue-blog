<template>
  <div class="create">
    <Breadcrumbs title="Edit Post"/>
    <div class="wrapper">
      <form @submit.prevent="updateNews" class="create-form">
        <div class="create-actions">
          <button class="create-action" type="submit">Save Post</button>
          <span class="create-action" tag="span" @click="handleCancel">Cancel</span>
        </div>
        <textarea class="create-title" placeholder="Title" ref="postTitle" :value="post.title"></textarea>
        <div class="create-image-wrap" :style="{backgroundImage: `url('${featureImage}')`}">
          <label class="create-button" for="file-upload">UPLOAD IMAGE</label>
          <input class="create-file-upload" id="file-upload" @change="onImageSelected" type="file" accept="image/*">
        </div>
        <textarea class="create-content" placeholder="Content" ref="postContent" :value="post.content"></textarea>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dummyImage from '@/assets/mv.jpg'
import Breadcrumbs from '@/components/Breadcrumbs'
import { GET_POST_BY_ID, GET_POSTS } from '@/gql/queries'
import { UPDATE_POST } from '@/gql/mutations'

export default {
  name: 'Edit',
  components: {
    Breadcrumbs
  },
  data() {
    return {
      updatePost: UPDATE_POST,
      post: '',
      title: '',
      image: null,
      content: '',
      dummyImage,
      id: null,
    }
  },
  computed: {
    ...mapGetters([
      'cachedPost'
    ]),
    featureImage() {
      if(this.post.image) {
        return this.post.image
      } else {
        return this.image
      }
    }
  },
  beforeMount () {
    this.id = Number(this.$route.params.id)
    
  },
  updated() {
    this.title = this.$refs.postTitle.value 
    this.content = this.$refs.postContent.value
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
  methods: {
    onImageSelected(event) {
      const selectedImage = event.target.files[0]
      this.toBase64(selectedImage);
      console.log({event})
    },
    toBase64(fileObeject) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.image = e.target.result
      }
      reader.readAsDataURL(fileObeject)
    },
    updateNews() {      
      this.$apollo.mutate({
        mutation: UPDATE_POST,
        variables: {
          id: Number(this.$route.params.id),
          title: this.$refs.postTitle.value,
          image: this.image,
          content: this.$refs.postContent.value
        },
        updatePostCache: (store, {data: {updatePost}}) => {
          try {
          const data = store.readQuery({ query: GET_POST_BY_ID, variables: { id: this.id } })
          data.posts.conct({...updatePost})
          console.log(data)
          store.writeQuery({ query: GET_POST_BY_ID, data})
          } catch (error) {
            console.log(error)
          }
        },
      })
      .then(response => {
        this.$router.push(`/news/${this.id}`)
      })
    },
    handleCancel() {
      this.$router.push(`/news/${this.id}`)
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
  background-size: contain
  background-position: center
  background-repeat: no-repeat
  height: 540px
  position: relative
  display: flex
  align-items: flex-end
  margin-bottom: 36px

.create-image
  width: 100%
  height: 100%
  position: absolute
  top: 0
  left: 0
  pointer-events: none

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