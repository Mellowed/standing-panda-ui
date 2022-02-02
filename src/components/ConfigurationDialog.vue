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
        <v-toolbar-title>Configurations</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="dialogState = false"> Close </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <!-- Preset Levels -->

      <v-card-title>Preset Levels</v-card-title>

      <v-container class="ml-2">
        <v-row>
          <v-col>
            <v-text-field
              v-model="local.preset1"
              dense
              hint="A value between 70cm - 120cm"
              outlined
              label="Preset Height 1 (cm)"
              type="number"
              :append-icon="
                local.preset1 == presetHeight1
                  ? 'mdi-check'
                  : 'mdi-content-save-edit-outline'
              "
              color="primary"
              @click:append="savePresetHeight1"
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="local.preset2"
              dense
              hint="A value between 70cm - 120cm"
              outlined
              label="Preset Height 2 (cm)"
              type="number"
              :append-icon="
                local.preset2 == presetHeight2
                  ? 'mdi-check'
                  : 'mdi-content-save-edit-outline'
              "
              color="primary"
              @click:append="savePresetHeight2"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="local.preset3"
              dense
              hint="A value between 70cm - 120cm"
              outlined
              label="Preset Height 3 (cm)"
              type="number"
              :append-icon="
                local.preset3 == presetHeight3
                  ? 'mdi-check'
                  : 'mdi-content-save-edit-outline'
              "
              color="primary"
              @click:append="savePresetHeight3"
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="local.preset4"
              dense
              hint="A value between 70cm - 120cm"
              outlined
              label="Preset Height 4 (cm)"
              type="number"
              :append-icon="
                local.preset4 == presetHeight4
                  ? 'mdi-check'
                  : 'mdi-content-save-edit-outline'
              "
              color="primary"
              @click:append="savePresetHeight4"
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>

      <v-divider></v-divider>
      <v-card-title>Limits and offsets</v-card-title>
      <v-container class="ml-2">
        <v-row>
          <v-col>
            <v-text-field
              v-model="local.rollOffset"
              dense
              hint="A value between 0 - 25 Degrees "
              outlined
              label="The Roll offset (Degrees)"
              type="number"
              :append-icon="
                local.rollOffset == rollOffset
                  ? 'mdi-check'
                  : 'mdi-content-save-edit-outline'
              "
              color="primary"
              @click:append="saveRollOffset"
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="local.rollLimit"
              dense
              hint="A value between 0 - 25 Degrees"
              outlined
              label="Max allowed roll (Degrees)"
              type="number"
              :append-icon="
                local.rollLimit == rollLimit
                  ? 'mdi-check'
                  : 'mdi-content-save-edit-outline'
              "
              color="primary"
              @click:append="saveRollLimit"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="local.pitchOffset"
              dense
              hint="A value between 0 - 25 Degrees"
              outlined
              label="Max pitch offset (Degrees)"
              type="number"
              :append-icon="
                local.pitchOffset == pitchOffset
                  ? 'mdi-check'
                  : 'mdi-content-save-edit-outline'
              "
              color="primary"
              @click:append="savePitchOffset"
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="local.pitchLimit"
              dense
              hint="A value between 0 - 25 Degrees"
              outlined
              label="Max allowed pitch (Degrees)"
              type="number"
              :append-icon="
                local.pitchLimit == pitchLimit
                  ? 'mdi-check'
                  : 'mdi-content-save-edit-outline'
              "
              color="primary"
              @click:append="savePitchLimit"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-checkbox
            color="primary"
            class="ml-2"
            v-model="local.safetyEnabled"
            @change="saveSafetyEnabled"
            label="Safeties Enabled"
          ></v-checkbox>
        </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-card-title>UI Configuration</v-card-title>
      <v-container class="ml-2">
        <v-row no-gutters>
          <v-col>
            <v-checkbox
              color="primary"
              class="ml-2 mt-0"
              v-model="loggingEnabled"
              label="Enable console logging"
            ></v-checkbox>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col>
            <v-btn class="ml-2" @click="logVuexStore">Print Data Store</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { MessageCommand } from "@/model/wsDataCommand";
