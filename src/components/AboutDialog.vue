<template>
  <v-dialog v-model="dialogState" width="500">
    <v-card>
      <v-card-title dark style="background: black; color: white" class="">
        About
      </v-card-title>

      <v-card-text class="mt-5">
        A tools to help promotes well being at the office. This forms part of
        the Habitat Panda Ecosystem.
      </v-card-text>
      <v-card-text class="mt-5"> Software Version: 0.0.1 </v-card-text>
      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false"> OK </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "About",
  components: {},
  props: {
    value: { type: Boolean, default: false },
  },
  computed: {
    dialogState: {
      get(): boolean {
        return this.value;
      },
      set(val: boolean): void {
        this.$emit("input", val);
      },
    },
  },

  data() {
    return {};
  },
});
</script>
