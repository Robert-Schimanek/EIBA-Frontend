<!-- This is the main page. From here all other components are shown-->
<template>
  <div style="border: thin solid black">
    <p>MAINPAGE STUFF</p>
    <button @click="setComponent('startPage')">startPage</button>
    <button @click="setComponent('startPageOld')">startPageOld</button>
    <button @click="setComponent('oenInput')">OEN</button>
    <button @click="setComponent('TestButtons')">Test</button>
    <button @click="setComponent('SelectProductGroup')">
      Select Product group
    </button>
    <button @click="setComponent('identification')">Core Identification</button>
    <button @click="setComponent('ScrollableList')">Scrollable</button>
    <button @click="setComponent('OrderData')">Order Data</button>
    <button @click="setComponent('webcam')">Webcam</button>

    <p>Values:</p>
    <p>OEN: {{ $root.returnpartInfo.oenNumber }}</p>
    <p>barcode: {{ $root.form_data.bar_code }}</p>
    <p>Server start response: {{ $root.bde_server_start_response }}</p>
    <p>Customer number: {{ $root.form_data.customer_number }}</p>
    <p>Program: {{ $root.form_data.program }}</p>
    <p>Session key: {{ $root.form_data.session_key }}</p>
    <p>Product Group: {{ $root.returnpartInfo.productGroup }}</p>
  </div>

  <!-- this is the line where the dynamic components are placed-->
  <keep-alive>
    <component :is="activeComponent"></component>
  </keep-alive>
  <!--updateOEN: updates the oen, triggered by "oenInput.vue"
  updateBarcode: update Barcode, triggered by "A_SartSelection_Page.vue"
  -->
</template>

<script>
import startPageOld from "./SelectionStart.vue";
import startPage from "./A_Startpage/A_StartSelection_Page.vue";
import TestButtons from "./TestPlaceAndRemoveComponent/CreateButtons.vue";
import SelectProductGroup from "./SelectProductGroup/SelectproductGroup_Page.vue";
import ScrollableList from "./ScrollableList/PageScrollableList.vue";
import OrderData from "./SelectionOrderData.vue";
import oenInput from "./oenInput/oenInput.vue";
import webcam from "./imageCaptureTest/webcamTest.vue";
import identification from "./C_Identification/A_Identification_Page.vue";

export default {
  methods: {
    // --------------- show and remove components ---------------
    clearComponent() {
      this.activeComponents = "";
    },
    removeSingleComp(index) {
      // use this to remove the component. Inside the child you need a this.$emit("remove", "");
      // event call, to call  @remove inside this file
      this.activeComponents.splice(index, 1);
    },
    setComponent(componentName) {
      // This adds the component with the given name to the mainpage
      this.activeComponent = componentName;
    },
    exampleAddComponent() {
      // adds the created Button to the main page. Same effect as addComponent("TestButtons")
      this.activeComponents.push({
        name: "TestButtons",
      });
    },
  },
  data() {
    return {
      activeComponent: "", // here  currently shown component is stored
    };
  },
  components: {
    startPage,
    startPageOld,
    TestButtons,
    SelectProductGroup,
    ScrollableList,
    OrderData,
    oenInput,
    webcam,
    identification,
  },
};
</script>

<style>
</style>