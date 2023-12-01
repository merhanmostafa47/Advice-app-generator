<template>
  <v-app>
    <v-main>
      <advice-card />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import AdviceCard from './components/AdviceCard.vue';

onMounted(() => {
  document.documentElement.setAttribute('data-theme', 'dark');
});
</script>

<style lang="scss" scoped>
.v-application {
  background: var(--v-theme-background);

  .v-main {
    @include flexCenterAlignment;
    padding: 1.5rem;
  }
}
</style>