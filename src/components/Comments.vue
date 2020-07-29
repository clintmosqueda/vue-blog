<template>
  <section class="comments">
    <article class="comments-content" v-for="comment in comments.slice().reverse()" :key="comment.id"> 
      <p class="comments-text">{{comment.content}}</p>
      <time class="comments-date">{{comment.createdAt}}</time>
    </article>
  </section>
</template>

<script>
export default {
  name: 'Comments',
  props: ['comments'],
}
</script>


<style lang="sass">
.comments

.comments-content
  background-color: #F5F5F5
  padding: 48px 40px
  margin-bottom: 50px 

.comments-text
  font-size: 18px
  line-height: 2.2
  margin-bottom: 28px

.comments-date
  font-size: 16px
  font-weight: bold
  font-family: 'Montserrat', sans-serif
  letter-spacing: 0.1em
</style>