<!-- This component is used to manually input the oen Number-->
<template>
  <h1>THIS IS ONLY A PLACEHOLDER</h1>
  <button @click="confirm()">Confirm</button>
</template>

<script>
export default {
  methods: {
    confirm() {
      console.log("confirm oen");
      this.$root.returnpartInfo.oenNumber = this.oenNumber;
    },
  },
  data() {
    return { oenNumber: "000000000000" };
  },
};
</script>

<style>

</style>