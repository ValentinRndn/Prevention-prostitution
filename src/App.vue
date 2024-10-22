<template>
  <div class="app">
    <div v-if="!shouldHideNavbar">
      <!-- Navbar pour les écrans larges -->
      <NavigationBar class="block md:hidden"></NavigationBar>
      <!-- NavbarMobile pour les écrans petits -->
      <NavigationBarMobile class="hidden md:block"></NavigationBarMobile>
    </div>
    <router-view @route-changed="onRouteChanged" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import NavigationBar from './components/NavigationBar.vue';
import NavigationBarMobile from './components/NavigationBarMobile.vue';
import Footer from './components/Footer.vue';
// import AdminBar from './components/backOffice/AdminBar.vue'
import HorizontalBar from './components/backOffice/HorizontalBar.vue';

const route = useRoute();
const shouldHideNavbar = ref(false);

const onRouteChanged = () => {
  // Vérifie si le chemin de la route est '/' ou commence par '/backoffice'
  shouldHideNavbar.value = route.path === '/' || route.path.startsWith('/backoffice');
};

// Initial check on component mount
onRouteChanged();

// Watch for route changes
watch(route, onRouteChanged);
</script>

<style lang="tailwindcss">
</style>
