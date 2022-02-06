<template>
  <v-card class="mx-auto" style="min-width: 400px; max-width: 400px">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5"> Desk Height </v-list-item-title>
        <v-list-item-subtitle
          >A happy panda is a climbing panda</v-list-item-subtitle
        >
      </v-list-item-content>
    </v-list-item>
    <v-container>
      <v-row no-gutters align="center" justify="center">
        <v-img
          :src="require('../assets/cps.svg')"
          max-width="250px"
          max-height="250px"
          style="margin-right: 30px"
        />
        <Swiper
          v-model="selectedHeight"
          style="height: 250px; width: 70px"
          :height="250"
          :currentHeight="currentHeight"
        />
      </v-row>
      <!-- Indicators -->
      <v-row style="height: 45px" no-gutters class="mb-3">
        <v-col cols="5">
          <v-list-item>
            <v-list-item-icon style="margin-right: 0px">
              <v-icon large>mdi-human-male-height</v-icon>
            </v-list-item-icon>

            <v-list-item-content class="pa-0">
              <v-text-field
                style="max-width: 195px; height: 45px"
                class="pa-0"
                type="number"
                flat
                @change="updateSelectedHeight"
                :value="selectedHeight"
                single-line
                solo
              ></v-text-field>
              <div style="position: absolute; right: 43px; top: 26px">cm</div>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-list-item>
            <!-- Go To Height -->
            <v-list-item-icon class="mr-0">
              <v-tooltip bottom color="primary">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    @click="goToHeight(selectedHeight)"
                    icon
                  >
                    <v-icon>mdi-cog-play-outline</v-icon>
                  </v-btn>
                </template>
                <span>Go to selected height</span>
              </v-tooltip>
            </v-list-item-icon>

            <!-- Save height as preset -->
            <v-list-item-icon class="mr-0">
              <v-tooltip bottom color="primary">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    @click="savePresetHeight"
                    icon
                  >
                    <v-icon>mdi-content-save-settings-outline</v-icon>
                  </v-btn>
                </template>
                <span>Save selected height</span>
              </v-tooltip>
            </v-list-item-icon>

            <!-- climb by 1 cm -->
            <v-list-item-icon class="mr-0">
              <v-tooltip bottom color="primary">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    @click="climbForSeconds(1000)"
                    icon
                  >
                    <v-icon>mdi-tray-arrow-up</v-icon>
                  </v-btn>
                </template>
                <span>Climb 1cm</span>
              </v-tooltip>
            </v-list-item-icon>

            <!-- descend by 1 cm -->
            <v-list-item-icon class="mr-0">
              <v-tooltip bottom color="primary">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    @click="descendForSeconds(1000)"
                    icon
                  >
                    <v-icon>mdi-tray-arrow-down</v-icon>
                  </v-btn>
                </template>
                <span>Descend 1cm</span>
              </v-tooltip>
            </v-list-item-icon>

            <!-- Calibrate and level the desk -->
            <v-list-item-icon class="ml-0">
              <v-tooltip bottom color="primary">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    @click="calibrateDesk(selectedHeight)"
                    icon
                  >
                    <v-icon>mdi-waves-arrow-up</v-icon>
                  </v-btn>
                </template>
                <span>Level and calibrate</span>
              </v-tooltip>
            </v-list-item-icon>
          </v-list-item>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <!-- Levels -->
      <v-row no-gutters align="center" justify="center">
        <!-- Height -->
        <v-col>
          <v-list dense class="transparent">
            <!-- Preset -->
            <v-tooltip bottom color="info">
              <template v-slot:activator="{ on, attrs }">
                <v-list-item v-bind="attrs" v-on="on">
                  <v-list-item-title>{{ currentHeight }} cm</v-list-item-title>
                  <v-list-item-icon>
                    <v-icon>mdi-format-horizontal-align-left</v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </template>
              <span>height</span>
            </v-tooltip>
          </v-list>
        </v-col>
        <v-spacer></v-spacer>
        <!-- Right -->
        <v-col>
          <v-list dense class="transparent">
            <!-- Preset -->
            <v-tooltip bottom color="info">
              <template v-slot:activator="{ on, attrs }">
                <v-list-item v-bind="attrs" v-on="on">
                  <v-list-item-icon>
                    <v-icon>mdi-angle-right</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title class="text-right">
                    {{ offsetRoll }} Deg
                  </v-list-item-title>
                </v-list-item>
              </template>
              <div>
                <pre>
