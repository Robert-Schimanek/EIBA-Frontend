<template>
  <div>
    <p>Selection ID: {{ form_data.session_key }}</p>
    <p>Core Mass: {{ form_data.core_mass }}</p>
    <p>Method: {{ method }}</p>
    <p>bde_server_evaluation_response: {{ bde_server_evaluation_response.session_key }}</p>

    <form @submit.prevent='SelectionEvaluation(method)'>
      <div>
        <label for="core_mass">Post mass</label>
        <p>Mass = {{ loadedData.Weight }}kg (loaded from JSON)</p>
        <input type="text" id="core_mass" v-model="form_data.core_mass">
      </div>
      <div>
        <label for="session_key">Post selection ID</label>
        <input
        type="text"
        id="session_key"
        v-model="form_data.session_key"
        :placeholder="session_key">
      </div>
      <button>Start evaluation</button>
    </form>
  </div>
  <div>
    <p>Evaluation has started: {{ bde_server_evaluation_response.prediction_commissioned }}</p>
    <p>ProductGroup prediction has started:
    {{ bde_server_evaluation_response.prediction_product_group_commissioned }}</p>
    <p>Temporary selection id: {{ bde_server_evaluation_response.session_key }}</p>
  </div>
  <div v-if="form_data.session_key==bde_server_evaluation_response.session_key">
    <button
      @click="emitCoreMass(form_data.core_mass);
      changeToResults(bde_server_evaluation_response.session_key)">
        Change to result screen OEN prediction_commissioned
    </button>
  </div>
  <div v-if="form_data.session_key==bde_server_evaluation_response.session_key">
    <button
      @click="emitCoreMass(form_data.core_mass);
      changeToProductGroupResults(bde_server_evaluation_response.session_key)">
        Change to result screen if NO BOX NO BARCODE PG PRE prediction_commissioned
    </button>
  </div>
  <ul id="array-rendering">
    <li v-for="item in boxlinks" :key="item">{{ item.box_code }}</li>
  </ul>
</template>

<script>
export default {
  name: 'SelectionEvaluation',
  props: ['session_key_main', 'loadedData'],
  data() {
    return {
      form_data: {
        core_mass: 4213,
        session_key: this.session_key_main,
      },
      method: 'SSE',
      bde_server_evaluation_response: '',
    };
  },
  emits: ['change-to-results-OEN', 'change-to-results-PG'],
  methods: {
    SelectionEvaluation(method) {
      this.$axios.post(`http://localhost:5100/bde/selection/evaluation/${encodeURIComponent(method)}`, this.form_data)
        .then((response) => { this.bde_server_evaluation_response = response.data; });
    },
    goToHome() {
      this.$router.push('/');
    },
    changeToResults(sessionKey) {
      this.$emit('change-to-results-OEN', 'SelectionResultOEN');
      this.$emit('session-key', sessionKey);
    },
    changeToProductGroupResults(sessionKey) {
      this.$emit('change-to-results-PG', 'SelectionResultPG');
      this.$emit('session-key', sessionKey);
    },
    emitCoreMass(coreMass) {
      this.$emit('core-mass', coreMass);
    },
  },
  computed: {
    mass: () => {
      let m = 0;
      try { m = this.loadedData.Weight; } catch (e) {
        m = 0;
      }
      return m;
    }
  },
  watch: {
    loadedData(newVal, oldVal) {
      mass = newVal.Weight;
    }
  }
};
</script>

<style>

</style>
