<!-- Author: Kröger-->
<template>
  <div class="image">
    <p style="font-size: 10pt">{{ ImageType }}</p>
    <img :src="`http://localhost:5800/EIBA/Images/05_27_2022/2205276020032.zip/Part_2205276020032_Left_Color_1653632160018.jpg`"
    style="width: 100px; height: 100px"/>
  </div>
</template>

<script>
export default {
  props: {
    ImageType: { default: 'No further Informations' },
    ID: { default: 'NO ID' },
    ImageLink: { default: ' ' },
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

<style src='../assets/styles/styles.css'></style>

<style scoped>
.image {
    border: 2px solid black;
    border-radius: 5px;
    box-shadow: 2px 2px 3px gray;
}
</style>
