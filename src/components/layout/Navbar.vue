<template>
  <div class="navbar">
    <nav class="deep-purple darken-1">
      <!-- Container class brings elements into a central column -->
      <div class="container">
        <router-link :to="{name: 'GMap'}" class="brand-logo left">GeoNinjas!</router-link>
        <ul class="right">
          <li v-if="!user">
            <router-link :to="{ name: 'Signup'}">Sign Up</router-link>
          </li>
          <li v-if="!user">
            <router-link :to="{ name: 'Login'}">Log In</router-link>
          </li>
          <li v-if="user">
            <a @click="viewProfile">{{ user.email }}</a>
          </li>
          <li v-if="user">
            <a @click="logOut">Log Out</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";

export default {
  name: "Navbar",
  data() {
    return {
      user: null,
      slug: null
    };
  },
  methods: {
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Login" });
        });
    },
    viewProfile() {
      if (!this.slug) {
        console.log(this.user.uid);
        db.collection("users")
          .where("user_id", "==", this.user.uid)
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              this.slug = doc.id;
              console.log("Slug: ", this.slug);
            });
          })
          .then(() => {
            console.log("Just set the slug. Pushing to " + this.slug);
            this.$router.push({
              name: "ViewProfile",
              params: { id: this.slug }
            });
          });
      } else {
        console.log("Pushing to /profile/" + this.slug);
        this.$router.push({
          name: "ViewProfile",
          params: { id: this.slug }
        });
      }
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }
};
</script>

<style></style>
