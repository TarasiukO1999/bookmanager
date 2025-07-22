<template>
  <v-container>
    <div class="w-full d-flex py-2">
      <div class="text-h3 mx-auto pb-4">Sign In</div>
    </div>
    <v-card class="mx-auto px-6 py-8" max-width="400">
      <div v-if="message?.detail" class="py-2">
        <v-alert type="error"> {{ message?.detail }}</v-alert>
      </div>
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field v-model="name" :readonly="loading" :rules="[required]" class="mb-2" label="Username or Email"></v-text-field>

        <v-text-field v-model="password" :readonly="loading" :rules="[required]" type="password" label="Password"
          placeholder="Enter your password"></v-text-field>
        <br>
        <v-btn :disabled="!form" :loading="loading" block color="success" size="large" type="submit" variant="elevated">
          Sign In
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>
  
<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    form: false,
    name: null,
    password: null,
    loading: false,
    message: null
  }),

  methods: {
    ...mapActions('user', ['login']),
    onSubmit() {
      if (!this.form) return
      this.loading = true
      this.message = null
      this.login({ username: this.name, password: this.password }).catch(
        error => {
          this.message = (error.response && error.response.data) || error.message || error.toString()
          this.loading = false
        }
      )
    },
    required(v) {
      return !!v || 'Field is required'
    },
  },
}
</script>