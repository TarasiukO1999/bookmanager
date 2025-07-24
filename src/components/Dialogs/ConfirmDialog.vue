<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card>
      <v-card-title class="headline">Confirm Delete</v-card-title>
      <v-card-text>
        {{ description }}
      </v-card-text>
      <v-card-actions>
        <v-btn color="red darken-1" text @click="closeDialog">No</v-btn>
        <v-btn color="green darken-1" text @click="confirm">Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    description: String,
    action: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      item: null,
    };
  },
  methods: {
    openDialog(item) {
      this.item = item;
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    confirm() {
      // Check if the action prop is defined before emitting the event
      if (this.action) {
        this.$emit(this.action, this.item);
      }
      this.dialog = false;
    },
  },
};
</script>
