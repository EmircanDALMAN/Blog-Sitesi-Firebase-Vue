import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Blogs from "@/views/Blogs";
import Login from "@/views/Login";
import Register from "@/views/Register";
import ForgotPassword from "@/views/ForgotPassword";
import Profile from "@/views/Profile";
import Admin from "@/views/Admin";
import CreatePost from "@/views/CreatePost";
import BlogPreview from "@/views/BlogPreview";
import ViewBlog from "@/views/ViewBlog";
import EditBlog from "@/views/EditBlog";
import firebase from "firebase/app";
import "firebase/auth"

Vue.use(VueRouter);

const routes = [
   {path: "/", name: "Home", component: Home, meta: {title: "Anasayfa", requiresAuth: false}},
   {path: "/blogs", name: "Blogs", component: Blogs, meta: {title: "Blogs", requiresAuth: false}},
   {path: "/login", name: "Login", component: Login, meta: {title: "Giriş", requiresAuth: false}},
   {path: "/register", name: "Register", component: Register, meta: {title: "Kayıt Ol", requiresAuth: false}},
   {
      path: "/forgot-password",
      name: "ForgotPassword",
      component: ForgotPassword,
      meta: {title: "Şifremi Unuttum", requiresAuth: false}
   },
   {path: "/profile", name: "Profile", component: Profile, meta: {title: "Profil", requiresAuth: true}},
   {path: "/admin", name: "Admin", component: Admin, meta: {title: "Admin", requiresAuth: true, requiresAdmin: true}},
   {
      path: "/create-post",
      name: "CreatePost",
      component: CreatePost,
      meta: {title: "Yeni Post Ekle", requiresAuth: true, requiresAdmin: true}
   },
   {
      path: "/post-preview",
      name: "BlogPreview",
      component: BlogPreview,
      meta: {title: "Blog Post Önizleme", requiresAuth: true, requiresAdmin: true}
   },
   {
      path: "/view-blog/:id",
      name: "ViewBlog",
      component: ViewBlog,
      meta: {title: "Post'u Görüntüle", requiresAuth: true}
   },
   {
      path: "/edit-blog/:id",
      name: "EditBlog",
      component: EditBlog,
      meta: {title: "Post'u Düzenle", requiresAuth: true, requiresAdmin: true}
   },
];

const router = new VueRouter({
   mode: "history",
   base: process.env.BASE_URL,
   routes,
});

router.beforeEach((to, from, next) => {
   document.title = `${to.meta.title} | FireBlog`
   next();
})

router.beforeEach(async (to, from, next) => {
   let user = firebase.auth().currentUser;
   let admin = null;
   if (user) {
      let token = await user.getIdTokenResult();
      admin = token.claims.admin;
   }
   if (to.matched.some((res) => res.meta.requiresAuth)) {
      if (user) {
         if (to.matched.some((res) => res.meta.requiresAdmin)) {
            if (admin) {
               return next();
            }
            return next({name: "Home"})
         }
         return next();
      }
      return next({name: "Home"})
   }
   return next();
})

export default router;
