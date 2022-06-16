<template>
  <button v-if="productGroupName !== 'XXX'">
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
};
</script>

<style src="../../assets/styles/styles.css"></style>