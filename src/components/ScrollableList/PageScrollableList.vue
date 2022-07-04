<!-- This is the main script of the Scrollable list. The scrollable list can
display multiple "ScrollableListEntry"s -->
<!-- Author: Kröger, Schuster-->
<template>
  <div align="center">
    <h1 class="roundedContainer">Select product group</h1>
  </div>

  <div style="display: flex">
    <div>
      <button class="bigButtonText" @click="scrollUp">Up</button>
      <p style="margin-top: 300px; padding-left: 300px"></p>
      <button class="bigButtonText" @click="scrollDown">Down</button>
    </div>

    <div
      id="scroller"
      style="
        width: 300px;
        height: 500px;
        overflow-y: auto;
        border: 1px solid black;
      "
    >
      <div v-for="item in names" :key="item" style="padding-top: 20px">
        <display :productGroupName="item"></display>
      </div>
    </div>
    <div>
      <p style="margin-top: 150px"></p>
      <img
        src="../../assets/pictures/BarcodeScanner.png"
        alt="SELECT A GROUP"
        style="width: 300px"
      />
      <p style="margin-top: 50px"></p>
      <button class="bigButtonText">Continue</button>
    </div>
  </div>
</template>

<script>
import display from "./ScrollableListEntry.vue";

export default {
  components: {
    display,
  },
  data() {
    return {
      names: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    };
  },

  mounted() {
    console.log("mounted");
    this.initScroll();
  },

  methods: {
    scrollUp() {
      scroller.scrollTop -= 100;
    },
    scrollDown() {
      scroller.scrollTop += 100;
    },
    initScroll() {
      const scroller = document.querySelector("#scroller");
      let position = 0;

      if (scroller) {
        scroller.addEventListener("scroll", () => {
          position = scroller.scrollTop;
        });
      } else {
        console.log("Nope");
      }
    },
  },
};
</script>

<style src="../../assets/styles/styles.css">
</style>