<!-- This is the startpage of the progress. From here the user can scan, choose "no box" or
"no barcode", see order information and edit the status of the process
("shelve" and "close")-->
<!-- Author: Petz, (restructured by Schuster)-->
<template>
  <h1>Start Page</h1>
  <p>Barcode: {{ $root.form_data.bar_code }}</p>
  <barcode></barcode>
  <customerNumber></customerNumber>
  <InfoScanBox v-bind="$attrs"></InfoScanBox>
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
};
</script>

<style>

</style>