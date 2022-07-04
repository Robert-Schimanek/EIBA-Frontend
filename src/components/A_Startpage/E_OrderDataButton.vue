<!-- The two buttons for E_OrderData.vue-->
<!-- Author: Schuster-->
<template>
  <button @click="functionToExecute" class="bigButtonText" style="width: 100px">
    {{ funcDesc }}
  </button>
</template>

<script>
export default {
  props: ["functionToExecute", "funcDesc"],
};
</script>
<style src="../../assets/styles/styles.css"></style>
