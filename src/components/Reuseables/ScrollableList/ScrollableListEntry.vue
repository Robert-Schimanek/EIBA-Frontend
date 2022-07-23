<template>
  <button @click="btnPress($event)" :id="displayedNames"
  class="displayedNames">
    {{ displayedNames }}
  </button>
</template>

<script>
export default {
  props: {
    displayedNames: { default: "Unknown OEN" },
  },
  methods: {
    init() {
      this.targetId = this.displayedNames;
      console.log(this.targetId);
      this.button = document.getElementById(this.targetId);
    },
    btnPress(event) {
      this.activateBtn();
      this.$emit("btnPressed", this.targetId);
      document.getElementById("inputOEN").value = '';
    },
    activateBtn() {
      this.button.classList.add("active");
    },
  },
  data() {
    return {
      activated: false,
      targetId: null,
      button: null,
    };
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped>
.displayedNames {
  border: 2px solid black;
  width: 99%;
  border-radius: 5px;
  font-size: 35px;
}
</style>