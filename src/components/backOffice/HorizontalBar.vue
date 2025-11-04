<template>
  <header class="w-full bg-purple-fonce items-center absolute top-0 left-0 right-0 z-50">
    <div>
      <!-- Contenu de votre barre horizontale -->
      <div class="flex justify-between text-white mx-4 max-md:mx-2">
        <!-- Contenu gauche -->
        <div class="flex items-center gap-2">
          <!-- Bouton hamburger (visible uniquement sur mobile) -->
          <button @click="toggleMobileMenu" class="hidden max-md:flex items-center justify-center w-10 h-10 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

          <router-link class="button flex items-center gap-2 text-white max-md:gap-1" to="/">
            <img src="../../assets/logo_back.svg" alt="logo" class="material-icons w-[2rem] mt-4 mb-4 max-md:w-6 max-md:mt-3 max-md:mb-3">
            <span class="text underline max-md:text-sm">Retour au site</span>
          </router-link>
        </div>
        <!-- Contenu droit -->
        <div class="flex items-center">
          <span class="max-md:text-sm">Bonjour {{ user.pseudo || 'Utilisateur' }}</span>
        </div>
      </div>
    </div>

    <!-- Menu mobile (overlay) -->
    <transition name="slide-fade">
      <div v-if="mobileMenuOpen" class="fixed inset-0 bg-purple-fonce z-40 max-md:block hidden" @click="closeMobileMenu">
        <div class="flex flex-col pt-20 px-4" @click.stop>
          <nav class="flex flex-col gap-2">
            <router-link
              :class="['flex items-center gap-3 p-4 rounded-lg border border-white text-white transition-colors', { 'bg-purple': currentPage === '/backoffice/dashboard' }]"
              to="/backoffice/dashboard"
              @click="closeMobileMenu"
            >
              <img src="../../assets/logo_dash.svg" alt="Dashboard" class="w-6 h-6">
              <span class="text-lg font-medium">Tableau de bord</span>
            </router-link>

            <router-link
              :class="['flex items-center gap-3 p-4 rounded-lg border border-white text-white transition-colors', { 'bg-purple': currentPage === '/backoffice/users' }]"
              to="/backoffice/users"
              @click="closeMobileMenu"
            >
              <img src="../../assets/logo_utilisateur.svg" alt="Users" class="w-6 h-6">
              <span class="text-lg font-medium">Utilisateurs</span>
            </router-link>

            <router-link
              :class="['flex items-center gap-3 p-4 rounded-lg border border-white text-white transition-colors', { 'bg-purple': currentPage === '/backoffice/documentation' }]"
              to="/backoffice/documentation"
              @click="closeMobileMenu"
            >
              <img src="../../assets/logo_doc.svg" alt="Documentation" class="w-6 h-6">
              <span class="text-lg font-medium">Documentation</span>
            </router-link>

            <router-link
              :class="['flex items-center gap-3 p-4 rounded-lg border border-white text-white transition-colors', { 'bg-purple': currentPage === '/backoffice/structure' }]"
              to="/backoffice/structure"
              @click="closeMobileMenu"
            >
              <img src="../../assets/structure_logo.png" alt="Structure" class="w-6 h-6">
              <span class="text-lg font-medium">Structures</span>
            </router-link>
          </nav>
        </div>
      </div>
    </transition>
  </header>
</template>

<script>
import { getUserPseudoFromToken } from '../../services/decodeJwt';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';

export default {
  name: 'HorizontalBar',

  setup() {
    const mobileMenuOpen = ref(false);
    const currentPage = ref('');
    const route = useRoute();

    watch(
      () => route.path,
      (newPath) => {
        currentPage.value = newPath;
      },
      { immediate: true }
    );

    const toggleMobileMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value;
    };

    const closeMobileMenu = () => {
      mobileMenuOpen.value = false;
    };

    return {
      mobileMenuOpen,
      currentPage,
      toggleMobileMenu,
      closeMobileMenu,
    };
  },

  data() {
    return {
      user: {
        pseudo: '', // Valeur par défaut
      },
    };
  },

  mounted() {
    this.fetchUserPseudo();
  },

  methods: {
    fetchUserPseudo() {
      const pseudo = getUserPseudoFromToken();
      if (pseudo) {
        this.user.pseudo = pseudo;
      } else {
      }
    },
  },
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}

.slide-fade-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>