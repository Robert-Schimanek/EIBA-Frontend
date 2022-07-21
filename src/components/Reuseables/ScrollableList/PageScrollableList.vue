<template>
  <div style="display: flex">
    <div style="width: 15%">
      <p style="margin-top: 10px"></p>
      <v-btn @click="scrollUp">
        <img
          style="height: 35px; width: 35px"
          src="../../../assets/pictures/Icons/bleach.png"
        />
      </v-btn>
      <p style="margin-top: 25px"></p>
      <v-btn @click="scrollDown">
        <img
          style="height: 35px; width: 35px; transform: rotate(180deg)"
          src="../../../assets/pictures/Icons/bleach.png"
        />
      </v-btn>
    </div>

    <div
      id="scroller"
      style="
        width: 70%;
        height: 491px;
        overflow-y: auto;
        border: 1px solid black;
      "
    >
      <div v-for="item in names" :key="item" style="padding-top: 30px">
        <display :displayedNames="item" @btnPressed="btnClicked"></display>
      </div>
    </div>
    <div style="width: 15%">
      <p style="margin-top: 10px"></p>
      <button
        style="
          border-radius: 4px;
          background-color: #7cb8fc;
          padding: 10px 20px;
          font-size: 15px;
          border: 4px solid black;
          transition-duration: 0.5s;
          font-weight: 100;
        "
        id="ConfirmBtn"
        disabled="true"
        @click="confirmed"
      >
        Confirm
      </button>
      {{ currentActivatedBtn }}
    </div>
  </div>
</template>

<script>
import { listenerCount } from "process";
import display from "./ScrollableListEntry.vue";

export default {
  components: {
    display,
  },
  props: {
    valuefromInput: { default: "XXX" },
  },
  data() {
    return {
      names: [
        900914562, 900913556, 900912556, 900934589, 900911406, 900987003,
        900922309, 900934122, 900945367, 900976032, 900923112, 900934522,
        900990002,
      ],
      currentActivatedBtn: null,
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
    btnClicked(newButtonId) {
      if (this.currentActivatedBtn != null) {
        if (this.currentActivatedBtn === newButtonId) {
          document
            .getElementById(this.currentActivatedBtn)
            .classList.remove("active");
          this.currentActivatedBtn = null;
          document.getElementById("ConfirmBtn").disabled = true;
        } else {
          document
            .getElementById(this.currentActivatedBtn)
            .classList.remove("active");
          this.currentActivatedBtn = newButtonId;
          document.getElementById("ConfirmBtn").disabled = false;
        }
      } else {
        this.currentActivatedBtn = newButtonId;
        document.getElementById("ConfirmBtn").disabled = false;
      }
    },
    confirmed() {
      if (this.currentActivatedBtn == null) {
        alert(`Confirm with ${this.valuefromInput} selected`);
        this.$root.returnpartInfo.oenNumber = this.valuefromInput;
      } else {
        alert(`Confirm with ${this.currentActivatedBtn} selected`);
        this.$root.returnpartInfo.oenNumber = this.currentActivatedBtn;
      }
    },
  },
};
</script>

<style src="../../../assets/styles/styles.css">
</style>

<style scoped>
.active {
  background-color: green;
  transition-duration: 0.2s;
  opacity: 0.6;
  height: 65px;
  font-size: 40px;
}
</style>