<template>
  <div>
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
    <p>Evaluation has started: {{ bde_server_start_response.evaluation_started }}</p>
    <p>Temporary selection id: {{ bde_server_start_response.temp_selection_id }}</p>
    <p>Task ID: {{ bde_server_start_response.task_id }}</p>
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
        core_mass: '4213',
        temp_selection_id: this.selection_id_main,
      },
      method: 'best',
      bde_server_start_response: '',
    };
  },
  methods: {
    SelectionEvaluation(method) {
      this.$axios.post(`http://localhost:5100/selection/evaluation/${encodeURIComponent(method)}`, this.form_data)
        .then((response) => { this.bde_server_start_response = response.data; });
    },
  },
};
</script>

<style>

</style>
