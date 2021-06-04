<template>
  <div class="blog-card">
    <div class="icons" v-show="editPost">
      <div @click="$router.push({name: 'EditBlog', params: {id: post.id}})" class="icon">
        <Edit class="edit"/>
      </div>
      <div @click="deletePost" class="icon">
        <Delete class="delete"/>
      </div>
    </div>
    <img :src="post.coverPhoto" alt="">
    <div class="info">
      <h4>{{ post.title }}</h4>
      <h6>Paylaşıldı: {{ new Date(post.timestamp).toLocaleString("tr-TR", {dateStyle: "long"}) }}</h6>
      <router-link class="link" :to="{name: 'ViewBlog', params: { id: this.post.id }}">
        Gönderiyi Görüntüle
        <Arrow class="arrow"/>
      </router-link>
    </div>
  </div>
</template>

<script>
import Arrow from "../assets/Icons/arrow-right-light.svg";
import Edit from "../assets/Icons/edit-regular.svg";
import Delete from "../assets/Icons/trash-regular.svg";

export default {
  name: "BlogCard",
  props: ["post"],
  components: {Arrow, Edit, Delete},
  computed: {
    editPost() {
      return this.$store.state.editPost;
    }
  },
  methods: {
    deletePost() {
      this.$store.dispatch("deletePost", this.post.id);
    }
  },
}
</script>

<style scoped>
.blog-card {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: #fff;
  min-height: 420px;
  transition: .5s ease all;
}

.blog-card:hover {
  transform: rotateZ(-1deg) scale(1.01);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.blog-card .icons {
  display: flex;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 99;
}

.blog-card .icons .icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #fff;
  transition: .5s ease all;
}

.blog-card .icons .icon:hover {
  background-color: #303030;
}

.blog-card .icons .icon:hover .edit path,
.blog-card .icons .icon:hover .delete path {
  fill: #fff;
}

.blog-card .icons .icon:nth-child(1) {
  margin-right: 8px;
}

.blog-card .icons .icon .edit,
.blog-card .icons .icon .delete {
  pointer-events: none;
  height: 15px;
  width: auto;
}

.blog-card img {
  display: block;
  border-radius: 8px 8px 0 0;
  z-index: 1;
  width: 100%;
  min-height: 200px;
  object-fit: cover;
}

.blog-card .info {
  display: flex;
  flex-direction: column;
  height: 100%;
  z-index: 3;
  padding: 32px 16px;
  color: #000;
}

.blog-card .info h4 {
  padding-bottom: 8px;
  font-size: 20px;
  font-weight: 300;
}

.blog-card .info h6 {
  font-weight: 400;
  font-size: 12px;
  padding-bottom: 16px;
}

.blog-card .info .link {
  display: inline-flex;
  align-items: center;
  margin-top: auto;
  font-weight: 500;
  padding-top: 20px;
  font-size: 12px;
  padding-bottom: 4px;
  transition: .5s ease-in all;
}

.blog-card .info .link:hover {
  color: rgba(48, 48, 48, 0.8);
}

.blog-card .info .link .arrow {
  width: 10px;
}
</style>
















