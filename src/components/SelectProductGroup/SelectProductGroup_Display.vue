<template>
  <button
    v-if="productGroupName !== 'XXX'"
    :id="productGroupName"
    @click="btnPress($event)"
  >
    <p>{{ productGroupName }}</p>
    <img src="../../assets/pictures/BarcodeScanner.png" style="width: 200px" />
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
  },
  data() {
    return {
      activated: false,
      targetId: null,
      counter: 0,
      button: null,
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
      console.log(this.button);
      this.button.classList.add("active");
    },
  },
};
</script>

<style src="../../assets/styles/styles.css"></style>
<style scoped>
.active {
  background-color: green;
}
.inactive {
  background-color: red;
}
</style>