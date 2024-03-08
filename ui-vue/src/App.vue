<script setup lang="ts">
//import HelloWorld from './components/HelloWorld.vue'
import ArchRenderer from "./components/ArchRenderer.vue";
</script>

<template>
  <div class="renderer">
    <ArchRenderer msg="Vite + Vue" />
  </div>
</template>

<style scoped>
.renderer {
  position: absolute;
  width: 20vw;
  z-index: 5;
  height: 200px;
  min-width: 150px;
  bottom: 0;
  right: 0;
  background-color: black;
}
</style>
