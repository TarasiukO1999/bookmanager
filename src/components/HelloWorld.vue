<template>
  <v-container>
    <div class="w-full d-flex">
      <img alt="Vue logo" class="mx-auto" src="../assets/logo.png">
    </div>
    <div v-if="username" class="text-h3 text-center py-4">Hi {{ username }}!</div>
    <div class="text-h3 text-center py-2">
      Welcome to the <br> Book Management App!
    </div>
  </v-container>
</template>
<script>
export default {
  props: {
    username: String,
    message: String,
  }
}
</script>