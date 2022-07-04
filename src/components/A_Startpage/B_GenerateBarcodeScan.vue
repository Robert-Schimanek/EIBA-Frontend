<!-- Its a button, which generates and displays a random generated Barcode-->
<!-- Author: Petz, (restructured by Schuster)-->
<template>
  <button style="border-radius: 10px" @click="randomEAN(boxinfos)">
    <VueBarcode
    v-bind:value="bar_code"
      :options="{ displayValue: true }"
      style="width: 170px"
    >
    </VueBarcode>
  </button>
</template>

<script>
import VueBarcode from "@chenfengyuan/vue-barcode";
import boxInfos from "../../assets/bar_code_list.json";

export default {
  name: "GenerateBarcodeScan",
  methods: {
    // chooses a rondom barcode out of boxInfos (which is a json list)
    // and sets  this.$root.form_data.bar_code to it
    randomEAN(boxinfos) {
      const randomIndex = Math.floor(Math.random() * boxinfos.length);
      this.bar_code = boxinfos[randomIndex].bar_code;
      this.$root.form_data.bar_code = this.bar_code;
    },
  },
  emits: ["update:bar_code"],
  data() {
    return {
      boxinfos: boxInfos,
      bar_code: "0000000",
    };
  },
  components: {
    VueBarcode,
  },
};
</script>

<style>

</style>