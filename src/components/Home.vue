<template>
  <v-container>
    <Desk />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Desk from "@/components/Desk.vue";

export default Vue.extend({
  name: "Home",
  components: {
    Desk,
  },
  data: () => ({}),
});
</script>
