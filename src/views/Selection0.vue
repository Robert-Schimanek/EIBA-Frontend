<template>
  <div class="selection">
    <h1>This is the selection page</h1>
      <button @click="activeSelectionTab = 'SelectionStart'">Back   </button>
      <button @click="activeSelectionTab = 'SelectionStart'">Start   </button>
      <button @click="activeSelectionTab = 'SelectionEvaluation'">Evaluation  </button>
  <SelectionStart v-if="activeSelectionTab === 'SelectionStart'" />
  <SelectionEvaluation v-if="activeSelectionTab === 'SelectionEvaluation'" />
  </div>
</template>

<script>
import SelectionStart from '../components/SelectionStart.vue';
import SelectionEvaluation from '../components/SelectionEvaluation.vue';

export default {
  name: 'Selection',
  components: {
    SelectionStart,
    SelectionEvaluation,
  },
  data() {
    return {
      activeSelectionTab: 'SelectionStart',
    };
  },
};
</script>

<style>
</style>
