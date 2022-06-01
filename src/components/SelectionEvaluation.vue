<template>
  <div>
    <p>Selection ID: {{ form_data.temp_selection_id }}</p>
    <p>Core Mass: {{ form_data.core_mass }}</p>
    <p>Method: {{ method }}</p>
    <p>bde_server_evaluation_response: {{ bde_server_evaluation_response.temp_selection_id }}</p>

    <form @submit.prevent='SelectionEvaluation(method)'>
      <div>
        <label for="core_mass">Post mass</label>
        <input type="text" id="core_mass" v-model="form_data.core_mass">
      </div>
      <div>
        <label for="temp_selection_id">Post selection ID</label>
        <input
        type="text"
        id="temp_selection_id"
        v-model="form_data.temp_selection_id"
        :placeholder="selection_id_main">
      </div>
      <button>Start evaluation</button>
    </form>
  </div>
  <div>
    <p>Evaluation has started: {{ bde_server_evaluation_response.prediction_commissioned }}</p>
    <p>ProductGroup prediction has started:
    {{ bde_server_evaluation_response.prediction_product_group_commissioned }}</p>
    <p>Temporary selection id: {{ bde_server_evaluation_response.temp_selection_id }}</p>
  </div>
  <div v-if="form_data.temp_selection_id==bde_server_evaluation_response.temp_selection_id">
    <button
      @click="emitCoreMass(form_data.core_mass);
      changeToResults(bde_server_evaluation_response.temp_selection_id)">
        Change to result screen
    </button>
  </div>
  <ul id="array-rendering">
    <li v-for="item in boxlinks" :key="item">{{ item.box_code }}</li>
  </ul>
</template>

<script>
export default {
  name: 'SelectionEvaluation',
  props: ['selection_id_main'],
  data() {
    return {
      form_data: {
        core_mass: 4213,
        temp_selection_id: this.selection_id_main,
      },
      method: 'SSE',
      bde_server_evaluation_response: '',
    };
  },
  emits: ['change-to-results-OEN'],
  methods: {
    SelectionEvaluation(method) {
      this.$axios.post(`http://localhost:5100/bde/selection/evaluation/${encodeURIComponent(method)}`, this.form_data)
        .then((response) => { this.bde_server_evaluation_response = response.data; });
    },
    goToHome() {
      this.$router.push('/');
    },
    changeToResults(selectionID) {
      this.$emit('change-to-results-OEN', 'SelectionResultOEN');
      this.$emit('selection-id', selectionID);
    },
    emitCoreMass(coreMass) {
      this.$emit('core-mass', coreMass);
    },
  },
};
</script>

<style>

</style>
