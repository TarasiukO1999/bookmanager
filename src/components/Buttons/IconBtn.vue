<template>
  <v-btn :color="color" size="small" class="ma-1" @click="action" icon ref="button">
    <v-tooltip :activator="$refs.button" location="top">
      {{ tooltip }}
    </v-tooltip>
    <v-icon>{{ icon }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: true,
    },
    tooltip: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    action: {
      type: Function,
      required: true,
    },
  },
};
</script>
