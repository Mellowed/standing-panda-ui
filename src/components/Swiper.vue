<template>
  <div class="cardFlow">
    <div class="position-indicator" />
    <!-- Indicator -->
    <swiper
      style="position: relative; top: calc(50% - 12px)"
      @slideChange="runOnChange"
      :options="swiperOption"
      ref="mySwiper"
    >
      <!-- Swiper -->
      <swiper-slide v-for="(slide, index) in 150" :key="index">
        <!--Measurement Notches -->
        <v-container class="pa-0" style="height: 50px !important">
          <v-row style="" class="" no-gutters>
            <!-- Arrow -->
            <v-col cols="2">
              <v-tooltip left color="primary">
                <template v-slot:activator="{ on, attrs }">
                  <div
                    v-bind="attrs"
                    v-on="on"
                    v-if="currentHeight == 150 - index"
                    class="arrow-right"
                  ></div>
                </template>
                <span>Current position</span>
              </v-tooltip>
            </v-col>
            <v-col cols="4">
              <!-- cm indicator -->
              <div
                style="height: 1px; margin-top: 11px; background-color: black"
              />
              <!-- mm indicators -->
              <template v-for="(slide, index) in 4">
                <div
                  :key="index"
                  style="
                    height: 1px;
                    background-color: grey;
                    margin-top: 5px;
                    margin-right: 5px;
                  "
                />
              </template>
            </v-col>
            <v-col cols="6">
              <!-- Number indicator -->
              <div
                class="pl-2"
                :style="
                  'color: ' +
                  (outOfBounds(150 - index) ? 'transparent' : 'black')
                "
              >
                {{ 150 - index }}
              </div>
            </v-col>
          </v-row>
        </v-container>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { SwiperOptions, Swiper as SwiperType } from "swiper/types";
import "swiper/swiper-bundle.min.css";

export default Vue.extend({
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    value: { type: Number, default: 70 },
    currentHeight: { type: Number, default: 70 },
    min: { type: Number, default: 70 },
    max: { type: Number, default: 120 },
    height: { type: Number, default: 225 },
  },
  computed: {
    swiper(): SwiperType {
      return (this.$refs.mySwiper as any).$swiper;
    },
    indicatorPosition(): string {
      return "; top: " + this.height / 2 + ";";
    },
  },
  watch: {
    value: {
      handler(val) {
        this.setSliderPosition(150 - val);
      },
    },
  },
  mounted() {
    setTimeout(() => {
      this.setSliderPosition(150 - this.value);
    }, 1000);
  },
  methods: {
    outOfBounds(index: number): boolean {
      return index < this.min || index > this.max;
    },
    setSliderPosition(index: number) {
      this.swiper.slideTo(index, 1000, false);
    },
    runOnChange(val: any) {
      this.activeSlideIndex = +val.slides[val.activeIndex].outerText;
      if (this.activeSlideIndex > this.max) {
        this.activeSlideIndex = 150 - this.max;
        this.setSliderPosition(150 - this.max);
      }
      if (this.activeSlideIndex < this.min) {
        this.activeSlideIndex = 150 - this.min;
        this.setSliderPosition(150 - this.min);
      }
      this.$emit("input", this.activeSlideIndex);
    },
  },
  data() {
    return {
      activeSlideIndex: 0,
      swiperOption: {
        spaceBetween: 0,
        direction: "vertical",
        height: 30,
        centeredSlides: false,
      } as SwiperOptions,
    };
  },
});
</script>

<style>
.cardFlow {
  height: 100%;
  overflow: hidden;
  cursor: pointer;
}

.position-indicator {
  position: relative;
  width: 20px;
  height: 3px;
  background-color: #00ffcbc4;
  top: calc(50% + 1px);
  left: 10px;
}

.header-indicator {
  position: absolute;
  width: 100px;
}

.arrow-right {
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  border-left: 7px solid grey;

  margin-top: 4px;
}
</style>
