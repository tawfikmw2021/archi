<script lang="ts">
import { ref } from "vue";
import { graphState } from "./context/graphState";
import { checker } from "three/examples/jsm/nodes/Nodes.js";

export default {
  name: "GroupRenderer",
  props: ["parent"],
  data: function () {
    return {
      graphState: graphState,
      graphContainer: ref(null),
    };
  },
  mounted() {},
  methods: {
    testc() {
      console.log("container", this.graphContainer);
    },
  },
};
</script>

<template>
  <div class="group-container">
    <template v-for="child in parent?.children">
      <div
        v-if="child.type == 'Mesh'"
        @click="graphState.objectSelectedChange(child)"
        class="mesh cliquable"
      >
        child {{ child.uuid.slice(0, 5) }}
      </div>
    </template>
    <template v-for="group in parent?.children">
      <div v-if="group.type == 'Group'">
        <div
          v-if="group.type == 'Group'"
          @click="graphState.objectSelectedChange(group)"
          class="group cliquable"
        >
          group {{ group.uuid.slice(0, 5) }}
        </div>
        <GroupRenderer :parent="group"></GroupRenderer>
      </div>
    </template>
  </div>
</template>

<style scoped>
.group-container {
  padding-left: 0.7rem;
}
.mesh {
  font-size: small;
  color: antiquewhite;
}
.group {
  color: aliceblue;
}

.cliquable {
  cursor: pointer;
}
.cliquable:active {
  background-color: blueviolet;
}
</style>