import DeskService from "@/services/deskService";
import StoreApi from "@/services/storeApi";
import Vue from "vue";

export default Vue.extend({
  name: "Configuration",
  components: {},
  props: {
    value: { type: Boolean, default: false },
  },
  computed: {
    // Configuration
    loggingEnabled: {
      get(): boolean {
        return StoreApi.getState().uiConfig.loggingEnabled;
      },
      set(val: boolean) {
        StoreApi.setItem("uiConfig.loggingEnabled", val);
      },
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
    rollOffset(): number {
      return StoreApi.getState().mcuConfig.rollOffset;
    },
    rollLimit(): number {
      return StoreApi.getState().mcuConfig.rollLimit;
    },
    pitchOffset(): number {
      return StoreApi.getState().mcuConfig.pitchOffset;
    },
    pitchLimit(): number {
      return StoreApi.getState().mcuConfig.pitchLimit;
    },
    safetyEnabled(): number {
      return StoreApi.getState().mcuConfig.safetyEnabled;
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
  watch: {
    dialogState: {
      handler() {
        this.initializeLocalVariables();
      },
      immediate: true,
    },
  },
  methods: {
    logVuexStore() {
      console.log(JSON.stringify(StoreApi.getState(), null, 2));
    },
    initializeLocalVariables() {
      this.local.preset1 = this.presetHeight1;
      this.local.preset2 = this.presetHeight2;
      this.local.preset3 = this.presetHeight3;
      this.local.preset4 = this.presetHeight4;
      this.local.rollOffset = this.rollOffset;
      this.local.rollLimit = this.rollLimit;
      this.local.pitchOffset = this.pitchOffset;
      this.local.pitchLimit = this.pitchLimit;
      this.local.safetyEnabled = this.safetyEnabled;
    },
    savePresetHeight1() {
      DeskService.getInstance().saveConfigurationItem(
        this.local.preset1,
        MessageCommand.PRESET_HEIGHT1
      );
    },
    savePresetHeight2() {
      DeskService.getInstance().saveConfigurationItem(
        this.local.preset2,
        MessageCommand.PRESET_HEIGHT2
      );
    },
    savePresetHeight3() {
      DeskService.getInstance().saveConfigurationItem(
        this.local.preset3,
        MessageCommand.PRESET_HEIGHT3
      );
    },
    savePresetHeight4() {
      DeskService.getInstance().saveConfigurationItem(
        this.local.preset4,
        MessageCommand.PRESET_HEIGHT4
      );
    },
    saveRollOffset() {
      DeskService.getInstance().saveConfigurationItem(
        this.local.rollOffset,
        MessageCommand.ROLL_OFFSET
      );
    },
    saveRollLimit() {
      DeskService.getInstance().saveConfigurationItem(
        this.local.rollLimit,
        MessageCommand.ROLL_LIMIT
      );
    },
    savePitchLimit() {
      DeskService.getInstance().saveConfigurationItem(
        this.local.pitchLimit,
        MessageCommand.PITCH_LIMIT
      );
    },
    savePitchOffset() {
      DeskService.getInstance().saveConfigurationItem(
        this.local.pitchOffset,
        MessageCommand.PITCH_OFFSET
      );
    },
    saveSafetyEnabled() {
      DeskService.getInstance().saveConfigurationItem(
        this.local.safetyEnabled ? 1 : 0,
        MessageCommand.SAFETY_ENABLED
      );
    },
  },
  data() {
    return {
      local: {
        preset1: 0,
        preset2: 0,
        preset3: 0,
        preset4: 0,
        rollOffset: 0,
        rollLimit: 0,
        pitchOffset: 0,
        pitchLimit: 0,
        safetyEnabled: 1,
      },
    };
  },
});
</script>
