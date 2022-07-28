<!-- WICHTIG:
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

Wenn später die Daten nicht mehr aus der JSON geladen werden sollen müssen an einigen Stellen
":disabled= [...]" entfernt werden. Ansonsten lassen sich einige Buttons nicht drücken!

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-->
<template>
  <div id="no_put_scale" style="margin-bottom: 2%">
    <div id="BarcodeBtn" v-if="form_data.bar_code">
      <button style="width: 10%" @click="loadRandomExistingEAN">
        <VueBarcode
          v-bind:value="loadedData.EAN13"
          :options="{ displayValue: true }"
          style="width: 95%"
        >
        </VueBarcode>
      </button>
    </div>
    <form @submit.prevent="SelectionStart">
      <p class="headerText">
        Click the barcode to simulate the pickup of a core
      </p>

      <div id="TableWithInfos" class="debugInfo">
        <table
          align="center"
          style="margin-bottom: 25px; margin-top: 25px"
          class="infoText"
        >
          <caption class="smallHeaderText">
            loadedData
          </caption>
          <tr>
            <th align="left" width="150px">Selection ID:</th>
            <td align="left">{{ loadedData.ID }}</td>
            <th align="left" width="150px" style="padding-left: 15px">
              Barcode scan:
            </th>
            <td align="left" width="250px">
              {{
                loadedData["Box code scanable"] === "Y"
                  ? loadedData.EAN13
                  : "No barcode"
              }}
            </td>
            <th align="left" width="220px">loaded rnd ID:</th>
            <td align="left" width="200px">{{ loadedData.randomID }}</td>
          </tr>
          <tr>
            <th align="left" width="150px">Accept state:</th>
            <td align="left">{{ loadedData["Accept State"] }}</td>
            <th align="left" width="200px" style="padding-left: 15px">
              prod group:
            </th>
            <td align="left" width="200px">
              {{ loadedData["Product Group from ID"] }}
            </td>
          </tr>
          <tr>
            <th align="left" width="150px">Box:</th>
            <td align="left">
              {{ loadedData["Box exists"] === "Y" ? "Exists" : "No box" }}
            </td>
            <th align="left" width="150px" style="padding-left: 15px">
              Pic exist:
            </th>
            <td align="left" width="75px">
              {{ loadedData["Cam Images"] !== null ? "Exists" : "No pic" }}
            </td>
          </tr>
        </table>

        <table
          align="center"
          style="margin-bottom: 25px; margin-top: 25px"
          class="infoText"
        >
          <caption class="smallHeaderText">
            Prediction model
          </caption>
          <th align="left" width="300px">Customer known:</th>
          <td align="left" width="150px">
            {{
              form_data.session_key == bde_server_start_response.session_key
                ? bde_server_start_response.customer_known
                : "not loaded"
            }}
          </td>
          <th align="left" width="250px">Barcode known:</th>
          <td align="left" width="150px">
            {{
              form_data.session_key == bde_server_start_response.session_key
                ? bde_server_start_response.bar_code_known
                : "not loaded"
            }}
          </td>
        </table>
        <p>Load specific Data:</p>
        <button @click="loadDataWithIndex(188)">No ean</button>
        <button @click="loadDataWithIndex(184)">No Pic</button>
      </div>

      <div
        id="Barcode_OrderData"
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        "
      >
        <SelectionOrderData
          @updateloadedData="updateLoadedData"
          :jsonObject="loadedData"
          style="margin-right: 5%; width: 30%"
        ></SelectionOrderData>
        <button
          style="border-radius: 30px; height: 400px; margin-right: 5%"
          @click="
            form_data.session_key = generateID();
            updateFormData();
          "
          :disabled="
            loadedData[`Box code scanable`] === '-' ||
            loadedData[`Box code scanable`] === 'N'
          "
        >
          <img
            src="../assets/pictures/BarcodeScanner.png"
            alt="BARCODE BUTTON"
            style="height: 90%"
          />
        </button>

        <div id="NoBox_NoBarcode" style="align-items: center">
          <button
            class="bigButtonText"
            style="width: 260px"
            @click="
              form_data.session_key = generateID();
              form_data.bar_code = 'empty';
              loadedData[`Box exists`] = 'N';
            "
            :disabled="
              loadedData[`Box exists`] === '-' ||
              loadedData[`Box exists`] === 'Y'
            "
          >
            NO BOX
          </button>
          <p class="headerText"></p>
          <button
            class="bigButtonText"
            style="width: 260px; vertical-align: baseline"
            :disabled="
              loadedData[`Box code scanable`] === '-' ||
              loadedData[`Box code scanable`] === 'Y'
            "
            @click="
              form_data.session_key = generateID();
              form_data.bar_code = 'empty';
              loadedData['Box code scanable'] = 'N';
              loadedData['Box code known'] = 'N';
              updateFormData();
            "
          >
            NO BARCODE
          </button>
        </div>
      </div>
    </form>
  </div>
  <div>
    <div v-if="box.bar_code">
      <div v-if="box.image_thumbnail">
        <p>
          The EAN box code {{ box.bar_code }} is associated with a core similar
          to the image:
        </p>
        <img v-bind:src="box.image_thumbnail" />
      </div>
    </div>
  </div>

  <p class="smallHeaderText">
    Status:
    {{
      form_data.session_key === ""
        ? "Waiting for Scan, NO BOX or BARCODE"
        : "Place core on scale"
    }}
  </p>
  <button
    class="bigButtonText"
    @click="changeEvaluation(bde_server_start_response.session_key)"
    :disabled="form_data.session_key !== bde_server_start_response.session_key"
  >
    Put core on scale
  </button>

  <div v-if="form_data.session_key == 'ProcessCompleted'">
    <button @click="goToHome()">Go to Home</button>
  </div>
  <button class="collapsible" @click="toggleDebug">Open debug info</button>
  <input
    type="checkbox"
    name="Expertenmodus"
    id="Expertenmodus"
    v-model="expertModus"
    style="transform: scale(2)"
  />
  <label class="infoText" for="Expertenmodus"> Expertenmodus</label>
