<template>
  <v-container>
    <v-card flat class="mx-auto" max-width="1200">
      <v-card-title class="d-flex align-center pe-2">
        <v-icon icon="mdi-file"></v-icon> &nbsp;
        <span class="d-none d-sm-block">Find a Book</span>

        <v-spacer></v-spacer>

        <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" density="compact" label="Search" single-line flat
          hide-details variant="solo-filled"></v-text-field>

        <router-link to="/books/new">
          <v-btn class="mx-2" rounded="lg" color="green">
            <v-icon class="mr-1" size="18">mdi-plus</v-icon>
            <span class="d-none d-sm-block">New Book</span>
          </v-btn>
        </router-link>

      </v-card-title>

      <v-divider></v-divider>
      <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items-length="total" :items="books"
        :loading="loading" :search="search" item-value="name" @update:options="onPageChange">
        <template v-slot:[`header.actions`]>
          <div class="text-end">Actions</div>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <div class="text-end min-200">
            <IconBtn color="green" tooltip="View Book" icon="mdi-eye" :action="() => viewItem(item)"></IconBtn>
            <IconBtn color="indigo" tooltip="Edit Book" icon="mdi-pencil" :action="() => editItem(item)"></IconBtn>
            <IconBtn color="red" tooltip="Delete Book" icon="mdi-delete" :action="() => deleteItemDialog(item)"></IconBtn>
          </div>
        </template>

        <template v-slot:[`item.image`]="{ item }">
          <div class="fixed-image-container">
            <img :src="`${item.image}`" alt="Item Image" class="fixed-image" />
          </div>
        </template>
      </v-data-table-server>
    </v-card>
    <ConfirmDialog @delete="deleteItem" ref="deleteDialog" :description="deleteDescription" action="delete">
    </ConfirmDialog>
  </v-container>
</template>
<script>
import router from '@/router'
import { mapState, mapActions } from 'vuex'
import IconBtn from '@/components/Buttons/IconBtn'
import ConfirmDialog from '@/components/Dialogs/ConfirmDialog'


export default {
  components: {
    IconBtn,
    ConfirmDialog
  },
  data() {
    return {
      search: '',
      headers: [
        {
          title: 'Title',
          align: 'start',
          sortable: false,
          key: 'title',
        },
        { title: 'Image', sortable: false, key: 'image' },
        { title: 'Description', sortable: false, key: 'desc' },
        { title: 'Action', value: "actions", sortable: false },
      ],
      itemsPerPage: 10,
      loading: true,
      deleteDescription: '',
    }
  },
  computed: mapState({
    books: state => state.books.data.items,
    total: state => state.books.data.total
  }),
  methods: {
    ...mapActions('books', ['addBook', 'deleteBook', 'updateBook', 'getBooks']),
    viewItem(item) {
      router.push(`/books/${item.slug}`)
    },
    editItem(item) {
      router.push(`/books/${item.slug}/edit`)
    },
    deleteItemDialog(item) {
      // Set the description and call the openDialog method in the DeleteConfirmationDialog component
      this.deleteDescription = "Do you really want to delete this book?";
      this.$refs.deleteDialog.openDialog(item);
    },
    deleteItem(item) {
      this.deleteBook(item.slug)
    },
    onPageChange({ search, page, itemsPerPage }) {
      this.getBooks({ search: search, page: page, page_size: itemsPerPage }).then(() => {
        this.loading = false
      });
    },
  }
}
</script>
<style>
.v-slot--item-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.min-100 {
  min-width: 100px;
}

.min-200 {
  min-width: 200px;
}

.fixed-image-container {
  padding: 4px;
  width: 124px;
  height: 124px;
  overflow: hidden;
}

.fixed-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>