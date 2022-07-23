<template>
  <div align="center">
    <h1 class="roundedContainer">OEN Identification</h1>
  </div>
  <div>
    <p>Selection ID: {{ form_data.session_key }}</p>
    <form @submit.prevent="SelectionResultOEN(form_data.session_key)">
      <button>Get results</button>
    </form>
  </div>
  <div align="center">
    <div style="float: left; width: 25%">
      <p style="height: 15px; padding: 5px; text-align: left">
        Weight: {{ form_data.core_mass }} g
      </p>
      <div class="image" v-for="i in [0, 1, 2]" :key="i">
        <CImages
          :ImageType="ImageType[i]"
          :ID="loadedData.ID"
          :listImgPaths="listImgPaths[i]"
        ></CImages>
      </div>
    </div>
    <div v-if="KIAnswer == false" style="float: left; width: 25%">
      <div align="center">
        <p style="height: 250px"></p>
        <Spinner></Spinner>
        <p>awaiting identification...</p>
      </div>
    </div>
    <div v-if="KIAnswer == true" style="float: left; width: 25%">
      <p style="height: 15px; padding: 5px; text-align: left">
        Weight: {{ loadedData.Weight*1000 }} g
      </p>
      <div class="image" v-for="i in [3, 4, 5]" :key="i">
        <CImages
          :ImageType="ImageType[i]"
          :ID="loadedData.ID"
          :listImgPaths="listImgPaths[i]"
        ></CImages>
      </div>
    </div>
    <div style="float: left; width: 45%">
      <p style="height: 25px"></p>
      <label>OEN: </label>
      <input type="text" placeholder="Manual input" v-model.lazy="value" />
      <p style="height: 20px"></p>
      <div>
        <p>Ausgabe der OEN Nummern hier:</p>
        <div v-if="value != ''">
          <div v-if="manualInput()"></div>
        </div>
        <Scroll
          v-if="KIAnswer == true"
          :valuefromInput="value"
          :listOEN="listOEN"
        ></Scroll>
      </div>
    </div>
  </div>
  <!--
  <div align="center">
    <p>
      Product Group Prediction list:
      {{ bde_server_result_OEN_response.product_group_prediction_list }}
    </p>
    <p>
      OEN Prediction list:
      {{ bde_server_result_OEN_response.oen_prediction_list }}
    </p>
    <p>
      ProductGroup prediction has started:
      {{ bde_server_result_OEN_response.prediction_product_group_commissioned }}
    </p>
    <p>
      Temporary selection id: {{ bde_server_result_OEN_response.session_key }}
    </p>
  </div>
<<<<<<< Updated upstream
  <button @click="test">TEST</button>
=======
  -->
>>>>>>> Stashed changes
</template>

<script>
import CImages from "./A_Identification_Image.vue";
import Spinner from "./A_Identification_Spinner.vue";
import Scroll from "./Reuseables/ScrollableList/PageScrollableList.vue";

export default {
  components: {
    CImages,
    Spinner,
    Scroll,
  },
  name: "SelectionResultOEN",
  props: ["session_key_main", "core_mass_main", "loadedData"],
  data() {
    return {
      form_data: {
        core_mass: this.core_mass_main,
        session_key: this.session_key_main,
      },
      bde_server_result_OEN_response: "",
      leftView: {
        default:
          "https://cdn.pixabay.com/photo/2021/07/21/12/49/error-6482984_960_720.png",
      },
      rightView: {
        default:
          "https://cdn.pixabay.com/photo/2021/07/21/12/49/error-6482984_960_720.png",
      },
      topView: {
        default:
          "https://cdn.pixabay.com/photo/2021/07/21/12/49/error-6482984_960_720.png",
      },
      value: "",
      listImgPaths: [],
      listOEN: [],
      ImageType: [
        "Left-View",
        "Right-View",
        "Top-View",
        "Left-View",
        "Right-View",
        "Top-View",
      ],
      KIAnswer: false,
      weight_history: 2345,
      // Hier eine OEN - Average Weight List abfrage ermöglichen
    };
  },
  methods: {
    SelectionResultOEN(selectionIdResult) {
      this.$axios
        .get(
          `http://localhost:5100/bde/selection/evaluation/status/${encodeURIComponent(
            selectionIdResult
          )}`
        )
        .then((response) => {
          this.bde_server_result_OEN_response = response.data;
          this.OENPredictions();
        });
    },
    init() {
      setTimeout(() => {
        this.KIAnswer = true; // Auf KI-Antwort warten
      }, 2500);
    },
    manualInput() {
      document.getElementById("ConfirmBtn").disabled = false;
    },
    getJson() {
      if (this.loadedData["Cam Images"] !== null) {
        this.$axios
          .get(
            `http://localhost:5800/EIBA/Images/05_27_2022/${this.loadedData.ID}.zip/Part_${this.loadedData.ID}.json`
          )
          .then((data) => {
            this.topView = `http://localhost:5800/EIBA/Images/05_27_2022/${this.loadedData.ID}.zip/${data.data.topCamera.images.color}`;
            this.rightView = `http://localhost:5800/EIBA/Images/05_27_2022/${this.loadedData.ID}.zip/${data.data.rightCamera.images.color}`;
            this.leftView = `http://localhost:5800/EIBA/Images/05_27_2022/${this.loadedData.ID}.zip/${data.data.leftCamera.images.color}`;
            this.listImgPaths = [
              this.leftView,
              this.rightView,
              this.topView,
              this.leftView,
              this.rightView,
              this.topView,
            ];
            console.log(this.leftView);
            console.log(this.rightView);
            console.log(this.topView);
          });
      }
    },
    OENPredictions() {
      let i = 0;
      while (i <= 20) {
        this.listOEN[i] =
          this.bde_server_result_OEN_response.oen_prediction_list.predictions[
            i
          ].oen;
        i += 1;
      }
      console.log(this.listOEN);
      console.log(
        this.bde_server_result_OEN_response.oen_prediction_list.state
      );
    },
    test() {
      console.log(this.bde_server_result_OEN_response.oen_prediction_list.predictions[1]);
    }
  },
  mounted() {
    this.init();
    this.getJson();
  },
};
</script>

<style src="../assets/styles/styles.css"></style>

<style scoped>
.image {
  height: 200px;
  padding: 2px;
  margin-bottom: 10px;
}
</style>
