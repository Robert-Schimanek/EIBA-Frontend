<template>
    <div align="center">
        <h1 class="roundedContainer">Core Identification</h1>
    </div>
    <div>
        <button @click="Back" style="float: left; font-size: 20px; width: 5%">Back</button>
    </div>
    <div align="center">
        <div style="float: left; width: 25%">
            <p style="height: 15px; padding: 5px; text-align: left">
            Weight: {{WeightMeasured}} kg</p>
            <div class="image" v-for="i in [0, 1, 2]" :key="i">
              <CImages :Image="ImageType[i]"></CImages>
            </div>
        </div>
        <div v-if="KIAnswer==false" style="float: left; width: 25%">
            <div align="center">
              <p style="height: 250px"></p>
              <Spinner></Spinner>
              <p>awaiting on identification...</p>
            </div>
        </div>
        <div v-if="KIAnswer==true" style="float: left; width: 25%">
            <p style="height: 15px; padding: 5px; text-align: left">
            Weight: {{WeightDatabase}} kg</p>
            <div class="image" v-for="i in [3, 4, 5]" :key="i">
                <CImages :Image="ImageType[i]"></CImages>
            </div>
        </div>
        <div style="float: left; width: 45%">
            <p style="height: 25px"></p>
            <label>OEN Number: </label>
            <input type="text"
                placeholder="Manual input"
                v-model.lazy="value"/>
            <p style="height: 20px"></p>
            <div>
                <p>Ausgabe der OEN Nummern hier:</p>
                <div v-if="value != ''">
                  <div v-if="manualInput()"></div>
                </div>
                <Scroll v-if="KIAnswer==true" :valuefromInput="value"></Scroll>
            </div>
        </div>
    </div>
</template>

<script>
import CImages from "./A_Identification_Image.vue";
import Scroll from "../ScrollableList/PageScrollableList.vue";
import Spinner from "./A_Identification_Spinner.vue";

export default {
  components: {
    CImages,
    Scroll,
    Spinner,
  },
  data() {
    return {
      KIAnswer: false,
      WeightMeasured: 45.125, // Messwert-Waage
      WeightDatabase: 45.223, // KI-Abfrage
      value: '',
      ImageType: [
        "/IdentificationID/Front-View",
        "/IdentificationID/Back-View",
        "/IdentificationID/Side-View",
        "/IdentificationKI/Front-View",
        "/IdentificationKI/Back-View",
        "/IdentificationKI/Side-View",
      ],
    };
  },
  methods: {
    Back() {
      alert("Work in Progress");
    },
    init() {
      setTimeout(() => {
        this.KIAnswer = true; // Auf KI-Antwort warten
      }, 2500);
    },
    manualInput() {
      document.getElementById("ConfirmBtn").disabled = false;
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style src="../../assets/styles/styles.css"></style>

<style scoped>
.image {
    height: 200px;
    padding: 2px;
    margin-bottom: 10px;
}
</style>