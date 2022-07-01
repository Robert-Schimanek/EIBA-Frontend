<!-- This is the main page. From here all other components are shown-->
<template>
  <button @click="addComponent('oenInput')">OEN</button>
  <button @click="addComponent('TestButtons')">Test</button>
  <button @click="addComponent('SelectProductGroup')">
    Select Product group
  </button>
  <button @click="addComponent('ScrollableList')">Scrollable</button>
  <button @click="addComponent('OrderData')">Order Data</button>
  <button @click="addComponent('webcam')">Webcam</button>
  <!--@clearAll removes all components
    add   adds a new component
    remove removes the component, which called this event -->
  <p>OEN: {{ oenNumber }}</p>
  <component
    v-for="(item, index) in activeComponents"
    :is="item.name"
    :key="index"
    @clearAll="clearComponents()"
    @add="addComponent(name)"
    @remove="removeSingleComp(index)"
    @updateOEN="confirmOEN"
  ></component>
</template>

<script>
import TestButtons from "./TestPlaceAndRemoveComponent/CreateButtons.vue";
import SelectProductGroup from "./SelectProductGroup/SelectproductGroup_Page.vue";
import ScrollableList from "./ScrollableList/PageScrollableList.vue";
import OrderData from "./SelectionOrderData.vue";
import oenInput from "./oenInput/oenInput.vue";
import webcam from "./imageCaptureTest/webcamTest.vue";

export default {
  methods: {
    // --------------- show and remove components ---------------
    clearComponents() {
      this.activeComponents = [];
    },
    removeSingleComp(index) {
      // use this to remove the component. Inside the child you need a this.$emit("remove", "");
      // event call, to call  @remove inside this file
      this.activeComponents.splice(index, 1);
    },
    addComponent(componentName) {
      // This adds the component with the given name to the mainpage
      this.clearComponents();
      this.activeComponents.push({ name: componentName });
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
      alert("abc");
      this.updateOEN(value);
      this.clearComponents();
    },
  },
  data() {
    return {
      activeComponents: [], // here all currently shown components are stored
      oenNumber: "123", // stores the oen number
    };
  },
  components: {
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