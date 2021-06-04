<template>
  <div class="post-view" v-if="currentBlog">
    <div class="container quillWrapper">
      <h2>{{ this.currentBlog[0].title }}</h2>
      <h4>Paylaşıldı: {{ new Date(this.currentBlog[0].timestamp).toLocaleString("tr-TR", {dateStyle: "long"}) }}</h4>
      <img :src="this.currentBlog[0].coverPhoto" alt="">
      <div class="post-content ql-editor" v-html="this.currentBlog[0].html"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewBlog",
  data() {
    return {
      currentBlog: null,
    }
  },
  async mounted() {
    this.currentBlog = await this.$store.state.posts.filter(post => {
      return post.id === this.$route.params.id
    })
  },
}
</script>

<style>
.post-view h4 {
  font-weight: 400;
  font-size: 14px;
  margin-bottom: 24px;
}
</style>
