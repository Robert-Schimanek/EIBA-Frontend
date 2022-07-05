<template>
  <div>
    <p>Selection ID: {{ form_data.session_key }}</p>
    <p>Core Mass: {{ form_data.core_mass }}</p>
    <p>Method: {{ method }}</p>
    <form @submit.prevent='SelectionResultOEN(form_data.session_key)'>
      <button>
      Get results
      </button>
    </form>
  </div>
  <div>
    <p>Product Group Prediction list:
    {{ bde_server_result_OEN_response.product_group_prediction_list}}</p>
    <p>OEN Prediction list: {{ bde_server_result_OEN_response.oen_prediction_list}}</p>
    <p>ProductGroup prediction has started:
    {{ bde_server_result_OEN_response.prediction_product_group_commissioned }}</p>
    <p>Temporary selection id: {{ bde_server_result_OEN_response.session_key }}</p>
  </div>
  <div v-if="form_data.session_key==bde_server_result_OEN_response.session_key">
    <button
      @click="changeEvaluation(bde_server_result_OEN_response.session_key)">
        Put core on scale
    </button>
  </div>
  <ul id="array-rendering">
    <li v-for="item in boxlinks" :key="item">{{ item.box_code }}</li>
  </ul>
</template>

<script>
export default {
  name: 'SelectionResultOEN',
  props: ['session_key_main', 'core_mass_main'],
  data() {
    return {
      form_data: {
        core_mass: this.core_mass_main,
        session_key: this.session_key_main,
      },
      bde_server_result_OEN_response: '',
    };
  },
  methods: {
    SelectionResultOEN(selectionIdResult) {
      this.$axios.get(`http://localhost:5100/bde/selection/evaluation/status/${encodeURIComponent(selectionIdResult)}`)
        .then((response) => { this.bde_server_result_OEN_response = response.data; });
    },
  },
};
</script>

<style>

</style>
