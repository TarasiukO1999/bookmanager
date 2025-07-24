<template>
  <v-container>
    <v-card flat class="mx-auto" max-width="1200">
      <div v-if="book">
        <v-row>
          <v-col class="book-image" sm="6">
            <v-img :src="`${book.image}`" height="auto" width="auto" cover></v-img>
          </v-col>
          <v-col sm="6">
            <div class="text-h4">
              {{ book.title }}
            </div>
            <div class="text-p mt-2">
              {{ book.desc }}
            </div>
          </v-col>
        </v-row>
        <div class="mt-2 mx-8 text-end">
          <v-btn class="mx-2" @click="editItem(book.slug)" color="indigo">Edit</v-btn>
          <v-btn class="mx-2" @click="deleteItemDialog(book)" color="red">Delete</v-btn>
        </div>
      </div>
      <div v-else>
        <div class="text-h4 mt-12 text-center">
          No Book Available
        </div>
      </div>
    </v-card>
    <ConfirmDialog @delete="deleteItem" ref="deleteDialog" :description="deleteDescription" action="delete">
    </ConfirmDialog>
  </v-container>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import ConfirmDialog from '@/components/Dialogs/ConfirmDialog'

export default {
  components: {
    ConfirmDialog
  },
  data() {
    return {
      deleteDescription: '',
    }
  },
  computed: mapState({
    book: state => state.books.item
  }),
  methods: {
    ...mapActions('books', ['deleteBook', 'editBook']),
    deleteItem(book) {
      this.deleteBook(book.slug).then(
        () => {
          this.$router.push('/books')
        }
      )
    },
    deleteItemDialog(item) {
      // Set the description and call the openDialog method in the DeleteConfirmationDialog component
      this.deleteDescription = "Do you really want to delete this book?";
      this.$refs.deleteDialog.openDialog(item);
    },
    editItem(slug) {
      this.$router.push(`/books/${slug}/edit`)
    }
  },
  mounted() {
    const slug = this.$route.params.slug;
    this.$store.dispatch('books/getBook', slug);
  }
}
</script>
<style>
@media (max-width: 600px) {
  .book-image {
    max-width: 100%;
  }

  .text-h4 {
    font-size: 24px;
  }

  .text-p {
    font-size: 16px;
  }
}

@media (min-width: 601px) {
  .book-image {
    max-width: 400px;
  }

  .text-h4 {
    font-size: 36px;
  }

  .text-p {
    font-size: 20px;
  }
}
</style>