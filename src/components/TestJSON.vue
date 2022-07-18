<template>
  <input type="text" v-model="text" />
  <button @click="findIndexOfEAN(text)">Load Data</button>
  <button @click="loadData(text)">load index</button>
</template>

<script>
import demoData from "../assets/Data/sample.json";

export default {
  data() {
    return {
      text: "",
      index: "",
    };
  },
  methods: {
    loadData() {
      console.log(demoData[this.text].EAN13);
    },
    findIndexOfEAN(EAN) {
      for (let [key, value] of Object.entries(demoData)) {
        if (value.EAN13 === EAN) {
          console.log(key);
        }
      }
    },
  },
};
</script>