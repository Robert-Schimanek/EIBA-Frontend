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
      console.log("selectionOrderData Watch triggered");
      if (newVal !== null) {
        console.log("newVal:");
        console.log(newVal);
        this.customer = newVal["Customer Number"];
        this.program = newVal.Program;
        this.order = newVal.ID;
        this.reman =
          newVal.EnteredReman == null ? "Reman Unkown" : newVal.EnteredReman;
      }
    },
  },
  data() {
    return {
      customer: "Customer Unknown",
      program: "Program Unknown",
      order: "Order Unknown",
      reman: "Reman Unkown",
    };
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
<style src="../assets/styles/styles.css"></style>
