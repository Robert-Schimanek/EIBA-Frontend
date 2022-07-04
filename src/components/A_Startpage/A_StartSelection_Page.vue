<!-- This is the startpage of the progress. From here the user can scan, choose "no box" or
"no barcode", see order information and edit the status of the process
("shelve" and "close")-->
<!-- Author: Petz, (restructured by Schuster)-->
<template>
  <h1>Start Page</h1>
  <p>Barcode: {{ this.$root.form_data.bar_code }}</p>
  <barcode></barcode>
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
  },
  data() {
    return {
      bar_code: "startPage",
    };
  },
};
</script>

<style>

</style>