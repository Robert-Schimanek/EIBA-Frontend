<template>
  <div>
    <form @submit.prevent='SelectionStart'>
      <div>
        <label for="customer_number">Post customer number</label>
        <input
          type="text"
          id="customer_number"
          v-model="form_data.customer_number"
          placeholder="WIN44">
      </div>
      <div>
        <label for="box">Usually a barcode is printed on the package.
        This barcode stands for a 13 digit european aritcle number (EAN).
        Retrieve the EAN and enter it. </label>
        <v-select
        v-model='box'
        :options='boxinfos'
        label='bar_code'
        placeholder="Enter EAN box code" />
        <input type="hidden" id="box" v-model="box">
      </div>
      <div>
        <label for="temp_selection_id">Each inspection is a unique process.
        Assign a unique identifier (Selection ID) to this operation to initialize
        the operation in the system.</label>
        <input
          type="text"
          id="temp_selection_id"
          v-model="form_data.temp_selection_id"
          placeholder="Enter insepection ID">
      </div>
      <button @click="form_data.bar_code = box.bar_code">Check prediction models</button>
    </form>
  </div>
  <div>
    <div v-if="form_data.temp_selection_id==bde_server_start_response.temp_selection_id">
      <p>Customer is known to the prediction model:</p>
      <p>{{ bde_server_start_response.customer_known }}</p>
      <p>Box Code is known to the prediction model:</p>
      <p>{{ bde_server_start_response.bar_code_known }}</p>
      <p>Temporary selection ID: {{ bde_server_start_response.temp_selection_id }}</p>
    </div>
    <div v-if="box.bar_code">
      <div v-if="box.image_thumbnail">
        <p>The EAN box code {{ box.bar_code }}
        is associated with a core similar to the image:</p>
        <img v-bind:src="box.image_thumbnail"/>
      </div>
    </div>
  </div>
  <div v-if="form_data.temp_selection_id==bde_server_start_response.temp_selection_id">
    <button
      @click="changeEvaluation(bde_server_start_response.temp_selection_id)">
        Put core on scale
    </button>
  </div>
  <div v-if="form_data.temp_selection_id=='ProcessCompleted'">
    <button @click="goToHome()"> Go to Home </button>
  </div>
  </template>

<script>
import boxLinks from '../assets/bar_code.json';
import boxInfos from '../assets/bar_code_list.json';

export default {
  name: 'SelectionStart',
  data() {
    return {
      box: '',
      form_data: {
        customer_number: '',
        bar_code: '',
        temp_selection_id: '',
      },
      bde_server_start_response: '',
      boxlinks: boxLinks,
      boxinfos: boxInfos,
      selected: '',
    };
  },
  emits: ['change-evaluation'],
  methods: {
    SelectionStart() {
      this.$axios.post('http://localhost:5100/bde/selection/start', this.form_data)
        .then((response) => { this.bde_server_start_response = response.data; });
    },
    goToHome() {
      this.$router.push('/');
    },
    changeEvaluation1() {
      this.$emit('change-evaluation', 'SelectionEvaluation');
    },
    changeEvaluation(selectionID) {
      this.$emit('change-evaluation', 'SelectionEvaluation');
      this.$emit('selection-id', selectionID);
    },
    emitSelectionid(selectionID) {
      this.$emit('selection-id', selectionID);
    },
  },
};

</script>

<style>

</style>
