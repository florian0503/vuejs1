<script setup>
import { RouterView } from 'vue-router'
import MainNav from './components/MainNav.vue'
</script>

<template>
  <MainNav />
  <main class="content-wrapper">
    <RouterView />
  </main>
</template>

<style scoped>
.content-wrapper {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
