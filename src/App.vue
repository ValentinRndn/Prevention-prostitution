<template>
  <div class="app">
    <div v-if="!shouldHideNavbar">
      <!-- Navbar pour les écrans larges -->
      <NavigationBar class="block max-md:hidden"></NavigationBar>
      <!-- NavbarMobile pour les écrans petits -->
      <NavigationBarMobile class="hidden max-md:block"></NavigationBarMobile>
    </div>

    <router-view @route-changed="onRouteChanged" />

    <!-- Modal de session expirée -->
    <div v-if="showSessionExpiredModal" 
         class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <h2 class="text-xl font-bold mb-4">Session expirée</h2>
        <p class="mb-4">{{ sessionExpiredMessage }}</p>
        <div class="flex justify-end">
          <button @click="handleReconnect" 
                  class="bg-purple-fonce text-white px-4 py-2 rounded hover:bg-purple-800">
            Se reconnecter
          </button>
        </div>
      </div>
    </div>

    <div v-if="!shouldHideFooter">
      <Footer @openCookieSettings="openCookieSettings" />
    </div>

    <CookieBanner ref="cookieBanner" class="z-100" />

    <div v-if="!shouldHideFooter">
      <EmergencyContactPopup class="z-100" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import NavigationBar from "./components/NavigationBar.vue";
import NavigationBarMobile from "./components/NavigationBarMobile.vue";
import Footer from "./components/Footer.vue";
import CookieBanner from "./components/CookieBanner.vue";
import EmergencyContactPopup from "./components/EmergencyContactPopup.vue";


const route = useRoute();
const router = useRouter();
const shouldHideNavbar = ref(false);
const shouldHideFooter = ref(false);
const shouldHideContactPopup = ref(false);
const cookieBanner = ref(null);
const showSessionExpiredModal = ref(false);
const sessionExpiredMessage = ref('Votre session a expiré. Veuillez vous reconnecter.');

const onRouteChanged = () => {
  shouldHideNavbar.value = route.path.startsWith("/backoffice");
  shouldHideFooter.value = route.path.startsWith("/backoffice");
  shouldHideContactPopup.value = route.path.startsWith("/backoffice");
};

// Exécuter au montage
onRouteChanged();

// Surveiller les changements de route
watch(route, onRouteChanged);

const openCookieSettings = () => {
  if (cookieBanner.value) {
    cookieBanner.value.isVisible = true;
  }
};

const handleSessionExpired = (event) => {
  if (event.detail?.message) {
    sessionExpiredMessage.value = event.detail.message;
  }
  showSessionExpiredModal.value = true;
};

const handleReconnect = () => {
  showSessionExpiredModal.value = false;
  router.push('/login');
};

// Gérer l'expiration de session
onMounted(() => {
  window.addEventListener('session-expired', handleSessionExpired);
});

onBeforeUnmount(() => {
  window.removeEventListener('session-expired', handleSessionExpired);
});
</script>

<style lang="tailwindcss">
</style>