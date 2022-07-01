<template>
  <button @click="deleteMe">Delete me</button>
</template>

<script>
export default {
  methods: {
    deleteMe() {
      this.$emit("remove", "");
    },
  },
};
</script>

<style>

</style>