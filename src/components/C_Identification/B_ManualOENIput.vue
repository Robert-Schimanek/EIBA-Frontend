<!-- this component is used to manually input the oen number
The oen is saved after the press of the continue button
inside this.$root.returnpartInfo.oenNumber-->
<template>
  <div style="align-items: center">
    <h1>Manual input of OEN Number</h1>
    <p></p>
    <input type="text" v-model="oen" placeholder="Input OEN here" />
    <p></p>
    <button @click="confirmOEN">Confirm</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oen: "",
    };
  },
  methods: {
    confirmOEN() {
      // set oenNumber in $root and go back to the startpage
      this.$root.returnpartInfo.oenNumber = this.oen;
      this.$emit("changeComponent", "startPage");
    },
  },
};
</script>

<style>

</style>