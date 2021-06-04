<template>
  <footer>
    <div class="container">
      <div class="left">
        <div class="col-1">
          <router-link class="header" :to="{name: 'Home'}">FireBlog</router-link>
          <ul>
            <li><a href="#">
              <youTube class="svg-icon"></youTube>
            </a></li>
            <li><a href="#">
              <twitter class="svg-icon"></twitter>
            </a></li>
            <li><a href="#">
              <instagram class="svg-icon"></instagram>
            </a></li>
            <li><a href="#">
              <linkedin class="svg-icon"></linkedin>
            </a>
            </li>
          </ul>
        </div>
        <div class="col-2">
          <ul>
            <router-link class="link" :to="{name: 'Home'}">Anasayfa</router-link>
            <router-link class="link" :to="{name: 'Blogs'}">Blog</router-link>
            <router-link v-if="admin" class="link" :to="{name: 'CreatePost'}">Yeni Post</router-link>
            <router-link v-if="!user" class="link" :to="{name: 'Login'}">Giriş Yap / Kayıt Ol</router-link>
          </ul>
        </div>
      </div>
      <div class="right"><p>Copyright 2021 All Rights Reserved</p></div>
    </div>
  </footer>
</template>

<script>
import youTube from "../assets/Icons/youtube-brands.svg"
import twitter from "../assets/Icons/twitter-brands.svg"
import instagram from "../assets/Icons/instagram-brands.svg"
import linkedin from "../assets/Icons/linkedin-brands.svg"

export default {
  name: "Footer",
  components: {youTube, instagram, twitter, linkedin},
  computed: {
    user() {
      return this.$store.state.user;
    },
    admin() {
      return this.$store.state.profileAdmin;
    }
  }
}
</script>

<style scoped>
footer {
  margin-top: auto;
  padding: 100px 25px;
  background-color: #303030;
}

footer .container {
  display: flex;
  flex-direction: column;
  gap: 32px;

}

footer .container div {
  display: flex;
  flex: 1;
}

footer .container .left {
  gap: 32px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}

footer .container .header {
  text-align: center;
  font-size: 24px;
  color: #fff;
  text-decoration: none;
  font-weight: 600;
}

footer .container ul {
  gap: 16px;
  list-style: none;
  display: flex;
}

footer .container .col-1,
footer .container .col-2 {
  gap: 32px;
  display: flex;
  flex: 1;
}

footer .container .col-1 {
  flex-direction: column;
}

footer .container .col-1 h2 {
  text-align: center;
}

footer .container .col-1 ul {
  margin-top: auto;
}

footer .container .col-1 ul li {
  display: flex;
  align-items: center;
}

footer .container .col-1 ul li .svg-icon {
  width: 24px;
  height: auto;
  color: #fff;
}

footer .container .col-2 ul {
  height: 100%;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
}

footer .container .col-2 .link {
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  text-decoration: none;
}

footer .container .right {
  gap: 32px;
  color: #fff;
  align-items: center;
  flex-direction: column;
}

footer .container p {
  margin-top: auto;
}

@media (min-width: 800px) {
  footer .container {
    flex-direction: row;
    gap: 0;
  }

  footer .container .left {
    flex-direction: row;
    align-items: initial;
    gap: 0;
  }

  footer .container .col-1,
  footer .container .col-2 {
    gap: 0;
  }

  footer .container .col-1 h2 {
    text-align: initial;
  }

  footer .container .col-2 ul {
    flex-direction: column;
  }

  footer .container .right {
    align-items: flex-end;
    gap: 0;
  }

  footer .container .header {
    text-align: initial;
  }
}
</style>
