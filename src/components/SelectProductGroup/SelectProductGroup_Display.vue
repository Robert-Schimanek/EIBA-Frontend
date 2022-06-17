<template>
  <button
    v-if="productGroupName !== 'XXX'"
    :id="productGroupName"
    @click="btnPress($event)"
  >
    <p>{{ productGroupName }}</p>
    <img
      :src="require(`../../assets/pictures/productGroup/` + picSource)"
      style="width: 200px; height: 200px"
    />
  </button>
  <div
    v-else
    style="width: 200px; height: 180px; border: 2px solid black"
  ></div>
</template>

<script>
const Fs = require("fs");
const Path = require("path");

export default {
  props: {
    productGroupName: { default: "XXX" },
  },
  mounted() {
    this.init();
    this.setPicture();
  },
  data() {
    return {
      activated: false,
      targetId: null,
      counter: 0,
      button: null,
      picSource: "NoPicFound.png",
    };
  },
  methods: {
    init() {
      this.targetId = this.productGroupName;
      console.log(this.targetId);
      this.button = document.getElementById(this.targetId);
    },
    btnPress(event) {
      this.activateBtn();
      this.$emit("btnPressed", this.targetId);
    },
    activateBtn() {
      this.button.classList.add("active");
    },
    deactivateBtn() {
      this.button.classList.remove("active");
    },
    setPicture2() {
      this.png = `${this.productGroupName}.png`;
      this.p = Path.join(__dirname, "..", "..", "assets", "pictures", this.png);

      if (Fs.existsSync(this.p)) {
        this.picSource = `${this.productGroupName}.png`;
        console(`no Pic found`);
      } else {
        this.picSource = "NoPicFound.png";
      }
    },
    setPicture() {
      this.picSource = `${this.productGroupName}.png`;
    },
  },
};
</script>

<style src="../../assets/styles/styles.css"></style>
<style scoped>
.active {
  background-color: green;
}
</style>