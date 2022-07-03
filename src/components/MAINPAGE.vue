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
    <button @click="setComponent('ScrollableList')">Scrollable</button>
    <button @click="setComponent('OrderData')">Order Data</button>
    <button @click="setComponent('webcam')">Webcam</button>
    <p>Values:</p>
    <p>OEN: {{ oenNumber }}</p>
    <p>barcode: {{ form_data.bar_code }}</p>
    <p>Server start response: {{ bde_server_start_response }}</p>
    <p>Customer number: {{ form_data.customer_number }}</p>
    <p>Program: {{ form_data.program }}</p>
  </div>

  <!-- this is the line where the dynamic components are placed-->
  <keep-alive>
    <component
      :is="activeComponent"
      @updateOEN="confirmOEN"
      @updateBarcode="form_data.bar_code = $event"
      @updateCustomerNumber="form_data.customer_number = $event"
      @updateServerStatus="bde_server_start_response = $event"
    ></component>
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
    // --------------- OEN ---------------
    // Sets OEN. triggered by oenInput component
    updateOEN(value) {
      this.oenNumber = value;
    },
    confirmOEN(value) {
      this.updateOEN(value);
      this.clearComponent();
    },
  },
  data() {
    return {
      activeComponent: "", // here  currently shown component is stored
      oenNumber: "123", // stores the oen number
      form_data: {
        customer_number: "000000",
        bar_code: "",
        bar_code_scanable: "Y",
        box_exists: "Y",
        program: "IAM gesamt",
        session_key: "", // Used for ????????????????
      },
      bde_server_start_response: "",
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
  },
};
</script>

<style>

</style>