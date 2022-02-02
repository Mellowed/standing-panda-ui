<template>
  <v-app>
    <v-main>
      <v-app-bar app color="black" dark>
        <v-btn
          href="https://github.com/Mellowed?tab=repositories"
          target="_blank"
          text
        >
          <v-toolbar-title>Standing Panda</v-toolbar-title>
        </v-btn>

        <v-spacer></v-spacer>

        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list style="min-width: 250px" dense>
            <v-list-item
              @click="liveReadingsDialogState = !liveReadingsDialogState"
            >
              <v-list-item-title>Live Readings</v-list-item-title>
              <v-list-item-icon>
                <v-icon small color="primary"> mdi-tape-measure </v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item @click="configDialogState = !configDialogState">
              <v-list-item-title>Configuration</v-list-item-title>
              <v-list-item-icon>
                <v-icon small color="primary"> mdi-cog </v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item @click="aboutDialogState = !aboutDialogState">
              <v-list-item-title>About</v-list-item-title>
              <v-list-item-icon
                ><v-icon small color="primary">
                  mdi-information-outline
                </v-icon></v-list-item-icon
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>

      <Home />
      <AboutDialog v-model="aboutDialogState" />
      <ConfigurationDialog v-model="configDialogState" />
      <LiveReadingsDialog v-model="liveReadingsDialogState" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Home from "./components/Home.vue";
import AboutDialog from "./components/AboutDialog.vue";
import ConfigurationDialog from "./components/ConfigurationDialog.vue";
import LiveReadingsDialog from "./components/LiveReadingsDialog.vue";
import WebsocketService from "@/services/websocketService";
import StoreApi from "@/services/storeApi";
import LogService from "@/services/logService";
import { WsDataSensorStruct, WsDataConfigStruct } from "@/model/wsDataStruct";
export default Vue.extend({
  name: "App",

  components: {
    Home,
    ConfigurationDialog,
    LiveReadingsDialog,
    AboutDialog,
  },
  computed: {
    enableLogging(): boolean {
      return StoreApi.getState().uiConfig.loggingEnabled;
    },
  },
  mounted() {
    WebsocketService.getInstance().setOnMessage(
      (_event: { data: string; origin: string; timestamp: number }) => {
        LogService.debug(_event.data);
        if (_event.data.includes("ERROR") || _event.data.includes("INFO")) {
          alert(_event.data);
        } else {
          let dataset = JSON.parse(_event.data) as {
            sensors: WsDataSensorStruct;
            config: WsDataConfigStruct;
          };
          StoreApi.setItem("sensors", dataset.sensors);
          StoreApi.setItem("mcuConfig", dataset.config);
        }
      }
    );
  },
  methods: {},

  data: () => ({
    aboutDialogState: false,
    configDialogState: false,
    liveReadingsDialogState: false,
  }),
});
</script>
<style>
html {
  overflow-y: hidden !important;
}

.basic-toolbar .v-toolbar__content {
  padding: 0px !important;
}

/* Custom scrollbar */

/* width */
::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
