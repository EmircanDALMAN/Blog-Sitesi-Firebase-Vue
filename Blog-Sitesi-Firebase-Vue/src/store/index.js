import Vue from 'vue'
import Vuex from 'vuex'
import "firebase/auth";
import firebase from "firebase/app";
import db from "../firebase/firebaseInit";

Vue.use(Vuex)

export default new Vuex.Store({
   state: {
      posts: [],
      postLoaded: null,
      blogHTML: "Write your blog title here...",
      blogTitle: "",
      blogPhotoName: "",
      blogPhotoFileURL: null,
      blogPhotoPreview: null,
      editPost: null,
      user: null,
      profileAdmin: null,
      profileEmail: null,
      profileFirstName: null,
      profileLastName: null,
      profileUserName: null,
      profileId: null,
      profileInitials: null,
   },
   getters: {
      getPosts(state) {
         return state.posts.slice(0, 2);
      },
      postsCards(state) {
         return state.posts.slice(2, 6);
      },
   },
   mutations: {
      setBlogState(state, payload) {
         state.blogTitle = payload.title;
         state.blogHTML = payload.html;
         state.blogPhotoFileURL = payload.coverPhoto;
         state.blogPhotoName = payload.coverPhotoName;
      },
      filterPosts(state, payload) {
         state.posts = state.posts.filter(post => post.id !== payload)
      },
      openPhotoPreview(state) {
         state.blogPhotoPreview = !state.blogPhotoPreview;
      },
      newBlogPost(state, payload) {
         state.blogHTML = payload;
      },
      fileNameChange(state, payload) {
         state.blogPhotoName = payload;
      },
      createFileURL(state, payload) {
         state.blogPhotoFileURL = payload;
      },
      updateBlogTitle(state, payload) {
         state.blogTitle = payload;
      },
      toggleEditPost(state, payload) {
         state.editPost = payload;
      },
      updateUser(state, payload) {
         state.user = payload;
      },
      // updateProfileAdmin(state, payload){
      //   // state.profileAdmin = payload;
      // },,
      setProfileAdmin(state) {
         state.profileAdmin = true
      },
      setProfileInfo(state, user) {
         state.profileId = user.id;
         state.profileEmail = user.data().email;
         state.profileFirstName = user.data().firstName;
         state.profileLastName = user.data().lastName;
         state.profileUserName = user.data().userName;
      },
      setProfileInitials(state) {
         state.profileInitials =
            state.profileFirstName.match(/(\b\S)?/g).join("") +
            state.profileLastName.match(/(\b\S)?/g).join("");
      },
      changeFirstName(state, payload) {
         state.profileFirstName = payload;
      },
      changeLastName(state, payload) {
         state.profileLastName = payload;
      },
      changeEmail(state, payload) {
         state.profileEmail = payload;
      },
      changeUserName(state, payload) {
         state.profileUserName = payload;
      }
   },
   actions: {
      async getCurrentUser({commit}, user) {
         const doc = await db
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get();
         commit("setProfileInfo", doc);
         commit("setProfileInitials")
         const token = await user.getIdTokenResult();
         const admin = await token.claims.admin;
         commit("setProfileAdmin", admin);
      },
      async updateUserSettings({commit, state}) {
         await db
            .collection("users")
            .doc(state.profileId)
            .update({
               firstName: state.profileFirstName,
               lastName: state.profileLastName,
               userName: state.profileUserName,
            });
         commit("setProfileInitials")
      },
      async getPosts({state}) {
         const result = await db.collection("posts").orderBy("timestamp", "desc").get();
         result.forEach((doc) => {
            if (!state.posts.some(post => post.id === doc.id)) {
               const data = {
                  id: doc.data().id,
                  html: doc.data().html,
                  title: doc.data().title,
                  coverPhoto: doc.data().coverPhoto,
                  coverPhotoName: doc.data().coverPhotoName,
                  timestamp: doc.data().timestamp
               };
               state.posts.push(data);
            }
         })
         state.postLoaded = true
      },
      async deletePost({commit}, payload) {
         await db.collection("posts").doc(payload).delete()
         commit("filterPosts", payload);
      },
      async updatePost({commit , dispatch}, payload){
         commit("filterPosts", payload);
         await dispatch("getPosts")
      }
   },
   modules: {}
})
