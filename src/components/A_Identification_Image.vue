<!-- Author: Kröger-->
<!-- Component: A_Identification_Image.vue -->
<template>
  <div class="image">
    <p style="font-size: 10pt">{{ ImageType }}</p>
    <img :src="listImgPaths"
    :style="[ImageType == 'Left-View' ?
    {'transform': 'rotate(270deg)'} : {'transform': 'rotate(0deg)'}]"
    style="width: 150px; height: 150px"/>
  </div>
</template>

<script>
export default {
  props: {
    ImageType: { default: 'No further Informations' },
    listImgPaths: { default: 'https://cdn.pixabay.com/photo/2021/07/21/12/49/error-6482984_960_720.png' },
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
