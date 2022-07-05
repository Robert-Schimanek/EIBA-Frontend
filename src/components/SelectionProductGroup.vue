<template>
  <div id="mainDiv" align="center" style="display: flex">
    <div id="UpDown" style="width: 250px; margin-top: 300px" align="center">
      <button
        style="margin-bottom: 50px"
        class="bigButtonText"
        @click="countDown"
      >
        UP
      </button>
      <p></p>
      <button class="bigButtonText" @click="countUp">Down</button>
    </div>
    <div id="ListProductGroups">
      <h1 class="roundedContainer">Select product group</h1>

      <div
        class="grid-container"
        style="width: 700px; height: 700px"
        align="center"
      >
        <div
          class="item"
          v-for="i in [0, 1, 2, 3].map((x) => x + index * 4)"
          :key="i"
        >
          <display
            :productGroupName="prodGroups[i]"
            @btnPressed="btnClicked"
          ></display>
        </div>
      </div>
    </div>
    <div id="ConfirmBtn" align="center" style="width: 120px">
      <button
        class="bigButtonText"
        id="confirmBtnPrdGroup"
        disabled="true"
        style="margin-top: 350px"
        @click="confirmed"
      >
        Confirm
      </button>
    </div>
  </div>
  <p style="font-size: 40pt">Page {{ index + 1 }} / {{ highestPage + 1 }}</p>
</template>

<script>
import display from "./SelectionProductGroup_Display.vue";

export default {
  components: {
    display,
  },
  data() {
    return {
      prodGroups: [
        "BrakeCaliper",
        "CommonRailInjector",
        "Starter",
        "Alternator",
        "CommonRailHighPressurePump",
        "UnitInjector",
        "TorqueConverter",
        "Mechantronics",
        "5",
      ],
      index: 0,
      lenProdGroups: 0,
      highestPage: 0,
      currentActivatedBtn: null,
      text: "",
    };
  },
  methods: {
    countUp() {
      if (this.index < this.highestPage) {
        this.index++;
        this.currentActivatedBtn = null;
        document.getElementById("confirmBtnPrdGroup").disabled = true;
      }
    },
    countDown() {
      if (this.index > 0) {
        this.index--;
        this.currentActivatedBtn = null;
        document.getElementById("confirmBtnPrdGroup").disabled = true;
      }
    },
    init() {
      this.lenProdGroups = this.prodGroups.length;
      if (this.lenProdGroups % 4 !== 0) {
        this.highestPage = Math.floor(this.lenProdGroups / 4);
      } else {
        this.highestPage = Math.floor(this.lenProdGroups / 4) - 1;
      }
    },
    btnClicked(newButtonId) {
      if (this.currentActivatedBtn != null) {
        document
          .getElementById(this.currentActivatedBtn)
          .classList.remove("active");
      }
      this.currentActivatedBtn = newButtonId;
      document.getElementById("confirmBtnPrdGroup").disabled = false;
    },
    confirmed() {
      alert(`Confirm with ${this.currentActivatedBtn} selected`);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style src="../assets/styles/styles.css"></style>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: auto auto;
  gap: 10px;
  padding: 10px;
}

.item {
  text-align: center;
  font-size: 30px;
}
</style>
