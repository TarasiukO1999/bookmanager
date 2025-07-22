<template>
  <v-app-bar absolute color="#43a047" dark shrink-on-scroll prominent scroll-target="#scrolling-techniques-5"
    scroll-threshold="500">
    <router-link to="/" class="mx-4" :style="{ textDecoration: 'none' }">
      <v-app-bar-title class="text-h5 text-white">
        Book Management App
      </v-app-bar-title>
    </router-link>

    <v-spacer></v-spacer>

    <router-link class="d-none d-sm-block" v-if="!isAuth" to="/signin">
      <v-btn class="text-white">
        Sign In
      </v-btn>
    </router-link>

    <router-link class="d-none d-sm-block" v-if="!isAuth" to="/signup">
      <v-btn class="text-white">
        Sign Up
      </v-btn>
    </router-link>

    <router-link class="d-none d-sm-block" v-if="isAuth" to="/books">
      <v-btn class="text-white">
        My Books
      </v-btn>
    </router-link>

    <v-btn class="d-none d-sm-block" v-if="isAuth" @click="handleLogout">
      Logout
    </v-btn>

    <v-app-bar-nav-icon class="d-flex d-sm-none" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

  </v-app-bar>
  <v-navigation-drawer v-model="drawer" location="right" temporary>
    <v-list>
      <v-list-item v-if="!isAuth" @click="navigateTo('/signin')">
          Sign In
      </v-list-item>

      <v-list-item v-if="!isAuth" @click="navigateTo('/signup')">
          Sign Up
      </v-list-item>

      <v-list-item v-if="isAuth" @click="navigateTo('/books')">
          My Books
      </v-list-item>

      <v-list-item class="p-2" v-if="isAuth" @click="handleLogout">
          Logout
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>


<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    ...mapState('user', ['isAuth']),
  },
  methods: {
    ...mapActions('user', ['logout']),
    handleLogout() {
      this.logout()
    },
    navigateTo(route) {
      this.$router.push(route);
      this.drawer = false; // Close the drawer after navigation
    },
  },
}
</script>