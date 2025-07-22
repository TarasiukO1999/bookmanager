<template>
  <v-container>
    <v-card flat class="mx-auto" max-width="1200">
      <div v-if="book.id" class="text-h5 mb-12">
        Edit Your Book
      </div>
      <div v-else class="text-h5 mb-12">
        Add a New Book
      </div>
      <v-form v-model="form" @submit.prevent="submitForm">
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="book.title" label="Title" :readonly="loading" :rules="[rules.required]"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="book.desc" label="Description" :readonly="loading"
              :rules="[rules.required]"></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-file-input label="Image" accept="image/*" @change="onFileChange"></v-file-input>
            <v-img :src="book.image" :max-width="200" :max-height="200" v-if="book.image"></v-img>
          </v-col>
        </v-row>
        <div class="w-full d-flex">
          <v-btn type="submit" class="ms-auto" color="primary" :disabled="!form">
            Save
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data: () => ({
    form: false,
    loading: false,
    file: null, // Added to handle file input separately
    book: { // Initialize book with default properties
      title: '',
      desc: '',
      image: '',
      slug: '',
    },
    rules: {
      required: value => !!value || 'This field is required.'
    }
  }),
  computed: mapState({
    // Update the book from the store if it exists
    ...mapState('books', {
      storeBook: state => state.item
    })
  }),
  watch: {
    // Watch for changes in the storeBook and update the local book data accordingly
    storeBook: {
      handler(newBook) {
        if (newBook && this.$route.params.slug) {
          this.book = { ...newBook };
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('books', ['deleteBook', 'editBook', 'createBook']),
    onFileChange(event) {
      this.file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        this.book.image = e.target.result
      }
      reader.readAsDataURL(this.file)
    },
    submitForm() {
      let formData = new FormData();
      if (this.file) {
        formData.append('image', this.file)
      }
      formData.append('title', this.book.title)
      formData.append('desc', this.book.desc)
      if (this.book.id) {
        this.editBook({ slug: this.book.slug, data: formData });
      } else {
        this.createBook(formData);
      }
    }
  },
  mounted() {
    const slug = this.$route.params.slug;
    if (slug) {
      this.$store.dispatch('books/getBook', slug);
    }
  }
}
</script>
