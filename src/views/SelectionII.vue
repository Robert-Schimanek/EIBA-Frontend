<template>
  <div class="selectionII">
      <button v-if="aSelTab === 'SelectionEvaluation'" @click="aSelTab = 'SelStart'">Back</button>
      <button v-if="aSelTab === 'SelectionResultPG'" @click="aSelTab = 'SelectionEvaluation'">
      Back</button>
      <button v-if="aSelTab === 'SelectionResultOEN'" @click="aSelTab = 'SelectionEvaluation'">
      Back</button>
  <keep-alive>
    <SelectionResultOEN
    v-if="aSelTab === 'SelectionResultOEN'"
    :session_key_main="session_key_main"
    :core_mass_main="core_mass_main"/>
  </keep-alive>
  <keep-alive>
    <SelectionProductGroup
    v-if="aSelTab === 'SelectionResultPG'"
    @change-to-results-OEN="change($event)"
    :session_key_main="session_key_main"
    :core_mass_main="core_mass_main"/>
  </keep-alive>
    <SelectionEvaluation
    v-if="aSelTab === 'SelectionEvaluation'"
    @change-to-results-OEN="change($event)"
    @change-to-results-PG="change($event)"
    @core-mass="sendcoremasstochild($event)"
    :session_key_main="session_key_main"/>
  <keep-alive>
    <selection-start
    v-if="aSelTab === 'SelStart'"
    @change-evaluation="change($event)"
    @session-key="sendselectionidtochild($event)"/>
  </keep-alive>
  <!-- <keep-alive>
    <selection-start
    v-if="aSelTab === 'SelectionSensorInput'"
    :session_key_main="session_key_main"/>
  </keep-alive> -->
  </div>
</template>

<script>
import SelectionStart from '../components/SelectionStart.vue';
import SelectionEvaluation from '../components/SelectionEvaluation.vue';
import SelectionResultOEN from '../components/SelectionResultOEN.vue';
import SelectionProductGroup from '../components/SelectionProductGroup.vue';

export default {
  name: 'SelectionII',
  components: {
    SelectionStart,
    SelectionEvaluation,
    SelectionProductGroup,
    SelectionResultOEN,
    // SelectionSensorInput
  },
  data() {
    return {
      aSelTab: 'SelStart',
      session_key_main: 'initializeID',
      core_mass_main: null,
    };
  },
  methods: {
    change(updatedStuff) {
      this.aSelTab = updatedStuff;  
    },
    sendselectionidtochild(updatedStuff) {
      this.session_key_main = updatedStuff;
    },
    sendcoremasstochild(updatedStuff) {
      this.core_mass_main = updatedStuff;
    },
  },
};
</script>

<style>
</style>
