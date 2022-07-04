<!-- Single entry of "PageSCrollableList" Single entries turn green if clicked on them-->
<!-- Author: Kröger, Schuster-->
<template>
  <button @click="buttonSelected" class="productGroupDisplay">
    {{ productGroupName }}
  </button>
</template>

<script>
export default {
  props: {
    productGroupName: { default: "Unknown Name" },
  },
  methods: {
    buttonSelected() {
      console.log(this.$parent);
    },
  },
  data() {
    return {
      pathToImage: "../../../src/assets/pictures/productGroup/BrakeCaliper.png",
    };
  },
};
</script>

<style>
.productGroupDisplay {
  width: 100px;
  border: 1px solid black;
  width: 100%;
  border-radius: 5px;
  font-size: 30px;
}
</style>