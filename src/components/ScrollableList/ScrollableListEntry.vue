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