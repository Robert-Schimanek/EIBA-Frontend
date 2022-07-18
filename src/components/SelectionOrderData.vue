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
        <td align="left">{{ order_i }}</td>
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
    <button>DEBUG</button>
  </div>
</template>

<script>
import SelectionOrderDataButton from "./SelectionOrderDataButton.vue";

export default {
  components: {
    SelectionOrderDataButton,
  },
  props: {
    customer_i: { default: "Customer Unknown" },
    order_i: { default: "Order Unknown" },
    program_i: { default: "Program Unknown" },
    reman_i: { default: "Reman Unkown" },
    jsonObject: { default: null },
  },
  wattch: {
    jsonObject: (newVal, oldVal) => {
      console.log("selectionOrderData Watch triggered");
      if (jsonObject !== null) {
        customer = this.newVal["Customer Number"];
        program = this.newVal.Program;
        order = this.newVal.ID;
        reman = this.newVal.ID == null ? "Reman Unkown" : this.EnteredReman.ID;
      }
    },
  },
  data() {
    return {
      customer: this.customer_i,
      program: this.program_i,
      order: this.order_i,
      reman: this.reman_i,
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
    debug() {
      console.log(this.jsonObject.ID);
    },
  },
};
</script>
<style src="../assets/styles/styles.css"></style>