Roll: {{ roll }} , Offset: {{ rollOffset }} , Limit: {{ rollLimit }}</pre
                >
                <pre>
Pitch: {{ pitch }} , Offset: {{ pitchOffset }} , Limit: {{ pitchLimit }}</pre
                >
              </div>
            </v-tooltip>
          </v-list>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <!-- Shortcuts -->
      <v-list class="transparent">
        <!-- Presets-->
        <v-list-item>
          <v-list-item-title>Presets</v-list-item-title>

          <!-- Position 1 -->
          <v-list-item-icon class="mr-5">
            <v-tooltip bottom color="primary">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  @click="goToPresetHeight1()"
                  icon
                >
                  <v-icon>mdi-numeric-1-circle-outline</v-icon>
                </v-btn>
              </template>
              <span>Go to {{ presetHeight1 }}cm</span>
            </v-tooltip>
          </v-list-item-icon>

          <!-- Position 2 -->
          <v-list-item-icon class="mr-5">
            <v-tooltip bottom color="primary">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  @click="goToPresetHeight2()"
                  icon
                >
                  <v-icon>mdi-numeric-2-circle-outline</v-icon>
                </v-btn>
              </template>
              <span>Go to {{ presetHeight2 }}cm</span>
            </v-tooltip>
          </v-list-item-icon>

          <!-- Position 3 -->
          <v-list-item-icon class="mr-5">
            <v-tooltip bottom color="primary">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  @click="goToPresetHeight3()"
                  icon
                >
                  <v-icon>mdi-numeric-3-circle-outline</v-icon>
                </v-btn>
              </template>
              <span>Go to {{ presetHeight3 }}cm</span>
            </v-tooltip>
          </v-list-item-icon>

          <!-- Position 4 -->
          <v-list-item-icon class="ml-0">
            <v-tooltip bottom color="primary">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  @click="goToPresetHeight4()"
                  icon
                >
                  <v-icon>mdi-numeric-4-circle-outline</v-icon>
                </v-btn>
              </template>
              <span>Go to {{ presetHeight4 }}cm</span>
            </v-tooltip>
          </v-list-item-icon>
        </v-list-item>

        <!-- Stand -->
        <v-tooltip bottom color="primary">
          <template v-slot:activator="{ on, attrs }">
            <v-list-item v-bind="attrs" v-on="on" @click="goToStandingPosition">
              <v-list-item-title>Stand</v-list-item-title>
              <v-list-item-subtitle>112cm</v-list-item-subtitle>
              <v-list-item-icon>
                <v-icon>mdi-arrow-top-right-bold-outline</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </template>
          <span>Go to standing position</span>
        </v-tooltip>

        <!-- Sit -->
        <v-tooltip bottom color="primary">
          <template v-slot:activator="{ on, attrs }">
            <v-list-item v-bind="attrs" v-on="on" @click="goToSeatedPosition">
              <v-list-item-title>Sit</v-list-item-title>
              <v-list-item-subtitle>70cm</v-list-item-subtitle>
              <v-list-item-icon>
                <v-icon>mdi-arrow-bottom-right-bold-outline</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </template>
          <span>Go to seated position</span>
        </v-tooltip>

        <!-- Sit -->
        <v-tooltip bottom color="primary">
          <template v-slot:activator="{ on, attrs }">
            <v-list-item v-bind="attrs" v-on="on" @click="stopDesk">
              <v-list-item-title>Stop</v-list-item-title>

              <v-list-item-icon>
                <v-icon color="primary">mdi-alert-octagon-outline</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </template>
          <span>Stop current activity</span>
        </v-tooltip>
      </v-list>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Swiper from "@/components/Swiper.vue";
