<template>
  <img style="width: 100px; height: 100px" alt="" id="12345" />
  <button @click="setPic">set image</button>
</template>

<script>
export default {
  methods: {
    setPic() {
      document.getElementById("12345");
    },
  },
};
</script>

<style>

</style>