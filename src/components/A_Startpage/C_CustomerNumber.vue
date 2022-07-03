<!-- Sets the "customer_number" (send to MAINPAGE.vue) -->
<!-- Author: Petz, (restructured by Schuster)-->
<template>
  <form @submit.prevent="SelectionStart">
    <div>
      <label for="customer_number">Post customer number</label>
      <input
        type="text"
        id="customer_number"
        v-on:input="inputCustomerNumber"
        placeholder="43016357"
      />
    </div>
  </form>
</template>

<script>
export default {
  methods: {
    SelectionStart() {
      console.log("C-> Selection start");
      this.$axios
        .post(
          "http://localhost:5100/bde/selection/start",
          this.$parent.form_data
        )
        .then((response) => {
          this.$emit("updateServerStatus", response.data);
        }, this.$emit("updateServerStatus", "No response"));
    },
    inputCustomerNumber(event) {
      this.$emit("updateCustomerNumber", event.target.value);
    },
  },
  data() {
    return {};
  },
  emits: ["updateCustomerNumber"],
};
</script>

<style>

</style>