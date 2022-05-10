<template>
  <div class="selection">
      <button v-if="aSelTab === 'SelectionEvaluation'" @click="aSelTab = 'SelStart'">Back</button>
    <keep-alive>
    <SelectionEvaluation
    v-if="aSelTab === 'SelectionEvaluation'"
    :selection_id_main="selection_id_main"/>
  </keep-alive>
  <keep-alive>
    <selection-start
    v-if="aSelTab === 'SelStart'"
    @change-evaluation="change($event)"
    @selection-id="sendselectionidtochild($event)"/>
  </keep-alive>
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
      aSelTab: 'SelStart',
      selection_id_main: '567',
    };
  },
  methods: {
    change(updatedStuff) {
      this.aSelTab = updatedStuff;
    },
    sendselectionidtochild(updatedStuff) {
      this.selection_id_main = updatedStuff;
    },
  },
};
</script>

<style>
</style>
