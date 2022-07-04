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
      this.$axios
        .post(
          "http://localhost:5100/bde/selection/start",
          this.$parent.form_data
        )
        .then((response) => {
          this.$root.bde_server_start_response = response.data;
        }, (this.$root.bde_server_start_response = "No Response"));
    },
    inputCustomerNumber(event) {
      this.$root.form_data.customer_number = event.target.value;
    },
  },
  data() {
    return {};
  },
};
</script>

<style>

</style>