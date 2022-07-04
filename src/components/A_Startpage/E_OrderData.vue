<template>
  <div class="roundedContainer">
    <h1>Order Data</h1>
    <table align="center">
      <tr>
        <th align="left" width="100px">Customer:</th>
        <td align="left">{{ $root.form_data.customer_number }}</td>
      </tr>
      <tr>
        <th align="left">Program:</th>
        <td align="left">{{ $root.form_data.program }}</td>
      </tr>
      <tr>
        <th align="left">Order:</th>
        <td align="left">WHAT IS THIS VALUE?</td>
      </tr>
      <tr>
        <th align="left">Reman:</th>
        <td align="left">{{ $root.form_data.reman }}</td>
      </tr>
    </table>
    <p style="margin: 30px"></p>
    <SelectionOrderDataButton
      funcDesc="Shelf"
      :functionToExecute="putOnShelf"
    />
    <p style="margin: 30px"></p>
    <SelectionOrderDataButton
      funcDesc="Close"
      :functionToExecute="closeOrder"
    />
  </div>
</template>

<script>
import OrderDataButton from "./E_OrderDataButton.vue";

export default {
  components: {
    SelectionOrderDataButton: OrderDataButton,
  },
  methods: {
    putOnShelf() {
      window.alert("placed on shelf!");
    },
    closeOrder() {
      const message = "order closed";
      window.alert(message);
    },
  },
  mounted() {
    console.log("mounted");
    this.$nextTick(() => {
      console.log("mount2");
      console.log(this.$refs);
    });
  },
};
</script>
<style src="../../assets/styles/styles.css"></style>
