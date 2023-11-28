<script setup>
import FrontView from './views/FrontView.vue';
import FrontNavbar from './components/FrontNavbar.vue';
import FrontFooter from './components/FrontFooter.vue';
</script>

<template>
  <FrontNavbar />
  <FrontView />
  <FrontFooter />
</template>
<style>
img {
  max-width: 100%;
  height: auto;
}
</style>
