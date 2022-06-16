<template>
  <div align="center">
    <h1 class="roundedContainer">Select product group</h1>
  </div>
  <div class="grid-container" v-for="item in prodGroups" :key="item">
    <div class="item"><display :productGroupName="item"></display></div>
  </div>
  <div class="grid-container">
    <div class="item"><display productGroupName="item"></display></div>
  </div>
</template>

<script>
import display from "./SelectProductGroup_Display.vue";

export default {
  components: {
    display,
  },
  data() {
    return {
      prodGroups: ["Schraube", "Motor", "Wind"],
    };
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
  border: 1px solid black;
  text-align: center;
  font-size: 30px;
}
</style>