<!-- WICHTIG:
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

Wenn später die Daten nicht mehr aus der JSON geladen werden sollen müssen an einigen Stellen
":disabled= [...]" entfernt werden. Ansonsten lassen sich einige Buttons nicht drücken!

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-->
<template>
  <p class="headerText">Selection Evaluation</p>
  <div>
    <p>formdata Session key: {{ form_data.session_key }}</p>
    <p>bde selection id: {{ bde_server_evaluation_response.session_key }}</p>

    <p>Core Mass: {{ form_data.core_mass }} g</p>
    <p>Mass = {{ loadedData.Weight }} kg (loaded from JSON)</p>

    <p>Method: {{ method }}</p>

    <div>
      <label for="core_mass">Post mass</label>
      <input type="text" id="core_mass" v-model="form_data.core_mass" />
    </div>
    <button class="bigButtonText" @click="SelectionEvaluation(method)">
      Start evaluation
    </button>
  </div>
  <div>
    <p>
      Evaluation has started:
      {{ bde_server_evaluation_response.prediction_commissioned }}
    </p>
    <p>
      ProductGroup prediction has started:
      {{ bde_server_evaluation_response.prediction_product_group_commissioned }}
    </p>
  </div>
  <div
    v-if="form_data.session_key == bde_server_evaluation_response.session_key"
  >
    <button
      class="bigButtonText"
      :disabled="
        bde_server_evaluation_response.prediction_product_group_commissioned
      "
      @click="
        emitCoreMass(form_data.core_mass);
        changeToResults(bde_server_evaluation_response.session_key);
      "
    >
      Select OEN
    </button>
  </div>
  <div
    v-if="form_data.session_key == bde_server_evaluation_response.session_key"
  >
    <button
      class="bigButtonText"
      :disabled="
        !bde_server_evaluation_response.prediction_product_group_commissioned
      "
      @click="
        emitCoreMass(form_data.core_mass);
        changeToProductGroupResults(bde_server_evaluation_response.session_key);
      "
    >
      Select product group
    </button>
  </div>
  <ul id="array-rendering">
    <li v-for="item in boxlinks" :key="item">{{ item.box_code }}</li>
  </ul>
</template>

<script>
export default {
  name: "SelectionEvaluation",
  props: ["session_key_main", "loadedData"],
  data() {
    return {
      form_data: {
        core_mass: 0,
        session_key: this.session_key_main,
      },
      method: "SSE",
      bde_server_evaluation_response: "",
    };
  },
  emits: ["change-to-results-OEN", "change-to-results-PG"],
  created() {
    this.form_data.core_mass = Math.floor(this.loadedData.Weight * 1000);
  },
  methods: {
    SelectionEvaluation(method) {
      this.$axios
        .post(
          `http://localhost:5100/bde/selection/evaluation/${encodeURIComponent(
            method
          )}`,
          this.form_data
        )
        .then((response) => {
          console.log(response.data);
          this.bde_server_evaluation_response = response.data;
        });
    },
    goToHome() {
      this.$router.push("/");
    },
    changeToResults(sessionKey) {
      this.$emit("change-to-results-OEN", "SelectionResultOEN");
      this.$emit("session-key", sessionKey);
    },
    changeToProductGroupResults(sessionKey) {
      this.$emit("change-to-results-PG", "SelectionResultPG");
      this.$emit("session-key", sessionKey);
    },
    emitCoreMass(coreMass) {
      this.$emit("core-mass", coreMass);
    },
  },
};
</script>

<style src="../assets/styles/styles.css"></style>
