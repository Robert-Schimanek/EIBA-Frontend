<template>
  <div class="roundedContainer">
    <h1>Order Data</h1>
    <table align="center">
      <tr>
        <th align="left" width="100px">Customer:</th>
        <td align="left">{{ customer }}</td>
      </tr>
      <tr>
        <th align="left">Program:</th>
        <td align="left">{{ program }}</td>
      </tr>
      <tr>
        <th align="left">Order:</th>
        <td align="left">{{ order }}</td>
      </tr>
      <tr>
        <th align="left">Reman:</th>
        <td align="left">{{ reman }}</td>
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
  props: {
    customer: { default: "Customer Unknown" },
    order: { default: "Order Unknown" },
    program: { default: "Program Unknown" },
    reman: { default: "Reman Unkown" },
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
};
</script>
<style src="../../assets/styles/styles.css"></style>
