<template>
  <v-app>
    <NavBar></NavBar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  components: {
    NavBar
  }
}
</script>
<style>
html { overflow-y: auto !important }
</style>