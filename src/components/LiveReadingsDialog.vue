<template>
  <v-dialog
    v-model="dialogState"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <!-- Toolbar -->
      <v-toolbar dark>
        <v-btn icon dark @click="dialogState = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Live Readings</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="dialogState = false"> Close </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <!-- Live Readings -->
      <v-list two-line subheader>
        <v-card-title>Live Readings</v-card-title>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Accelerometer</v-list-item-title>
            <v-list-item-subtitle>
              X {{ accelerationX }} | Y {{ accelerationY }} | Z
              {{ accelerationZ }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Gyroscope</v-list-item-title>
            <v-list-item-subtitle>
              X {{ gyroX }} | Y {{ gyroY }} | Z
              {{ gyroZ }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Roll (degrees)</v-list-item-title>
            <v-list-item-subtitle> {{ roll }}° </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <!-- Pitch -->
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Pitch (degrees)</v-list-item-title>
            <v-list-item-subtitle> {{ pitch }}° </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <!-- Height -->
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Height (mm)</v-list-item-title>
            <v-list-item-subtitle> {{ currentHeight }}mm </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>temperature</v-list-item-title>
            <v-list-item-subtitle> {{ temperature }}°C </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import StoreApi from "@/services/storeApi";
import Vue from "vue";

export default Vue.extend({
  name: "LiveReadings",
  components: {},
  props: {
    value: { type: Boolean, default: false },
  },
  computed: {
    // Sensor Readings
    currentHeight(): number {
      return +StoreApi.getState().sensors.height;
    },
    accelerationX(): number {
      return +StoreApi.getState().sensors.acceleration.x;
    },
    accelerationY(): number {
      return +StoreApi.getState().sensors.acceleration.y;
    },
    accelerationZ(): number {
      return +StoreApi.getState().sensors.acceleration.z;
    },
    gyroX(): number {
      return +StoreApi.getState().sensors.gyro.x;
    },
    gyroY(): number {
      return +StoreApi.getState().sensors.gyro.y;
    },
    gyroZ(): number {
      return +StoreApi.getState().sensors.gyro.z;
    },
    temperature(): number {
      return +StoreApi.getState().sensors.temp;
    },
    roll(): number {
      return +StoreApi.getState().sensors.roll.toFixed(2);
    },
    pitch(): number {
      return +StoreApi.getState().sensors.pitch.toFixed(2);
    },
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
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
    };
  },
});
</script>
