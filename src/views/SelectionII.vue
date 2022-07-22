<template>
  <div class="selectionII">
    <button
      v-if="aSelTab === 'SelectionEvaluation'"
      @click="aSelTab = 'SelStart'"
    >
      Back
    </button>
    <button
      v-if="aSelTab === 'SelectionResultPG'"
      @click="aSelTab = 'SelectionEvaluation'"
    >
      Back
    </button>
    <button
      v-if="aSelTab === 'SelectionResultOEN'"
      @click="aSelTab = 'SelectionEvaluation'"
    >
      Back
    </button>
    <keep-alive>
      <SelectionResultOEN
        v-if="aSelTab === 'SelectionResultOEN'"
        :session_key_main="session_key_main"
        :core_mass_main="core_mass_main"
        :loadedData="loadedData"
      />
    </keep-alive>
    <keep-alive>
      <SelectionProductGroup
        v-if="aSelTab === 'SelectionResultPG'"
        @change-to-results-OEN="change($event)"
        @updateLoadedData="updateLoadedData($event)"
        :session_key_main="session_key_main"
        :core_mass_main="core_mass_main"
        :loadedData="loadedData"
      />
    </keep-alive>
    <SelectionEvaluation
      v-if="aSelTab === 'SelectionEvaluation'"
      @change-to-results-OEN="change($event)"
      @change-to-results-PG="change($event)"
      @core-mass="sendcoremasstochild($event)"
      :loadedData="loadedData"
      :session_key_main="session_key_main"
    />
    <keep-alive>
      <selection-start
        v-if="aSelTab === 'SelStart'"
        @change-evaluation="change($event)"
        @session-key="sendselectionidtochild($event)"
        @sendLoadedData="loadedData = $event"
        :loadedData2="loadedData"
      />
    </keep-alive>
    <!--loadedData2: storing data at $root, instead inside components,
      wouldn't have caused this line -->
    <!-- <keep-alive>
    <selection-start
    v-if="aSelTab === 'SelectionSensorInput'"
    :session_key_main="session_key_main"/>
  </keep-alive> -->
  </div>
</template>

<script>
import SelectionStart from "../components/SelectionStart.vue";
import SelectionEvaluation from "../components/SelectionEvaluation.vue";
import SelectionResultOEN from "../components/SelectionResultOEN.vue";
import SelectionProductGroup from "../components/SelectionProductGroup.vue";

export default {
  name: "SelectionII",
  components: {
    SelectionStart,
    SelectionEvaluation,
    SelectionProductGroup,
    SelectionResultOEN,
    // SelectionSensorInput
  },
  data() {
    return {
      aSelTab: "SelStart",
      session_key_main: "initializeID",
      core_mass_main: null,
      loadedData: {
        ID: "-", "Accept State": "-", "Box exists": "-", "Box code scanable": "-", Weight: 0
      }, // this is a single object loaded from /src/assets/Data/samples.json
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
    updateLoadedData(newData) {
      // newData = [NameOfValue, Value]
      this.loadedData[newData[0]] = newData[1];
    },
  },
};
</script>

<style src="../assets/styles/styles.css"></style>
