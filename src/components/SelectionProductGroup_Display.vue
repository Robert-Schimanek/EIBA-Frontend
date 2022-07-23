
<!-- Author: Schuster-->
<template>
  <button
    v-if="productGroupName !== 'XXX'"
    :id="productGroupName"
    @click="btnPress($event)"
  >
    <p style="font-size: 15pt">{{ productGroupName }}</p>
    <img
      src="../assets/pictures/productGroup/Alternator.png"
      style="width: 200px; height: 200px"
    />
  </button>
  <div
    v-else
    style="width: 200px; height: 180px; border: 2px solid black"
  ></div>
</template>

<script>
export default {
  props: {
    productGroupName: { default: "XXX" },
  },
  mounted() {
    this.init();
    this.setPicture();
  },
  watch: {
    productGroupName(newVal, oldVal) {
      this.targetId = newVal;
    },
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
      console.log(this.targetId);
      this.$emit("btnPressed", this.targetId);
    },
    activateBtn() {
      this.button.classList.add("active");
    },
    setPicture() {
      this.picSource = `${this.productGroupName}.png`;
    },
  },
};
</script>

<style src="../assets/styles/styles.css"></style>
<style scoped>
.active {
  background-color: green;
}
</style>
