<template>
  <input type="text" v-model="text" />
  <button @click="findIndexOfEAN(text)">Load Data</button>
  <button @click="loadData(text)">load index</button>
  <button @click="get">Test GET</button>
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
    get() {
      this.$axios
        .get(
          `http://localhost:5800/EIBA/Images/05_27_2022/2205276020002.zip/Blank_2205276020002.json`
        )
        .then((resp) => {
          console.log(resp.data);
        });
    },
    get2() {
      this.jQuery.getJSON(
        `http://localhost:5800/EIBA/Images/05_27_2022/2205276020002.zip/Blank_2205276020002.json`,
        (data) => {
          console.log(data);
        }
      );
    },
  },
};
</script>