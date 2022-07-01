<template>
  <h1>THIS IS ONLY A PLACEHOLDER</h1>
  <button @click="confirm()">Confirm</button>
</template>

<script>
export default {
  emits: ["updateOEN"],
  methods: {
    confirm() {
      this.$emit("updateOEN", this.oenNumber);
    },
  },
  data() {
    return { oenNumber: "000000000000" };
  },
};
</script>

<style>

</style>