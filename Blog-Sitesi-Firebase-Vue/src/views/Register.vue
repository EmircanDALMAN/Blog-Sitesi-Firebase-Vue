<template>
  <div class="form-wrap">
    <form class="register">
      <h2>FireBlog Kayıt</h2>
      <p class="login-register">Already have an account?
        <router-link class="router-link" :to="{name: 'Login'}">Giriş Yap</router-link>
      </p>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="Adınız" v-model="firstName"/>
          <User class="icon"/>
        </div>
        <div class="input">
          <input type="text" placeholder="Soyadınız" v-model="lastName"/>
          <User class="icon"/>
        </div>
        <div class="input">
          <input type="text" placeholder="Kullanıcı Adı" v-model="userName"/>
          <User class="icon"/>
        </div>
        <div class="input">
          <input type="text" placeholder="Email" v-model="email"/>
          <Email class="icon"/>
        </div>
        <div class="input">
          <input type="password" placeholder="Şifre" v-model="password"/>
          <Password class="icon"/>
        </div>
        <div class="error" v-show="error">{{ this.errorMsg }}</div>
      </div>
      <button @click.prevent="register">Kayıt Ol</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import Email from "../assets/Icons/envelope-regular.svg";
import Password from "../assets/Icons/lock-alt-solid.svg";
import User from "../assets/Icons/user-alt-light.svg";
import "firebase/auth";
import firebase from "firebase";
import db from "../firebase/firebaseInit";

export default {
  name: "Register",
  components: {Email, Password, User},
  data() {
    return {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      userName: "",
      error: null,
      errorMsg: "",
    }
  },
  methods: {
    async register() {
      if (this.email !== "" || this.password !== "" || this.firstName !== ""
          || this.lastName !== "" || this.userName !== "") {
        this.error = false;
        this.errorMsg = "";

        const firebaseAuth = await firebase.auth();
        const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.email, this.password)
        const result = await createUser;
        const user = db.collection("users").doc(result.user.uid);
        await user.set({
          firstName: this.firstName,
          lastName: this.lastName,
          userName: this.userName,
          email: this.email,
        })
        this.$router.push({name: "Home"})

        return;
      }
      this.error = true;
      this.errorMsg = "Please Fill out all the fields!";
    }
  }
}
</script>

<style scoped>
.register h2 {
  max-width: 350px;
}
</style>
