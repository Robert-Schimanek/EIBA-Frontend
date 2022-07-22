<template>
  <div class="roundedContainer" style="margin:25px; padding: 5px;">
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
        <th align="left">Customer Delv No.:</th>
        <td align="left">{{ CustomerDelvNo }}</td>
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
import SelectionOrderDataButton from "./SelectionOrderDataButton.vue";

export default {
  components: {
    SelectionOrderDataButton,
  },
  props: {
    jsonObject: {
      /*
      "Customer Number": "Custome r Number Unkown",
      Program: "Program Unknown",
      ID: "ID unknown",
      EnteredReman: "Reman unkown", */
    },
  },
  watch: {
    jsonObject(newVal, oldVal) {
      if (newVal !== null) {
        this.customer = newVal["Customer Number"];
        this.program = newVal.Program;
        this.order = newVal.ID;
        this.CustomerDelvNo = newVal["Customer Delv No."];
      }
    },
  },
  data() {
    return {
      customer: "Customer Unknown",
      program: "Program Unknown",
      order: "Order Unknown",
      CustomerDelvNo: "Unknown",
    };
  },
  methods: {
    putOnShelf() {
      this.$emit("updateloadedData", ["Accept State", "placed on shelf"]);
    },
    closeOrder() {
      this.$emit("updateloadedData", ["Accept State", "Order closed"]);
    },
  },
};
</script>
<style src="../assets/styles/styles.css"></style>
