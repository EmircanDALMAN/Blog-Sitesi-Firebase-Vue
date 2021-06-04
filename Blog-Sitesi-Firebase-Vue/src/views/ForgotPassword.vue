<template>
  <div class="reset-password">
    <Modal v-if="modalActive" :modal-message="modalMessage" v-on:close-modal="closeModal"/>
    <Loading v-if="loading"/>
    <div class="form-wrap">
      <form class="reset">
        <p class="login-register">Back To
          <router-link class="router-link" :to="{name: 'Login'}">Giriş</router-link>
        </p>
        <h2>Reset Password</h2>
        <p>Forgot Your Password? Enter your email to reset it</p>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Email" v-model="email"/>
            <Email class="icon"/>
          </div>
        </div>
        <button @click.prevent="resetPassword">Reset</button>
        <div class="angle"></div>
      </form>
      <div class="background"></div>
    </div>
  </div>
</template>
<script>
import Email from "../assets/Icons/envelope-regular.svg";
import Modal from "@/components/Modal";
import Loading from "@/components/Loading";
import "firebase/auth";
import firebase from "firebase";

export default {
  name: "ForgotPassword",
  components: {Loading, Modal, Email},
  data() {
    return {
      email: null,
      modalActive: null,
      modalMessage: "",
      loading: null,
    }
  },
  methods: {
    resetPassword() {
      this.loading = true;
      firebase.auth().sendPasswordResetEmail(this.email)
          .then(() => {
            this.modalMessage = "If Your account exists, you will receive a email"
            this.loading = false;
            this.modalActive = true;
          })
          .catch(error => {
            this.modalMessage = error.message;
            this.loading = false;
            this.modalActive = true
          })
    },
    closeModal() {
      this.modalActive = !this.modalActive;
      this.email = ""
    }
  }
}
</script>

<style scoped>
.reset-password {
  position: relative;
}

.reset-password .form-wrap .reset h2 {
  margin-bottom: 8px;
}

.reset-password .form-wrap .reset p {
  text-align: center;
  margin-bottom: 32px;
}

</style>
