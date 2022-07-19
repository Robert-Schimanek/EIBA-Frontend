<template>
  <button @click="functionToExecute" class="bigButtonText" style="width: 150px">
  {{ funcDesc}}</button>
</template>

<script>
export default {
  props: ['functionToExecute', 'funcDesc'],

};
</script>
<style src="../assets/styles/styles.css"></style>
