<!-- This is the startpage of the progress. From here the user can scan, choose "no box" or
"no barcode", see order information and edit the status of the process
("shelve" and "close")-->
<!-- Author: Petz, (restructured by Schuster)-->
<template>
  <h1>Start Page</h1>
  <p>Barcode: {{ bar_code }}</p>
  <barcode @update:bar_code="updateBarcode"></barcode>
  <customerNumber v-bind="$attrs"></customerNumber>
  <!-- v-bind="$attrs" -> used to pass event "updateCustomerNumber" from component "customerNumber"
  to "mainpage.vue" -->
  <InfoScanBox></InfoScanBox>
</template>

<script>
import barcode from "./B_GenerateBarcodeScan.vue";
import customerNumber from "./C_CustomerNumber.vue";
import InfoScanBox from "./D_Info_Scan_Box.vue";

export default {
  name: "A_StartSelection_Page",
  components: {
    barcode,
    customerNumber,
    InfoScanBox,
  },
  methods: {
    updateBarcode(event) {
      this.bar_code = event;
      this.$emit("updateBarcode", event);
    },
  },
  data() {
    return {
      bar_code: "startPage",
    };
  },
  emits: ["updateOEN", "updateBarcode"], // "updateOEN" Just used to surpress warning
};
</script>

<style>

</style>