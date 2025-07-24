<template>
  <HelloWorld msg="Welcome to Your Vue.js App" :username="username" />
</template>
  
<script>
import HelloWorld from '../components/HelloWorld.vue'
import { mapState } from 'vuex'
export default {
  name: 'HomePage',
  components: {
    HelloWorld
  },
  computed: mapState({
    username: state => state.user.user
  }),
}
</script>

  