<template>
  <div>
    <form @submit.prevent='SelectionStart'>
      <div>
        <label for="customer_number">Post customer number</label>
        <input
          type="text"
          id="customer_number"
          v-model="form_data.customer_number"
          placeholder="43016357">
      </div>
      <!-- <div>
        <label for="box">Usually a barcode is printed on the package.
        This barcode stands for a 13 digit european article number (EAN).
        Retrieve the EAN and enter it. </label>
        <v-select
        v-model='box'
        :options='boxinfos'
        label='bar_code'
        placeholder="Enter EAN box code" />
        <input type="hidden" id="box" v-model="box">
      </div> -->
      <div>
        <!-- Shows all barcodes
          <p v-for="boxinfo in boxinfos" v-bind:key="boxinfo.bar_code">
          EAN: {{boxinfo.bar_code}}
        </p> -->
        <p>EAN: {{selected_EAN}}</p>
        <p>EAN: {{form_data.bar_code}}</p>
      </div>
      <!-- <div>
        <label for="session_key">Each inspection is a unique process.
        Assign a unique identifier (Selection ID) to this operation to initialize
        the operation in the system.</label>
        <input
          type="text"
          id="session_key"
          v-model="form_data.session_key"
          placeholder="Enter insepection ID">
      </div> -->
      <div>
        <p>Each inspection is a unique process.
        Generate a unique identifier (Selection ID) to this operation to initialize
        the operation in the system.</p>
        <!-- <button @click="form_data.session_key=generateID()">Generate ID</button>-->
        <p>Selection ID: {{random_ID}}</p>
      </div>

      <div style="display: flex;">
        <SelectionOrderData></SelectionOrderData>
        <div style="position: absolute; top: 50%;"></div>
        <div style="display: flex; align-items: center; padding-left: 20px;">
            <button style="border-radius:10px;"
            @click="form_data.session_key=generateID();randomEAN(boxinfos)">
            <img src="../assets/pictures/BarcodeScanner.png" alt="BARCODE BUTTON"
            style="width:200px">
            </button>
        </div>

        <div style="display: flex; padding-left: 20px; align-items: flex-end;">
          <div>
            <button class="bigButtonText" style="width: 170px; "
            @click="form_data.session_key=generateID();form_data.bar_code = 'empty'"
            >NO BOX</button>
            <p style="font-size:40px"></p>
            <button class="bigButtonText" style="width: 170px;
            vertical-align: baseline;"
            @click="form_data.session_key=generateID();form_data.bar_code = 'empty'" >
            NO BARCODE</button>
          </div>
        </div>

      </div>

    </form>
  </div>
  <div>
    <div v-if="form_data.session_key==bde_server_start_response.session_key">
      <p>Customer is known to the prediction model:</p>
      <p>{{ bde_server_start_response.customer_known }}</p>
      <p>Bar code on package box ({{ form_data.bar_code }}) is known to the prediction model:</p>
      <p>{{ bde_server_start_response.bar_code_known }}</p>
      <p>Temporary selection ID: {{ bde_server_start_response.session_key }}</p>
    </div>
    <div v-if="box.bar_code">
      <div v-if="box.image_thumbnail">
        <p>The EAN box code {{ box.bar_code }}
        is associated with a core similar to the image:</p>
        <img v-bind:src="box.image_thumbnail"/>
      </div>
    </div>
  </div>
  <div v-if="form_data.session_key==bde_server_start_response.session_key">
    <button
      @click="changeEvaluation(bde_server_start_response.session_key)">
        Put core on scale
    </button>
  </div>
  <div v-if="form_data.session_key=='ProcessCompleted'">
    <button @click="goToHome()"> Go to Home </button>
  </div>
  </template>

<script>
import boxLinks from '../assets/bar_code.json';
import boxInfos from '../assets/bar_code_list.json';
import SelectionOrderData from './SelectionOrderData.vue';

export default {
  name: 'SelectionStart',
  data() {
    return {
      box: '',
      form_data: {
        customer_number: '43016357',
        bar_code: '',
        bar_code_scanable: 'Y',
        box_exists: 'Y',
        program: 'IAM gesamt',
        session_key: '',
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
    changeEvaluation(selectionID) {
      this.$emit('change-evaluation', 'SelectionEvaluation');
      this.$emit('selection-id', selectionID);
    },
    emitSelectionid(selectionID) {
      this.$emit('selection-id', selectionID);
    },
    generateID() {
      this.random_ID = Math.floor(Math.random() * 1000000000000).toString();
      return this.random_ID;
    },
    // getBoxInfo() {
    //   $.getBoxInfo('../assets/bar_code_list.json', function (boxinfos) {
    //    this.boxinfos = boxinfos;
    //   }.bind(this));
    // },
    // emitBoxInfos(boxinfos) {
    //   this.$emit('box-infos', boxInfos);
    // },
    randomEAN(boxinfos) {
      const randomIndex = Math.floor(Math.random() * boxinfos.length);
      // this.selected_EAN = boxinfos[randomIndex].bar_code;
      this.form_data.bar_code = boxinfos[randomIndex].bar_code;
    },
  },
  mounted() {
    console.log('the component is now mounted.');
    this.randomEAN(boxInfos);
  },
  components: {
    SelectionOrderData,
  },
};

</script>

<style>

</style>
