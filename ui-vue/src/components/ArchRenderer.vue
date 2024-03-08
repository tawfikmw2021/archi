<script lang="ts">
import { ref } from "vue";
import { graphState } from "./context/graphState";
import GroupRenderer from "./GroupRenderer.vue";
import { Scene } from "three";

const graphContainer = ref(null);
export default {
  components: {
    GroupRenderer,
  },

  data: function () {
    return {
      graphState: graphState,
      graphContainer: ref(null),
    };
  },
  methods: {},
};
</script>

<template>
  <div class="d-flex flex-column">
    <div>
      <label :style="{ color: 'red' }"> type mesh</label>
      <input type="checkbox" v-model="graphState.editModeMesh" />
    </div>
    <button style="background-color: red" @click="graphState.addObj()">
      add Mesh
    </button>
    <div style="overflow: auto" v-if="graphState.test">
      <GroupRenderer :parent="graphState.test.scene"></GroupRenderer>
    </div>
  </div>
</template>

<style scoped></style>
