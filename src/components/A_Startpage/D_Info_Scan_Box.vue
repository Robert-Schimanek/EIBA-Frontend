<template>
  <h1>info scan box</h1>
  <div style="display: flex">
    <OrderData></OrderData>
    <div style="display: flex; align-items: center; padding-left: 20px">
      <button
        style="border-radius: 10px"
        @click="form_data.session_key = generateID()"
      >
        <img
          src="../../assets/pictures/BarcodeScanner.png"
          alt="BARCODE BUTTON"
          style="width: 200px"
        />
      </button>
    </div>
    <div style="display: flex; padding-left: 20px; align-items: flex-end">
      <div>
        <button
          class="bigButtonText"
          style="width: 170px"
          @click="
            form_data.session_key = generateID();
            form_data.bar_code = 'empty';
          "
        >
          NO BOX
        </button>
        <p style="font-size: 40px"></p>
        <button
          class="bigButtonText"
          style="width: 170px; vertical-align: baseline"
          @click="
            form_data.session_key = generateID();
            form_data.bar_code = 'empty';
          "
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
  props: ["customer"],
  components: {
    OrderData,
  },
  methods: {
    debug() {
      console.log(this.$parent.$data);
    },
  },
  mounted() {
    this.debug();
  },
};
</script>

<style>

</style>