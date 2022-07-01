<template>
  <button @click="createButton">Create</button>
  <div id="Liste">
    <p>New Buttons:</p>
    <component
      v-for="(item, index) in componentList"
      :is="item.name"
      :key="index"
      @remove="removeMe(index)"
    >
    </component>
  </div>
</template>

<script>
import created from "./CreatedButtons.vue";

export default {
  methods: {
    createButton() {
      this.componentList.push({
        name: "created",
      });
    },
    removeMe(index) {
      this.componentList.splice(index, 1);
    },
  },
  data() {
    return {
      componentList: [],
    };
  },
  components: {
    created,
  },
};
</script>

<style>

</style>