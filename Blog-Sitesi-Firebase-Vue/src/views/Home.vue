<template>
  <div class="home">
    <BlogPost v-if="!user" :post="welcomeScreen"/>
    <BlogPost v-for="(post,index) in getPosts" :key="index" :post="post"/>
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blogs</h3>
        <div class="blog-cards">
          <BlogCard v-for="(post, index) in postsCards" :key="index" :post="post"/>
        </div>
      </div>
    </div>
    <div v-if="!user" class="updates">
      <div class="container">
        <h2>never miss a post. Register for your free account today!</h2>
        <router-link class="router-button" to="#">Kayıt Ol
          <Arrow/>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BlogPost from "@/components/BlogPost";
import BlogCard from "@/components/BlogCard";
import Arrow from "../assets/Icons/arrow-right-light.svg";

export default {
  name: "Home",
  components: {BlogCard, BlogPost, Arrow},
  data() {
    return {
      welcomeScreen: {
        title: "Hoşgeldin!",
        blogPost: "",
        welcomeScreen: true,
        photo: "coding",
      },
    }
  },
  computed: {
    getPosts() {
      return this.$store.getters.getPosts;
    },
    postsCards() {
      return this.$store.getters.postsCards;
    },
    user() {
      return this.$store.state.user;
    }
  }
};
</script>
<style scoped>
.blog-card-wrap h3 {
  font-weight: 300;
  font-size: 28px;
  margin-bottom: 32px;
}

.updates .container {
  padding: 100px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.updates .container .router-button {
  display: flex;
  font-size: 14px;
  text-decoration: none;
}

.updates .container h2 {
  font-weight: 300;
  font-size: 32px;
  max-width: 425px;
  width: 100%;
  text-align: center;
  text-transform: uppercase;
}

@media (min-width: 800px) {
  .updates .container {
    padding: 125px 25px;
    flex-direction: row;
  }

  .updates .container .router-button {
    margin-left: auto;
  }

  .updates .container h2 {
    text-align: initial;
    font-size: 40px;
  }
}
</style>
