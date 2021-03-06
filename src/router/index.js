import Vue from "vue";
import Router from "vue-router";
import GMap from "@/components/home/Gmap";
import Signup from "@/components/auth/Signup";
import Login from "@/components/auth/Login";
import ViewProfile from "@/components/profile/ViewProfile";
import firebase from "firebase";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "GMap",
      component: GMap
      // meta: {
      //   requiresAuth: true
      // }
    },
    {
      path: "/signup",
      name: "Signup",
      component: Signup
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/profile/:id",
      name: "ViewProfile",
      component: ViewProfile
      // meta: {
      //   requiresAuth: true
      // }
    }
  ]
});

router.beforeEach((to, from, next) => {
  // Check to see if route requires auth
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    // Check auth state of user
    let user = firebase.auth().currentUser;
    if (user) {
      // User signed in, proceed to route
      next();
    } else {
      // No user signed in, redirect to login
      next({ name: "Login" });
    }
  } else {
    // Doesn't require auth, just proceed to next page
    next();
  }
});

export default router;
