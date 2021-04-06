<template>
  <div class="map">
    <div class="google-map" id="map"></div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";

export default {
  name: "GMap",
  data() {
    return {
      lat: 53,
      lng: -2
    };
  },
  methods: {
    renderMap() {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: this.lat, lng: this.lng },
        zoom: 10,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: false
      });

      db.collection("users")
        .get()
        .then(users => {
          users.docs.forEach(doc => {
            let data = doc.data();
            if (data.geolocation) {
              let marker = new google.maps.Marker({
                position: {
                  lat: data.geolocation.lat,
                  lng: data.geolocation.lng
                },
                map
              });
              // Add click event to marker
              marker.addListener("click", () => {
                this.$router.push({
                  name: "ViewProfile",
                  params: { id: doc.id }
                });
              });
            }
          });
        });
    }
  },
  mounted() {
    // Get current user
    let user = firebase.auth().currentUser;

    // Get user's geolocation
    if (navigator.geolocation) {
      // getCurrentPosition() is an asynchronous function that takes three parameters.
      navigator.geolocation.getCurrentPosition(
        // The first is a callback function that takes the position as a parameter.
        pos => {
          this.lat = pos.coords.latitude;
          this.lng = pos.coords.longitude;

          // Find the user record and then update geolocation
          db.collection("users")
            .where("user_id", "==", user.uid)
            .get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                db.collection("users")
                  .doc(doc.id)
                  .update({
                    geolocation: {
                      lat: pos.coords.latitude,
                      lng: pos.coords.longitude
                    }
                  });
              });
            })
            .then(() => {
              this.renderMap();
            });
        },
        // The second is a function to handle any errors.
        err => {
          console.log(err);
          this.renderMap();
        },
        // The third is an object that we can use to set some options.
        // maximumAge looks for a cached geolocation of the user from the last hour.
        // timeout says that if we can't find the cached geolocation within 3 seconds
        //   then just fail the operation and render the map.
        { maximumAge: 60000, timeout: 3000 }
      );
    } else {
      // Position is center by default values
      this.renderMap();
    }
  }
};
</script>

<style>
.google-map {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #ffffff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style> -->

<!-- <template>
  <div class="map">
    <div class="google-map" id="map"></div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "GMap",
  data() {
    return {
      lat: 53,
      lng: -2
    };
  },
  methods: {
    renderMap() {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: this.lat, lng: this.lng },
        zoom: 6,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: false
      });
    }
  },
  mounted() {
    this.renderMap();
    console.log("Current user: ", firebase.auth().currentUser);
  }
};
</script>

<style>
.google-map {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style> -->