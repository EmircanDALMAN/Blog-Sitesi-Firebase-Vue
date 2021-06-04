<template>
  <div class="create-post">
    <BlogCoverPreview v-show="this.$store.state.blogPhotoPreview"/>
    <Loading v-show="loading"/>
    <div class="container">
      <div :class="{invisible: !error}" class="error-message">
        <p><span>Error: </span>{{ this.errorMsg }}</p>
      </div>
      <div class="blog-info">
        <input type="text" placeholder="Enter Blog Title" v-model="blogTitle"/>
        <div class="upload-file">
          <label for="blog-photo">Fotoğraf Yükle</label>
          <input @change="fileChange" type="file" ref="blogPhoto" id="blog-photo" accept=".png, .jpg, .jpeg"/>
          <button @click="openPreview" class="preview"
                  :class="{'button-inactive' : !this.$store.state.blogPhotoFileURL}">
            Yüklenen Fotoğrafı Göster
          </button>
          <span>Seçilen Dosya: {{ this.$store.state.blogPhotoName }}</span>
        </div>
      </div>
      <div class="editor">
        <vue-editor :editorOptions="editorSettings" v-model="blogHTML" useCustomImageHandler
                    @image-added="imageHandler"/>
      </div>
      <div class="blog-actions">
        <button @click="updateBlog">Değişiklikleri Kaydet</button>
        <router-link class="router-button" :to="{name: 'BlogPreview'}">Değişiklikleri Göster</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Quill from "quill";
import BlogCoverPreview from "@/components/BlogCoverPreview";
import firebase from "firebase/app";
import "firebase/storage";
import db from "../firebase/firebaseInit"
import Loading from "@/components/Loading";

window.Quill = Quill;
const ImageResize = require("quill-image-resize-module").default;
Quill.register("modules/imageResize", ImageResize);

export default {
  name: "CreatePost",
  components: {Loading, BlogCoverPreview},
  async mounted() {
    this.routeID = this.$route.params.id
    this.currentBlog = await this.$store.state.posts.filter(post => post.id === this.routeID)[0];
    this.$store.commit("setBlogState", this.currentBlog)
  },
  data() {
    return {
      file: null,
      error: null,
      errorMsg: null,
      loading: null,
      routeID: null,
      currentBlog: null,
      editorSettings: {
        modules: {
          imageResize: {},
        }
      }
    }
  },
  methods: {
    fileChange() {
      this.file = this.$refs.blogPhoto.files[0];
      const fileName = this.file.name;
      this.$store.commit("fileNameChange", fileName)
      this.$store.commit("createFileURL", URL.createObjectURL(this.file))
    },
    openPreview() {
      this.$store.commit("openPhotoPreview");
    },
    imageHandler(file, editor, cursorLocation, resetUploader) {
      const storageRef = firebase.storage().ref();
      const docRef = storageRef.child(`documents/blogPostPhotos/${file.name}`);
      docRef.put(file).on("state_changed", () => {

      }, (error) => {
        console.log(error)
      }, async () => {
        const downloadURL = await docRef.getDownloadURL();
        editor.insertEmbed(cursorLocation, "image", downloadURL);
        resetUploader();
      })
    },
    async updateBlog() {
      const database = await db.collection("posts").doc(this.routeID);
      if (this.blogTitle.length !== 0 && this.blogHTML.length !== 0) {
        if (this.file) {
          this.loading = true;
          const storageRef = firebase.storage().ref();
          const docRef = storageRef.child(`documents/BlogCoverPhotos/${this.$store.state.blogPhotoName}`);
          docRef.put(this.file).on("state_changed", () => {
          }, error => {
            console.log(error)
            this.loading = false;
          }, async () => {
            const downloadURL = await docRef.getDownloadURL();

            await database.update({
              html: this.blogHTML,
              coverPhoto: downloadURL,
              coverPhotoName: this.blogCoverPhotoName,
              title: this.blogTitle,
            })
            await this.$store.dispatch("updatePost", this.routeID);
            this.loading = false;
            this.$router.push({name: "ViewBlog", params: {id: database.id}})
          })
          return;
        }
        this.loading = true;
        await database.update({
          html: this.blogHTML,
          title: this.blogTitle
        });
        await this.$store.dispatch("updatePost", this.routeID);
        this.loading = false
        this.$router.push({name: "ViewBlog", params: {id: database.id}})
        return;
      }
      this.error = true;
      this.errorMsg = "Please ensure blog title & blog post has been filled!";
      setTimeout(() => {
        this.error = false;
      }, 5000)
    },
  },
  computed: {
    profileId() {
      return this.$store.state.profileId;
    },
    blogCoverPhotoName() {
      return this.$store.state.blogPhotoName;
    },
    blogTitle: {
      get() {
        return this.$store.state.blogTitle;
      },
      set(payload) {
        this.$store.commit("updateBlogTitle", payload);
      }
    },
    blogHTML: {
      get() {
        return this.$store.state.blogHTML;
      },
      set(payload) {
        this.$store.commit("newBlogPost", payload);
      }
    }
  }
}
</script>

<style>
.create-post {
  position: relative;
  height: 100%;
}

.create-post button {
  margin-top: 0;
}

.create-post .router-button {
  text-decoration: none;
  color: white;
}

.create-post label,
.create-post button,
.create-post .router-button {
  transition: .5s ease-in-out all;
  align-self: center;
  font-size: 14px;
  cursor: pointer;
  border-radius: 20px;
  padding: 12px 24px;
  color: #fff;
  background-color: #303030;
  text-decoration: none;
}

.create-post label:hover,
.create-post button:hover,
.create-post .router-button:hover {
  background-color: rgba(48, 48, 48, 0.7);
}

.create-post .container {
  position: relative;
  height: 100%;
  padding: 10px 25px 60px;
}

.create-post .blog-info {
  display: flex;
  margin-bottom: 32px;
}

.create-post .blog-info input:nth-child(1) {
  min-width: 300px;
}

.create-post .blog-info input {
  transition: .5s ease-in-out all;
  padding: 10px 4px;
  border: none;
  border-bottom: 1px solid #303030;
}

.create-post .blog-info input:focus {
  outline: none;
  box-shadow: 0 1px 0 0 #303030;
}

.create-post .blog-info .upload-file {
  flex: 1;
  margin-left: 16px;
  position: relative;
  display: flex;
}

.create-post .blog-info .upload-file input {
  display: none;
}

.create-post .blog-info .upload-file .preview {
  margin-left: 16px;
  text-transform: initial;
}

.create-post .blog-info .upload-file span {
  font-size: 12px;
  margin-left: 16px;
  align-self: center;
}

.create-post .editor {
  height: 60vh;
  display: flex;
  flex-direction: column;
}

.create-post .editor .quillWrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.create-post .editor .ql-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: scroll;
}

.create-post .editor .ql-editor {
  padding: 20px 16px 30px;
}

.create-post .blog-actions {
  margin-top: 32px;
}

.create-post .blog-actions button {
  margin-right: 16px;
}

/* Error Styling */
.create-post .invisible {
  opacity: 0 !important;
}

.create-post .error-message {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  color: #fff;
  margin-bottom: 10px;
  background-color: #303030;
  opacity: 1;
  transition: .5s ease all;
}

.create-post .error-message p {
  font-size: 14px;
}

.create-post .error-message span {
  font-weight: 600;
}

</style>
















