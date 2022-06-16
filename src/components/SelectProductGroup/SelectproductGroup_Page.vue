<template>
  <div align="center">
    <h1 class="roundedContainer">Select product group</h1>
  </div>
  <div class="grid-container">
    <div
      class="item"
      v-for="i in [0, 1, 2, 3].map((x) => x + index * 4)"
      :key="i"
    >
      <display :productGroupName="prodGroups[i]"></display>
    </div>
  </div>

  <button @click="countUp">UP</button>
  <button @click="countDown">Down</button>

  <p>{{ index }}</p>
  <p>highest index: {{ highestPage }}</p>
  <p>len Prod = {{ lenProdGroups }}</p>
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
        "Schraube",
        "Motor",
        "Wind",
        "aisjdoisad",
        "1",
        "2",
        "3",
        "4",
        "5",
      ],
      index: 0,
      lenProdGroups: 0,
      highestPage: 0,
    };
  },
  methods: {
    countUp() {
      if (this.index < this.highestPage) {
        this.index++;
      }
    },
    countDown() {
      if (this.index > 0) {
        this.index--;
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