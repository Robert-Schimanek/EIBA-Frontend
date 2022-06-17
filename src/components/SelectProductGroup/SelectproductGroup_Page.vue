<template>
  <div align="center">
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

  <button @click="countUp">UP</button>
  <button @click="countDown">Down</button>

  <p>{{ index }}</p>
  <p>highest index: {{ highestPage }}</p>
  <p>len Prod = {{ lenProdGroups }}</p>
  <p>current active Btn: {{ currentActivatedBtn }}</p>
</template>

<script>
import display from "./SelectProductGroup_Display.vue";

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
        "1",
        "2",
        "3",
        "4",
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
      }
    },
    countDown() {
      if (this.index > 0) {
        this.index--;
        this.currentActivatedBtn = null;
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
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style src="../../assets/styles/styles.css"></style>

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