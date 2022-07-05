<!-- Component diplays E_orderData.vue, Barcode scan button,
no Box and no barcode button-->
<!-- Author: Petz, (restructured by Schuster)-->
<template>
  <h1>info scan box</h1>
  <div style="display: flex">
    <OrderData></OrderData>
    <div style="display: flex; align-items: center; padding-left: 20px">
      <button style="border-radius: 10px" @click="scanProcess()">
        <img
          src="../../assets/pictures/BarcodeScanner.png"
          alt="BARCODE BUTTON"
          style="width: 200px"
        />
      </button>
    </div>

    <div style="display: flex; padding-left: 20px; align-items: flex-end">
      <div>
        <button class="bigButtonText" style="width: 170px" @click="noBox()">
          NO BOX
        </button>
        <p style="font-size: 40px"></p>
        <button
          class="bigButtonText"
          style="width: 170px; vertical-align: baseline"
          @click="noBarcode()"
        >
          NO BARCODE
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import OrderData from "./E_OrderData.vue";

export default {
  components: {
    OrderData,
  },
  methods: {
    noBox() {
      alert("Just set session key");
      this.$root.form_data.session_key = this.generateSessionID();
    },
    noBarcode() {
      alert("Just set session key");
      this.$root.form_data.session_key = this.generateSessionID();
      this.$root.form_data.bar_code = "empty";
      // JUST FOR TESTING PURPOSE: Go to "B_ManualOENInput.vue"
      this.$emit("changeComponent", "oenInput");
    },
    scanProcess() {
      // this is triggered, when the barcodescanner button is pressed
      alert("Just set session key. Use the barcode generator please");
      this.$root.form_data.session_key = this.generateSessionID();
    },
    generateSessionID() {
      return Math.floor(Math.random() * 1000000000000).toString();
    },
  },
};
</script>

<style>

</style>