</template>

<script>
import VueBarcode from "@chenfengyuan/vue-barcode";
import boxLinks from "../assets/bar_code.json";
import boxInfos from "../assets/bar_code_list.json";
import SelectionOrderData from "./SelectionOrderData.vue";
import demoData from "../assets/Data/sample.json";

export default {
  name: "SelectionStart",
  props: ["loadedData2"],
  watch: {
    loadedData2(newVal, oldVal) {
      this.loadedData = newVal;
    },
  },
  data() {
    return {
      box: "",
      form_data: {
        customer_number: "",
        bar_code: "",
        bar_code_scanable: "Y",
        box_exists: "Y",
        program: "IAM gesamt",
        session_key: "",
      },
      bde_server_start_response: "",
      boxlinks: boxLinks,
      boxinfos: boxInfos,
      selected: "",
      expertModus: false,
      loadedData: {
        ID: "-",
        "Accept State": "-",
        "Box exists": "-",
        "Box code scanable": "-",
        "Cam Images": null,
        randomID: "-",
      }, // this is a single object loaded from /src/assets/Data/samples.json
    };
  },
  emits: ["change-evaluation", "session-key", "sendLoadedData"],
  methods: {
    SelectionStart() {
      this.$axios
        .post("http://localhost:5100/bde/selection/start", this.form_data)
        .then((response) => {
          this.bde_server_start_response = response.data;
        });
    },
    goToHome() {
      this.$router.push("/");
    },
    changeEvaluation(sessionKey) {
      this.$emit("change-evaluation", "SelectionEvaluation");
      this.$emit("session-key", sessionKey);
      this.$emit("sendLoadedData", this.loadedData); // used for SelectionII
    },
    emitSelectionid(sessionKey) {
      this.$emit("session-key", sessionKey);
    },
    generateID() {
      this.random_ID = Math.floor(Math.random() * 1000000000000).toString();
      this.loadedData.randomID = this.random_ID;
      return this.random_ID;
    },
    randomEAN(boxinfos) {
      const randomIndex = Math.floor(Math.random() * boxinfos.length);
      this.form_data.bar_code = boxinfos[randomIndex].bar_code;
    },
    loadRandomExistingEAN() {
      this.form_data.session_key = "";
      const randomIndex = Math.floor(
        Math.random() * Object.keys(demoData).length
      );

      if (demoData[randomIndex].EAN13 === "empty") {
        console.log("EMTPY!!!");
        this.loadDataWithIndex(randomIndex);
      } else {
        this.loadDataWithEAN13(demoData[randomIndex].EAN13);
      }
    },
    loadDataWithEAN13(EAN) {
      for (let [key, value] of Object.entries(demoData)) {
        if (value.EAN13 === EAN) {
          console.log(
            `FIRST! hit for${EAN} found in samples.json for key ${key}`
          );
          this.loadedData = value;
          break;
        }
      }
    },
    loadDataWithIndex(index) {
      this.loadedData = demoData[index];
    },
    updateLoadedData(newData) {
      // newData = [NameOfValue, Value]
      console.log(`Data0: ${newData[0]}`);
      console.log(`Data1: ${newData[1]}`);
      this.loadedData[newData[0]] = newData[1];
    },
    updateFormData() {
      this.form_data.customer_number = this.loadedData["Customer Number"];
      this.form_data.bar_code = this.loadedData.EAN13;
      this.form_data.bar_code_scanable = this.loadedData["Box code scanable"];
      this.form_data.box_exists = this.loadedData["Box exists"];
      this.form_data.program = this.loadedData.Program;
    },
    toggleDebug() {
      let content = document.getElementsByClassName("debugInfo")[0];
      if (content.style.display === "flex") {
        content.style.display = "none";
      } else {
        content.style.display = "flex";
      }
    },
  },
  mounted() {
    console.log("the component is now mounted.");
    this.randomEAN(boxInfos);
  },
  components: {
    SelectionOrderData,
    VueBarcode,
  },
};
</script>
<style src="../assets/styles/styles.css"></style>
<style scoped>
.debugInfo {
  display: none;
}
.collapsible {
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
}
.input {
  transform : scale(3)

}
</style>
