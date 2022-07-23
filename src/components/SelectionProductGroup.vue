<template>
  <div id="centerDiv" style="display: flex; justify-content: center">
    <div id="mainDiv" align="center" style="display: flex">
      <div id="UpDown" style="width: 250px; margin-top: 300px" align="center">
        <button
          style="margin-bottom: 50px"
          class="bigButtonText"
          @click="countDown"
        >
          UP
        </button>
        <p></p>
        <button class="bigButtonText" @click="countUp">Down</button>
      </div>
      <div id="ListProductGroups">
        <h1 class="roundedContainer">Select product group</h1>

        <div
          class="grid-container"
          style="width: 700px; height: 700px"
          align="center"
        >
          <div
            class="item"
            v-for="[i, item] of Object.keys(bde_productGroupList).entries()"
            :key="i"
          >
            <display
              :productGroupName="item"
              v-if="i >= 4 * index && i < 4 * (index + 1)"
              @btnPressed="btnClicked"
            ></display>
          </div>
        </div>
      </div>
      <div id="ConfirmBtn" align="center" style="width: 120px">
        <button
          class="bigButtonText"
          id="confirmBtnPrdGroup"
          disabled="true"
          style="margin-top: 350px"
          @click="confirmed(), changeToResults(form_data.session_key)"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
  <p style="font-size: 40pt">Page {{ index + 1 }} / {{ highestPage + 1 }}</p>
</template>

<script>
import display from "./SelectionProductGroup_Display.vue";

export default {
  name: "SelectionProductGroup",
  props: ["session_key_main", "loadedData", "core_mass_main"],
  emits: ["updateLoadedData"],
  components: {
    display,
  },
  data() {
    return {
      form_data: {
        session_key: this.session_key_main,
        core_mass: this.core_mass_main,
      },
      prodGroups: [],
      index: 0,
      bde_productGroupList: [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
      ],
      bde_server_result: null,
      lenProdGroups: 0,
      highestPage: 0,
      currentActivatedBtn: null,
      text: "",
    };
  },
  methods: {
    changeToResults(sessionKey) {
      this.$emit("change-to-results-OEN", "SelectionResultOEN");
      this.$emit("session-key", sessionKey);
    },
    countUp() {
      if (this.index < this.highestPage) {
        this.index += 1;
        this.currentActivatedBtn = null;
        document.getElementById("confirmBtnPrdGroup").disabled = true;
      }
    },
    countDown() {
      if (this.index > 0) {
        this.index -= 1;
        this.currentActivatedBtn = null;
        document.getElementById("confirmBtnPrdGroup").disabled = true;
      }
    },
    updateVariablesOfPage() {
      this.lenProdGroups = Object.keys(this.bde_productGroupList).length;
      if (this.lenProdGroups % 4 !== 0) {
        this.highestPage = Math.floor(this.lenProdGroups / 4);
      } else {
        this.highestPage = Math.floor(this.lenProdGroups / 4) - 1;
      }

      // stuff for reload
      if (this.currentActivatedBtn !== null) {
        document
          .getElementById(this.currentActivatedBtn)
          .classList.remove("active");
        this.currentActivatedBtn = null;
        document.getElementById("confirmBtnPrdGroup").disabled = true;
      }
      this.index = 0;
    },
    btnClicked(newButtonId) {
      if (this.currentActivatedBtn != null) {
        // One Button is active
        document
          .getElementById(this.currentActivatedBtn)
          .classList.remove("active");
        console.log("active null");

        if (this.currentActivatedBtn === newButtonId) {
          // clicked same button twice
          this.currentActivatedBtn = null;
          console.log("same");
          document.getElementById("confirmBtnPrdGroup").disabled = true;
        } else {
          // A new btn is clicked
          this.currentActivatedBtn = newButtonId;
          document.getElementById("confirmBtnPrdGroup").disabled = false;
        }
      } else {
        this.currentActivatedBtn = newButtonId;
        document.getElementById("confirmBtnPrdGroup").disabled = false;
      }
    },
    confirmed() {
      console.log(`${this.currentActivatedBtn} selected`);
      this.$emit("updateLoadedData", [
        "Product Group from ID",
        this.currentActivatedBtn,
      ]);
    },
    startEvalProdGroup() {
      console.log("evaluation/SS");
      this.$axios
        .post(
          `http://localhost:5100/bde/selection/evaluation/${encodeURIComponent(
            "SS"
          )}`,
          this.form_data
        )
        .then((response) => {
          this.bde_server_start_response = response.data;
          this.getEvalutationProdGroup();
        });
    },
    getEvalutationProdGroup() {
      this.$axios
        .get(
          `http://localhost:5100/bde/selection/evaluation/status/${encodeURIComponent(
            this.session_key_main
          )}`
        )
        .then((res) => {
          this.bde_productGroupList = ["XXX"];
          this.bde_productGroupList =
            res.data.product_group_prediction_list.ProductGroupProbaList;
          this.updateVariablesOfPage();
        });
    },
  },
  mounted() {},
  activated() {
    this.updateVariablesOfPage();
    this.startEvalProdGroup();
  },
};
</script>

<style src='../assets/styles/styles.css'></style>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: auto auto;
  gap: 10px;
  padding: 10px;
}

.item {
  text-align: center;
  font-size: 30px;
}
</style>
