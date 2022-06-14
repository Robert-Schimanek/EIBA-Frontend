<template>
  <div v-if="bar_code">
    <VueBarcode  v-bind:value="bar_code" :options="{ displayValue: true }"
    style="width: 170px">
    </VueBarcode>
  </div>
</template>

<script type="vue-template" id="barcode-display">
import VueBarcode from '@chenfengyuan/vue-barcode';

export default {
  components: {
    VueBarcode,
  },
  props: {
    bar_code: { default: '' },
  },
  data() {
    return {
      bar_code_i: this.bar_code,
    };
  },
  methods: {
  },

};
</script>
<style src="../assets/styles/styles.css"></style>
