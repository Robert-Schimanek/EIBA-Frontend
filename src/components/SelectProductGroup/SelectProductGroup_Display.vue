<template>
  <button>
    <p>{{ productGroupName }}</p>
    <img src="../../assets/pictures/BarcodeScanner.png" style="width: 200px" />
  </button>
</template>

<script>
export default {
  props: {
    productGroupName: { default: "Unknown Name" },
  },
};
</script>

<style src="../../assets/styles/styles.css"></style>