<template>
  <v-container>
    <div class="w-full d-flex py-2">
       <div class="text-h3 mx-auto pb-4">Sign Up</div>
    </div>
    <v-card class="mx-auto px-6 py-8" max-width="400">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field v-model="username" :readonly="loading" :rules="[required]" class="mb-2" 
          label="Username" :error-messages="errors?.username ?? []"></v-text-field>

        <v-text-field v-model="email" :readonly="loading" :rules="[required]" class="mb-2" 
          label="Email" :error-messages="errors?.email ?? []"></v-text-field>
        
        <v-text-field v-model="password" :readonly="loading" :rules="[required]" type="password" class="mb-2" 
          label="Password" :error-messages="errors?.password ?? []"></v-text-field>

        <v-text-field v-model="password2" :readonly="loading" :rules="[required]" type="password" label="Re Password"
          placeholder="Enter your password again!" :error-messages="errors?.password2 ?? []"></v-text-field>

        <br>
        <v-btn :disabled="!form" :loading="loading" block color="success" size="large" type="submit" variant="elevated">
          Sign Up
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>
  
<script>
import { mapActions, mapState } from 'vuex'

export default {
  data: () => ({
    form: false,
    username: null,
    email: null,
    password: null,
    passowrd2: null,
    loading: false,
  }),
  computed: mapState({
    errors: state => state.user?.errors || null
  }),
  methods: {
    ...mapActions('user', ['signup', 'login']),
    onSubmit() {
      if (!this.form) return

      this.loading = true
      this.signup({
        username: this.username,
        email: this.email,
        password: this.password,
        password2: this.password2,
      }).then(() => {
        this.login({username: this.username, password: this.password})
      }).catch(() => {
        this.loading = false
        this.form = true
      })
    },
    required(v) {
      return !!v || 'Field is required'
    },
  },
}
</script>