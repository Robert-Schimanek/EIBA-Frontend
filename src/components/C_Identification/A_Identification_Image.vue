<!-- Author: Kröger-->
<template>
  <div class="image">
    <p style="font-size: 10pt">{{ Image.slice(18) }}</p>
    <img :src="require(`../../assets/pictures${Image}.png`)"
    style="width: 100px; height: 100px"/>
  </div>
</template>

<script>
export default {
  props: {
    Image: { default: "No further Informations" },
  },
  methods: {
    init() {
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style src="../../assets/styles/styles.css"></style>

<style scoped>
.image {
    border: 2px solid black;
    border-radius: 5px;
    box-shadow: 2px 2px 10px gray;
}
</style>