import StoreApi from "@/services/storeApi";
import DeskService from "@/services/deskService";
import { MessageCommand } from "@/model/wsDataCommand";

export default Vue.extend({
  name: "Desk",
  components: {
    Swiper,
  },
  data: () => ({
    selectedHeight: 70,
  }),
  computed: {
    offsetRoll(): number {
      return +(Math.abs(this.roll) - this.rollOffset).toFixed(2);
    },
    currentHeight(): number {
      return +StoreApi.getState().sensors.height / 10;
    },
    roll(): number {
      return +StoreApi.getState().sensors.roll.toFixed(2);
    },
    rollOffset(): number {
      return +StoreApi.getState().mcuConfig.rollOffset;
    },
    rollLimit(): number {
      return +StoreApi.getState().mcuConfig.rollLimit;
    },
    pitchOffset(): number {
      return +StoreApi.getState().mcuConfig.pitchOffset;
    },
    pitchLimit(): number {
      return +StoreApi.getState().mcuConfig.pitchLimit;
    },
    pitch(): number {
      return +StoreApi.getState().sensors.pitch.toFixed(2);
    },
    presetHeight1(): number {
      return StoreApi.getState().mcuConfig.preset1;
    },
    presetHeight2(): number {
      return StoreApi.getState().mcuConfig.preset2;
    },
    presetHeight3(): number {
      return StoreApi.getState().mcuConfig.preset3;
    },
    presetHeight4(): number {
      return StoreApi.getState().mcuConfig.preset4;
    },
    ticksLabels(): string[] {
      let labels = [] as string[];

      for (let x = 70; x < 140; x++) {
        labels.push(x + "cm");
      }

      return labels;
    },
  },
  methods: {
    updateSelectedHeight(val: number) {
      this.selectedHeight = +val;
    },
    goToHeight(height: number) {
      DeskService.getInstance().goToHeight(height);
    },
    descendForSeconds(milliseconds: number) {
      DeskService.getInstance().descendForSeconds(milliseconds);
    },
    climbForSeconds(milliseconds: number) {
      DeskService.getInstance().climbForSeconds(milliseconds);
    },
    goToStandingPosition() {
      DeskService.getInstance().goToStandingPosition();
    },
    goToSeatedPosition() {
      DeskService.getInstance().goToSeatedPosition();
    },
    stopDesk() {
      DeskService.getInstance().stop();
    },
    goToPresetHeight1() {
      DeskService.getInstance().goToPresetHeight(MessageCommand.PRESET_HEIGHT1);
    },
    goToPresetHeight2() {
      DeskService.getInstance().goToPresetHeight(MessageCommand.PRESET_HEIGHT2);
    },
    goToPresetHeight3() {
      DeskService.getInstance().goToPresetHeight(MessageCommand.PRESET_HEIGHT3);
    },
    goToPresetHeight4() {
      DeskService.getInstance().goToPresetHeight(MessageCommand.PRESET_HEIGHT4);
    },
    savePresetHeight() {
      DeskService.getInstance().saveConfigurationItem(
        this.selectedHeight,
        MessageCommand.PRESET_HEIGHT1
      );
    },
    calibrateDesk(height: number) {
      DeskService.getInstance().calibrate(height);
    },
  },
});
</script>
<style>
.ruler-slider .v-slider__tick {
  width: 25px !important;
}

.ruler-slider .v-slider__tick-label {
  left: 29px !important;
}

.ruler-slider .v-slider__thumb {
  color: #2ed32c00 !important;
  height: 4px !important;
  width: 25px !important;
  top: 3px !important;
  border-radius: 15px !important;
  background-color: #f9920b !important;
}
</style>
