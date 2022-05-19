<template>
  <div>
    <form @submit.prevent='SelectionSensorInput'>
    <div>
        <label for="box">Put core on center of scale and remove your hands from core</label>
    </div>
    </form>
  </div>
</template>

<script>

export default {
  name: 'SelectionSensorInput',
  data() {
    return {
      box: ''
      form_data: {
        bar_code_scanable: 'Y',
        box_exists: 'Y',
      },
      bde_server_start_response: ''
      }
    };
  // emits: ['change-evaluation'],
  methods: {
  },
};

</script>

<style>

</style>
