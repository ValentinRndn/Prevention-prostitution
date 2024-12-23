<template>
  <aside class="flex items-center justify-around text-xl gap-5 my-4 mx-12 sm:hidden 2xl:text-sm ">
    <router-link to="/">
    <img src="../assets/logo_black.png" alt="Logo black" class="w-[150px] " />
  </router-link>
    <ul class="navbar flex items-center gap-10 h-full font-cgothic font-bold text-grey 2xl:gap-8">
      <li class="menu w-fit text-center" :class="{ 'selectedMenu': currentPage === '/map' }">
        <router-link to="/map">JE RECHERCHE UN ÉTABLISSEMENT</router-link>
      </li>
      <li class="menu w-fit text-center" :class="{ 'selectedMenu ': currentPage === '/guide' }">
        <router-link to="/guide">JE CONSULTE LA DOCUMENTATION</router-link>
      </li>
      <li class="menu w-fit text-center" :class="{ 'selectedMenu': currentPage === '/contact' }">
        <router-link to="/contact">JE PRENDS CONTACT</router-link>
      </li>


      
      <li v-if="isUserLoggedIn" class="relative">
        <button @click="toggleDropdown" class="menu">
          <img src="../assets/profile.png" alt="profil" class="size-6 object-cover object-center">
        </button>
        <ul v-if="dropdownVisible" class="dropdown-menu absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          <li class="menu-item p-2 hover:bg-gray-100">
            <router-link to="/backoffice/dashboard">Back office</router-link>
          </li>
          <li class="menu-item p-2 hover:bg-gray-100 cursor-pointer" @click="logout">Se déconnecter</li>
        </ul>
      </li>
    </ul>
    <a class="text-white text-center bg-purple-fonce text-xl drop-shadow-lg font-bold rounded-md p-4 2xl:text-sm hover:bg-purple transition-colors duration-300" href="https://google.com">SORTIE RAPIDE</a>


  </aside>
</template>

<script>
export default {
  name: 'NavigationBar',
};
</script>
<script setup>

import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const currentPage = ref('');
const route = useRoute();
const router = useRouter();

// Constante pour vérifier si le User est loggedIn
const isUserLoggedIn = ref(localStorage.getItem('token') !== null);

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
  localStorage.removeItem('token');
  isUserLoggedIn.value = false;
  dropdownVisible.value = false;
  router.push('/');
};
</script>

<style scoped>
.selectedMenu {
  color: #f1b04c;
  position: relative;
}

.selectedMenu::after {
  content: "";
  position: absolute;
  left: 20%;
  right: 20%;
  bottom: -4px; /* Ajuste la valeur pour descendre la ligne */
  height: 4px; /* Épaisseur de la ligne */
  background-color: #f1b04c;
}

.menu-item {
  cursor: pointer;
}
.dropdown-menu {
  z-index: 50;
}
</style>
