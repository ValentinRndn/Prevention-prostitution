<template>
  <aside class="flex items-center justify-around text-xl gap-5 my-4 mx-12 sm:hidden 2xl:text-sm">
    <router-link to="/">
      <img src="../assets/logo_typo.png" alt="Logo black" class="w-[200px]" />
    </router-link>
    <ul
      class="navbar flex items-center gap-10 h-full font-cgothic font-bold text-grey 2xl:gap-8"
    >
      <li
        class="menu w-fit text-center"
        :class="{ 'selectedMenu': currentPage === '/map' }"
      >
        <router-link to="/map">JE RECHERCHE UN ÉTABLISSEMENT</router-link>
      </li>
      <li
        class="menu w-fit text-center"
        :class="{ 'selectedMenu': currentPage === '/guide' }"
      >
        <router-link to="/guide">JE CONSULTE LA DOCUMENTATION</router-link>
      </li>
      <li
        class="menu w-fit text-center"
        :class="{ 'selectedMenu': currentPage === '/contact' }"
      >
        <router-link to="/contact">JE PRENDS CONTACT</router-link>
      </li>

      <!-- Bouton utilisateur -->
      <li v-if="isUserLoggedIn" class="relative">
        <button
          @click="toggleDropdown"
          class="menu flex items-center gap-2 p-2 rounded-full bg-grey hover:bg-gray-500 transition-colors duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 rounded-full object-cover object-center text-white" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linejoin="round" d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/><circle cx="12" cy="7" r="3"/></g></svg>
          <span class="hidden xl:block text-sm font-medium text-gray-700">
            Mon compte
          </span>
        </button>

        <!-- Menu déroulant -->
        <ul
          v-if="dropdownVisible"
          class="dropdown-menu absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg text-gray-700"
        >
          <li class="menu-item flex items-center gap-2 p-3 hover:bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-purple-fonce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
            <router-link to="/backoffice/dashboard" class="w-full">
              Back office
            </router-link>
          </li>
          <li
            class="menu-item flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer"
            @click="logout"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7"
              />
            </svg>
            <span>Se déconnecter</span>
          </li>
        </ul>
      </li>
    </ul>
    <a
      class="text-white text-center bg-purple-fonce text-xl drop-shadow-lg font-bold rounded-md p-4 2xl:text-sm hover:bg-purple transition-colors duration-300"
      href="https://google.com"
    >
      SORTIE RAPIDE
    </a>
  </aside>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const currentPage = ref("");
const route = useRoute();
const router = useRouter();

// Constante pour vérifier si le User est loggedIn
const isUserLoggedIn = ref(localStorage.getItem("token") !== null);

// État pour gérer la visibilité du menu déroulant
const dropdownVisible = ref(false);

watch(
  () => route.path,
  (newPath) => {
    currentPage.value = newPath;
  },
  { immediate: true }
);

// Fonction pour basculer la visibilité du menu déroulant
const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value;
};

// Fonction pour gérer la déconnexion
const logout = () => {
  localStorage.removeItem("token");
  isUserLoggedIn.value = false;
  dropdownVisible.value = false;
  router.push("/");
};
</script>

<style scoped>
/* Style pour le menu sélectionné */
.selectedMenu {
  color: #f1b04c;
  position: relative;
}

.selectedMenu::after {
  content: "";
  position: absolute;
  left: 20%;
  right: 20%;
  bottom: -4px;
  height: 4px;
  background-color: #f1b04c;
}

/* Style pour les éléments du menu déroulant */
.menu-item {
  cursor: pointer;
}

.dropdown-menu {
  z-index: 1000;
  animation: fadeIn 0.3s ease-in-out;
}

/* Animation fade-in */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>