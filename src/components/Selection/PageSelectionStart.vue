<template>
<div style="display: flex;">
  <SelectionOrderData></SelectionOrderData>
  <div style="position: absolute; top: 50%;"></div>
  <div style="display: flex; align-items: center; padding-left: 20px;">
      <button style="border-radius:10px;">
      <img src="../../assets/pictures/BarcodeScanner.png" alt="BARCODE BUTTON"
      style="width:200px">
      </button>
  </div>

  <div style="display: flex; padding-left: 20px; align-items: flex-end;">
    <div>
      <button class="bigButtonText" style="width: 170px; ">NO BOX</button>
      <p style="font-size:40px"></p>
      <button class="bigButtonText" style="width: 170px;
      vertical-align: baseline;">NO BARCODE</button>
    </div>

  </div>
</div>

</template>

<script>
import SelectionOrderData from './SelectionOrderData.vue';

export default {
  components: {
    SelectionOrderData,
  },
};
</script>