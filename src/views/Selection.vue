<template>
  <div class="selection">
      <button v-if="aSelTab === 'SelectionEvaluation'" @click="aSelTab = 'SelStart'">Back</button>
  <keep-alive>
    <SelectionResultOEN
    v-if="aSelTab === 'SelectionResultOEN'"
    :selection_id_main="selection_id_main"
    :core_mass_main="core_mass_main"/>
  </keep-alive>
  <keep-alive>
    <SelectionEvaluation
    v-if="aSelTab === 'SelectionEvaluation'"
    @change-to-results-OEN="change($event)"
    @core-mass="sendcoremasstochild($event)"
    :selection_id_main="selection_id_main"/>
  </keep-alive>
  <keep-alive>
    <selection-start
    v-if="aSelTab === 'SelStart'"
    @change-evaluation="change($event)"
    @selection-id="sendselectionidtochild($event)"/>
  </keep-alive>
  <!-- <keep-alive>
    <selection-start
    v-if="aSelTab === 'SelectionSensorInput'"
    :selection_id_main="selection_id_main"/>
  </keep-alive> -->
  </div>
</template>

<script>
import SelectionStart from '../components/SelectionStart.vue';
import SelectionEvaluation from '../components/SelectionEvaluation.vue';
import SelectionResultOEN from '../components/SelectionResultOEN.vue';

export default {
  name: 'Selection',
  components: {
    SelectionStart,
    SelectionEvaluation,
    SelectionResultOEN,
    // SelectionSensorInput
  },
  data() {
    return {
      aSelTab: 'SelStart',
      selection_id_main: 'initializeID',
      core_mass_main: null,
    };
  },
  methods: {
    change(updatedStuff) {
      this.aSelTab = updatedStuff;
    },
    sendselectionidtochild(updatedStuff) {
      this.selection_id_main = updatedStuff;
    },
    sendcoremasstochild(updatedStuff) {
      this.core_mass_main = updatedStuff;
    },
  },
};
</script>

<style>
</style>
