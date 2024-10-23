<template>
  <div class="app">
    <div v-if="!shouldHideNavbar">
      <!-- Navbar pour les écrans larges -->
      <NavigationBar class="block md:hidden"></NavigationBar>
      <!-- NavbarMobile pour les écrans petits -->
      <NavigationBarMobile class="hidden md:block"></NavigationBarMobile>
    </div>
    <router-view @route-changed="onRouteChanged" />
    <div v-if="!shouldHideFooter">
      <Footer @openCookieSettings="openCookieSettings" />
    </div>
    <CookieBanner ref="cookieBanner" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import NavigationBar from './components/NavigationBar.vue';
import NavigationBarMobile from './components/NavigationBarMobile.vue';
import Footer from './components/Footer.vue';
import CookieBanner from './components/CookieBanner.vue';

const route = useRoute();
const shouldHideNavbar = ref(false);
const shouldHideFooter = ref(false);
const cookieBanner = ref(null);

const onRouteChanged = () => {
  // Cacher la navbar et le footer si la route est '/' ou commence par '/backoffice'
  shouldHideNavbar.value = route.path === '/' || route.path.startsWith('/backoffice');
  shouldHideFooter.value = route.path.startsWith('/backoffice');
};

// Initial check on component mount
onRouteChanged();

// Watch for route changes
watch(route, onRouteChanged);

// Correct way to open the cookie banner
const openCookieSettings = () => {
  cookieBanner.value.isVisible = true;
};

</script>

<style lang="tailwindcss">
</style>
